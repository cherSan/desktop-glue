import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import {RubberOutlet} from "../rubber-outlet/rubber-outlet.component";
import {HeaderComponent, PanelElementComponent} from "@launchpad/ui";
import {NzInputModule} from "ng-zorro-antd/input";
import {FilterPipe} from "@launchpad/pipes";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule, TabsRoutingModule, RubberOutlet, HeaderComponent, NzInputModule, PanelElementComponent, FilterPipe, NzButtonModule, NzIconModule, DragDropModule],
})
export class TabsModule {}
