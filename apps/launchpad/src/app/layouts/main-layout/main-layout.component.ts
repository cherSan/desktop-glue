import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlueWindowService, SizeObserverDirective} from "@launchpad/glue42";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'lp-main-layout',
  standalone: true,
  imports: [SizeObserverDirective, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('sizeAnimation', [
      state('true' , style({ width: '{{width}}px' }),  { params: { width: 300 }}),
      state('false', style({ width: '{{width}}px' }),  { params: { width: 60 }}),
      transition('0 => 1', [animate(200)]),
      transition('1 => 0', [animate(200)])
    ])
  ]
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  public hover: boolean = false;
  public routerIsActive: boolean = false;
  @Input()
  containerSize: [number, number] = [300, 300];
  @Input()
  detailsSize: [number, number] = [0, 300];
  constructor(
    private readonly glueWindow: GlueWindowService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.routerIsActive = !!this.activatedRoute.snapshot.children.length;
  }
  ngOnInit() {
    this.glueWindow.add(this.detailsSize[1]);
  }
  ngOnDestroy() {
    this.glueWindow.remove(this.detailsSize[1]);
  }
}
