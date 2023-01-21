import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationsComponent} from "./applications/applications.component";
import {DetailsComponent} from "./details/details.component";
import {BugReportComponent} from "./bug-report/bug-report.component";

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: ':applicationName',
        component: DetailsComponent,
        data: {
          width: 400
        },
        children: [
          {
            path: 'bug',
            component: BugReportComponent,
            data: {
              width: 300
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
