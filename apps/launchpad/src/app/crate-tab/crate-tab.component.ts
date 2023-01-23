import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GlueService, SizeObserverDirective} from "@launchpad/glue42";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {Router} from "@angular/router";
@Component({
  standalone: true,
  imports: [SizeObserverDirective, NzInputModule, NzButtonModule],
  hostDirectives: [SizeObserverDirective],
  templateUrl: './crate-tab.component.html',
  styleUrls: ['./crate-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrateTabComponent {
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
  create(name: string) {
    return this.glueService.tabs.create(name).then(() => {
      return this.router.navigate([{outlets: {process: null}}])
    });
  }
}
