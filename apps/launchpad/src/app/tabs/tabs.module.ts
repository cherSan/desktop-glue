import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { RubberOutlet } from '../rubber-outlet/rubber-outlet.component';
import { HeaderComponent, PanelElementComponent } from '@launchpad/ui';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FilterPipe } from '@launchpad/pipes';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DetailsComponent } from './details/details.component';
import {ContainerTemplateComponent} from "../container-template/container-template.component";

@NgModule({
  declarations: [TabsComponent, DetailsComponent],
    imports: [
      CommonModule,
      TabsRoutingModule,
      RubberOutlet,
      HeaderComponent,
      NzInputModule,
      PanelElementComponent,
      FilterPipe,
      NzButtonModule,
      NzIconModule,
      DragDropModule,
      ContainerTemplateComponent,
    ],
})
export class TabsModule {}
