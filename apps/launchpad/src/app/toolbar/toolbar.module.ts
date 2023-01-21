import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeObserverDirective } from '@launchpad/glue42';
import {HeaderComponent, NavigationItemComponent} from "@launchpad/ui";

import {NzButtonModule} from "ng-zorro-antd/button";

import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RubberOutlet } from '../rubber-outlet/rubber-outlet.component';
import { ServicesComponent } from './services/services.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzCardModule} from "ng-zorro-antd/card";

@NgModule({
  declarations: [
    ToolbarComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    ToolbarRoutingModule,
    RubberOutlet,
    SizeObserverDirective,
    HeaderComponent,
    NzButtonModule,
    NavigationItemComponent,
    NzIconModule,
    NzCardModule
  ],
})
export class ToolbarModule {}
