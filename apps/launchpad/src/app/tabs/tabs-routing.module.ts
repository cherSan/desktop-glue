import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabsComponent} from "./tabs/tabs.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: ':tabName',
        component: DetailsComponent,
        data: {
          width: 300
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
