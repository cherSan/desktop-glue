import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {SizeObserverDirective} from "@launchpad/glue42";

@Component({
  standalone: true,
  imports: [CommonModule, SizeObserverDirective],
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitializeComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    setTimeout(() => {
      this.router.navigate(['toolbar'], {relativeTo: route.parent})
    }, 20000)
  }
}
