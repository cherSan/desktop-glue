import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    outlet: 'process',
    redirectTo: 'initialize',
    pathMatch: 'full'
  },
  {
    path: 'initialize',
    outlet: 'process',
    loadComponent: () => import('./initialize/initialize.component').then(c => c.InitializeComponent)
  },
  {
    path: 'toolbar',
    loadChildren: () => import('./toolbar/toolbar.module').then(m => m.ToolbarModule)
  }
];
