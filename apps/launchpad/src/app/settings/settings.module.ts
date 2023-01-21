import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {HeaderComponent} from "@launchpad/ui";
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ContainerTemplateComponent} from "../container-template/container-template.component";

@NgModule({
  declarations: [SettingsComponent],
    imports: [CommonModule, SettingsRoutingModule, HeaderComponent, NzFormModule, ReactiveFormsModule, NzSwitchModule, NzDescriptionsModule, NzButtonModule, NzIconModule, ContainerTemplateComponent],
})
export class SettingsModule {}
