import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GlueService} from "@launchpad/glue42";

@Component({
  selector: 'lp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public readonly bloombergBridge = new FormControl<boolean>(false);
  public readonly windowGroupHeaderBar = new FormControl<boolean>(false);
  public readonly from = new FormGroup({
    bloombergBridge: this.bloombergBridge,
    windowGroupHeaderBar: this.windowGroupHeaderBar
  });
  public user?: string;
  public region?: string;
  public env?: string;
  public version?: string;
  constructor(private glue: GlueService) {
    this.user = glue.user;
    this.region = glue.region;
    this.env = glue.env;
    this.version = glue.glue.version;
  }
  submitForm() {

  }
}
