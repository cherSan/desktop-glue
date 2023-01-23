import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NzSegmentedOptions} from "ng-zorro-antd/segmented/types";
import {GlueService} from "@launchpad/glue42";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacesComponent {
  options: NzSegmentedOptions = [
    {
      label: 'Private',
      value: 'private'
    },
    {
      label: 'Shared',
      value: 'shared'
    },
  ]
  constructor(
    private glue: GlueService,
    public readonly route: ActivatedRoute
  ) {}
  handleIndexChange($event: number) {

  }
}
