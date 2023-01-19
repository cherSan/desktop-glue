import { NgModule } from '@angular/core';
import {SizeObserverDirective} from "@launchpad/glue42";

import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";

import { LaunchBarRoutingModule } from './launch-bar-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {MainLayoutComponent} from "../layouts/main-layout/main-layout.component";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzListModule} from "ng-zorro-antd/list";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ScrollingModule} from "@angular/cdk/scrolling";
@NgModule({
  declarations: [
    LayoutComponent,
  ],
    imports: [
        LaunchBarRoutingModule,
        SizeObserverDirective,
        MainLayoutComponent,
        NzIconModule,
        NzTabsModule,
        NzPageHeaderModule,
        NzAvatarModule,
        NzListModule,
        NgForOf,
        JsonPipe,
        NgIf,
        ScrollingModule,
        AsyncPipe
    ],
})
export class LaunchBarModule {}
