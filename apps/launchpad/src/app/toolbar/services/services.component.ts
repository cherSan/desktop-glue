import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlueService} from "@launchpad/glue42";
@Component({
  selector: 'lp-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  public readonly currentLayout$;
  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly glueService: GlueService
  ) {
    this.currentLayout$ = glueService.layouts.currentLayout$
  }
  exit() {
    this.glueService.exit();
  }
  feedback() {
    this.glueService.glue.feedback();
  }
}
