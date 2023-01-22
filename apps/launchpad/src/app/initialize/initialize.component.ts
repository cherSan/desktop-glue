import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlueService, SizeObserverDirective} from "@launchpad/glue42";
import {switchMap, take} from "rxjs";
import {GlueInteropsService} from "../../../../../libs/glue42/src/lib/glue42-interops.service";

@Component({
  standalone: true,
  imports: [SizeObserverDirective],
  hostDirectives: [SizeObserverDirective],
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitializeComponent {
  public process: string = 'Initialize Glue';
  constructor(
    private interops: GlueInteropsService,
    private glueService: GlueService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.glueService.initialize().pipe(
      take(1),
      switchMap(() => interops.register()),
      switchMap(() => this.router.navigate(['toolbar'], {relativeTo: route.parent})),
      switchMap(() => this.router.navigate([{ outlets: { process: null } }], {relativeTo: route.parent}))
    ).subscribe()
  }
}
