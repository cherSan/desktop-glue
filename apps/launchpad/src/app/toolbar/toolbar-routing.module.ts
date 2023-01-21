import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {ServicesComponent} from "./services/services.component";

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      {
        path: '',
        component: ServicesComponent,
        children: [
          {
            path: 'settings',
            loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule),
            data: {
              width: 300
            }
          },
          {
            path: 'quit',
            loadComponent: () => import('../quit/quit.component').then(m => m.QuitComponent),
            data: {
              width: 200
            }
          }
        ],
        data: {
          weight: 0
        }
      },
      {
        path: 'applications',
        loadChildren: () => import('../applications/applications.module').then(m => m.ApplicationsModule),
        data: {
          weight: 1
        }
      },
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsModule),
        data: {
          weight: 1
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolbarRoutingModule { }
