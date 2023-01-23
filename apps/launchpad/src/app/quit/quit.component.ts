import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContainerTemplateComponent} from "../container-template/container-template.component";
import {HeaderComponent} from "@launchpad/ui";
import {NzButtonModule} from "ng-zorro-antd/button";
import {GlueService} from "@launchpad/glue42";

@Component({
  standalone: true,
  imports: [CommonModule, ContainerTemplateComponent, HeaderComponent, NzButtonModule],
  templateUrl: './quit.component.html',
  styleUrls: ['./quit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuitComponent {
  constructor(
    private readonly glueService: GlueService
  ) {
  }
  exit() {
    this.glueService.interops
      .get('exit')
      .subscribe();
  }
}
