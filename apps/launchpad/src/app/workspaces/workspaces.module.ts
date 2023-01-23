import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import {ContainerTemplateComponent} from "../container-template/container-template.component";
import {HeaderComponent} from "@launchpad/ui";
import {NzSegmentedModule} from "ng-zorro-antd/segmented";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [WorkspacesComponent],
  imports: [CommonModule, WorkspacesRoutingModule, ContainerTemplateComponent, HeaderComponent, NzSegmentedModule, NzIconModule],
})
export class WorkspacesModule {}
