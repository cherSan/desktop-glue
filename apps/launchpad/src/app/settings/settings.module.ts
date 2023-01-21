import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {HeaderComponent} from "@launchpad/ui";
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, HeaderComponent, NzFormModule, ReactiveFormsModule, NzSwitchModule, NzDescriptionsModule],
})
export class SettingsModule {}
