import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GlueService, SizeObserverDirective} from "@launchpad/glue42";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  imports: [SizeObserverDirective],
  hostDirectives: [SizeObserverDirective],
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddApplicationComponent {
  constructor(
    private router: Router,
    private glueService: GlueService
  ) {
  }
  ngOnInit() {
    this.glueService.glue.hotkeys.register(
      "esc",
      () => this.router.navigate([{outlets: {process: null}}])
    )
  }
  ngOnDestroy() {
    this.glueService.glue.hotkeys.unregister("esc")
  }
}
