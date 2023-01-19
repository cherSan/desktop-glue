import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {SizeObserverDirective} from "@launchpad/glue42";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzListModule} from "ng-zorro-antd/list";
import {NzAvatarModule} from "ng-zorro-antd/avatar";

import { ApplicationsRoutingModule } from './applications-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {MainLayoutComponent} from "../layouts/main-layout/main-layout.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
  declarations: [LayoutComponent],
    imports: [
        CommonModule,
        ApplicationsRoutingModule,
        SizeObserverDirective,
        NzLayoutModule,
        NzPageHeaderModule,
        NzListModule,
        MainLayoutComponent,
        NzAvatarModule,
        ScrollingModule,
        NzInputModule,
        FormsModule,
        NzIconModule,
        NzDividerModule
    ],
})
export class ApplicationsModule {}
