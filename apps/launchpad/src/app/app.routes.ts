import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'toolbar',
    pathMatch: 'full'
  },
  {
    path: 'toolbar',
    loadChildren: () => import('./toolbar/toolbar.module').then(m => m.ToolbarModule)
  }
];
