import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {GlueWindowService} from "@launchpad/glue42";
import {delay, from, Observable, repeat, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Glue42Store} from "@glue42/ng";
import {Glue42} from "@glue42/desktop";
import {GlueLayoutsService} from "../../../../../../libs/glue42/src/lib/glue-layouts.service";

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('routeAnimation', [
      state('true' , style({ width: '300px' })),
      state('false', style({ width: '0px' })),
      transition('0 => 1', [animate(100, style({ width: '300px' }))]),
      transition('1 => 0', [animate(100, style({ width: '0px' }))]),
    ]),
    trigger('sizeAnimation', [
      state('true' , style({ width: '200px' })),
      state('false', style({ width: '60px' })),
      transition('0 => 1', [animate(100, style({ width: '200px' }))]),
      transition('1 => 0', [animate(100, style({ width: '60px' }))]),
    ])
  ],
})
export class LayoutComponent {
  private readonly glue: Glue42.Glue = this.glueStore.getGlue() as Glue42.Glue;
  public layouts$: Observable<Glue42.Layouts.LayoutSummary[]>;
  public currentLayout$: Observable<Glue42.Layouts.LayoutSummary | undefined>;
  constructor(
    private readonly router: Router,
    public readonly activatedRoute: ActivatedRoute,
    private glueWindow: GlueWindowService,
    private glueStore: Glue42Store,
    private glueLayoutsService: GlueLayoutsService
  ) {
    this.glueWindow.add(300);
    this.layouts$ = glueLayoutsService.layouts$;
    this.currentLayout$ = glueLayoutsService.currentLayout$;
  }

  toggle($event: Event, routePath: string) {
    $event.preventDefault();
    $event.stopPropagation();
    const isOpen = this.activatedRoute.snapshot.children[0]?.routeConfig?.path === routePath;
    const path = isOpen ? ['.']: [routePath]
    this.router.navigate(path, {relativeTo: this.activatedRoute, replaceUrl: true})
  }

  applyLayout(layout: Glue42.Layouts.LayoutSummary) {
    this.glue.layouts.resume(layout.name);
  }
  layoutSave(layout: Glue42.Layouts.LayoutSummary | undefined | null) {
    if (layout) {
      this.glue.layouts.save(layout)
    }
  }
  layoutCreate() {
    const w = this.glue.windows.find('save-tab')
    if (w) {
      w.show().then(() =>  w.focus());
    } else {
      const a = this.glue.appManager.application('save-tab');
      if (a) {
        a.start()
      } else {
        console.error('WTF?');
      }
    }
  }
  remove(layout: Glue42.Layouts.LayoutSummary) {
    this.glue.layouts.remove('Global', layout.name)
  }
}
