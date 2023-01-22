import { Route } from '@angular/router';
import {Glue42InitializeGuard} from "../../../../libs/glue42/src/lib/glue42-initialize.guard";

export const appRoutes: Route[] = [
  {
    path: 'initialize',
    outlet: 'process',
    loadComponent: () => import('./initialize/initialize.component').then(c => c.InitializeComponent)
  },
  {
    path: 'toolbar',
    loadChildren: () => import('./toolbar/toolbar.module').then(m => m.ToolbarModule),
    canActivate: [Glue42InitializeGuard]
  }
];
