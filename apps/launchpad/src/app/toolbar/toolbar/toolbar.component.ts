import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {animate, group, query, state, style, transition, trigger} from "@angular/animations";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('serviceChange', [
      transition(
        ':increment',
        [
          query(':enter, :leave', style({ position: 'absolute', width: '340px' }), { optional: true }),
          group([
            query(':leave', [
              style({ top: 0, opacity: 1 }),
              animate(300, style({ top: '-100%', opacity: 0 })),
            ], { optional: true }),
            query(':enter', [
              style({ top: '100%', opacity: 0 }),
              animate(300, style({ top: 0, opacity: 1 })),
            ], { optional: true })
          ])
        ]
      ),
      transition(
        ':decrement',
        [
          query(':enter, :leave', style({ position: 'absolute', width: '340px' }), { optional: true }),
          group([
            query(':leave', [
              style({ top: 0, opacity: 1 }),
              animate(300, style({ top: '100%', opacity: 0 })),
            ], { optional: true }),
            query(':enter', [
              style({ top: '-100%', opacity: 0 }),
              animate(300, style({ top: 0, opacity: 1 })),
            ], { optional: true })
          ])
        ]
      ),
    ]),
    trigger('panelWidth', [
      state('true', style({ 'min-width': '340px', width: 'fit-content' })),
      state('false', style({ width: '60px' })),
      transition('0 => 1', [
        style({width: '60px', 'min-width': 'unset'}),
        animate(200, style({ width: '340px' }))
      ]),
      transition('1 => 0', [
        style({width: '340px', 'min-width': 'unset'}),
        animate(200, style({ width: '60px' }))
      ])
    ])
  ]
})
export class ToolbarComponent implements OnDestroy {
  private readonly live$ = new Subject<void>()
  weight: number = 0;
  isMouseOver = false;
  isRouterActive = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    router.events
      .pipe(
        takeUntil(this.live$),
        tap((event) => {
          if (event instanceof NavigationEnd) {
            const childModulePrimary = this.activatedRoute.children.find(route => route.outlet === 'primary');
            if (!childModulePrimary) {
              this.isRouterActive = false;
            } else {
              const subChild = childModulePrimary.children.find(route => route.outlet === 'primary');
              if (!subChild) {
                this.isRouterActive = false;
              } else {
                this.isRouterActive = !!subChild.children.find(route => route.outlet === 'primary');
              }
            }
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.live$.next();
    this.live$.complete()
  }
  activate($event: RouterOutlet) {
    if ($event.isActivated) {
      this.weight = $event.activatedRoute.snapshot.data['weight'] || 0;
    }
  }
  deactivate() {
    this.isRouterActive = false;
  }
}
