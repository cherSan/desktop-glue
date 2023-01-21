import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { HeaderComponent, PanelElementComponent } from '@launchpad/ui';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FilterPipe } from '@launchpad/pipes';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DetailsComponent } from './details/details.component';
import { RubberOutlet } from '../rubber-outlet/rubber-outlet.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { BugReportComponent } from './bug-report/bug-report.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ApplicationsComponent, DetailsComponent, BugReportComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    HeaderComponent,
    NzInputModule,
    FilterPipe,
    PanelElementComponent,
    NzButtonModule,
    NzIconModule,
    RubberOutlet,
    NzTypographyModule,
    NzDescriptionsModule,
    NzSegmentedModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
})
export class ApplicationsModule {}
