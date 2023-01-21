import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {SizeObserverDirective} from "@launchpad/glue42";
import {animate, group, query, state, style, transition, trigger} from "@angular/animations";
import {NzDividerModule} from "ng-zorro-antd/divider";
type State = {
  value: string | undefined,
  params: {
    width: number,
    prevWidth: number
  }
}
@Component({
  selector: 'rubber-outlet',
  standalone: true,
  templateUrl: './rubber-outlet.component.html',
  styleUrls: ['./rubber-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SizeObserverDirective, NzDividerModule],
  animations: [
    trigger('rubber', [
      state('void', style({width: 0})),
      state('*', style({width: 'fit-content'})),
      transition(
        'void => *',
        [
          group([
            style({width: 0 }),
            animate(100, style({ width: '{{width}}px' })),
            query(":enter", [
              style({opacity: 0}),
              animate(100, style({opacity: 1})),
            ], { optional: true })
          ]),
        ],
        { params: {width: 60} }
      ),
      transition(
        '* => void',
        group([
          style({width: '{{width}}px'}),
          animate(100, style({width: 0})),
          query(":leave", [
            style({opacity: 1}),
            animate(100, style({opacity: 0}))
          ], { optional: true })
        ]),
        { params: {width: 60} }
      ),
      transition(
        '* <=> *',
        group([
          style({width: '{{prevWidth}}px'}),
          animate(200, style({width: '{{width}}px'}))
        ]),
        { params: {width: 0, prevWidth: 60} }
      ),
    ])
  ]
})
export class RubberOutlet {
  @HostBinding('@rubber')
  public state: State = { value: undefined, params: {
    prevWidth: 0,
    width: 0
  } };

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    const primaryRoute = this.activatedRoute.children.find(o => o.outlet === 'primary');
    if (primaryRoute) {
      this.state = {
        value: primaryRoute.snapshot.component?.name || 'void',
        params: {
          prevWidth: 0,
          width: primaryRoute.snapshot.data['width']
        }
      }
    }
  }
  activate($event: RouterOutlet) {
    if ($event.isActivated) {
      this.state = {
        ...this.state,
        value: $event.activatedRoute.snapshot.component?.name || 'void',
        params: {
          prevWidth: this.state.params.width,
          width: $event.activatedRoute.snapshot.data['width'] || 60
        }
      }
    }
  }
  deactivate() {
    this.state = {
      ...this.state,
      value: 'void'
    }
  }
}
