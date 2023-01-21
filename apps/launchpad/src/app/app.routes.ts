import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: () => import('./toolbar/toolbar.module').then(m => m.ToolbarModule)
  }
];
