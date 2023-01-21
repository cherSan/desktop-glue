import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GlueService} from "@launchpad/glue42";
import {Glue42} from "@glue42/desktop";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {map, tap} from "rxjs";

@Component({
  selector: 'lp-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  filter: string = '';
  public readonly layouts$
  public readonly currentLayout$
  private layouts: Glue42.Layouts.LayoutSummary[] = [];
  constructor(
    private glue: GlueService
  ) {
    this.layouts$ = glue.layouts.layouts$
      .pipe(
        tap((layouts) => this.layouts = layouts),
        map(lo => lo.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0)))
      );
    this.currentLayout$ = glue.layouts.currentLayout$;
  }

  onClick(layout: Glue42.Layouts.LayoutSummary) {
    return this.glue.layouts.select(layout);
  }
  create(layoutName: string) {
    return this.glue.layouts.create(layoutName);
  }

  drop($event: CdkDragDrop<Glue42.Layouts.LayoutSummary>) {
    moveItemInArray(this.layouts, $event.previousIndex, $event.currentIndex);
    return this.glue.layouts.reorder(this.layouts)
  }
}
