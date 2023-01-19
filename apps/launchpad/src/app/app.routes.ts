import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'launch-bar'
  },
  {
    path: 'launch-bar',
    loadChildren: () => import('./launch-bar/launch-bar.module').then(m => m.LaunchBarModule)
  }
];
