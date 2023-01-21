import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GlueService} from "@launchpad/glue42";
import {Glue42} from "@glue42/desktop";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'lp-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  filter: string = '';
  private tabs: Glue42.Layouts.LayoutSummary[] = [];
  public readonly tabs$: Observable<Glue42.Layouts.LayoutSummary[]>;
  public readonly currentTab$: Observable<Glue42.Layouts.LayoutSummary | undefined>;
  constructor(
    private glue: GlueService
  ) {
    this.tabs$ = glue.tabs.layouts$
      .pipe(
        tap((layouts) => this.tabs = layouts),
        map(lo => lo.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0)))
      );
    this.currentTab$ = glue.tabs.currentLayout$;
  }

  onClick(tab: Glue42.Layouts.LayoutSummary) {
    return this.glue.tabs.select(tab);
  }
  create(tabName: string) {
    return this.glue.tabs.create(tabName);
  }

  drop($event: CdkDragDrop<Glue42.Layouts.LayoutSummary>) {
    moveItemInArray(this.tabs, $event.previousIndex, $event.currentIndex);
    return this.glue.tabs.reorder(this.tabs)
  }
}
