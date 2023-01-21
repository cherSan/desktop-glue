import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {RubberOutlet} from "../rubber-outlet/rubber-outlet.component";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'lp-container-template',
  standalone: true,
  imports: [RubberOutlet],
  templateUrl: './container-template.component.html',
  styleUrls: ['./container-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerTemplateComponent implements OnInit, OnDestroy {
  @HostBinding('style.min-width.px')
  minWidth: number = 0;
  @HostBinding('style.grid-template-columns')
  columns: string = 'fit-content(0) fit-content(0)';
  sub?: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.minWidth = activatedRoute.snapshot.data['width'];
    this.columns = `${this.minWidth || 340}px fit-content(0)`
  }

  ngOnInit() {
    this.sub = this.activatedRoute.data.subscribe((data) => {
      this.minWidth = data['width'] || 340;
      this.columns = `${this.minWidth || 340}px fit-content(0)`
    })
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
