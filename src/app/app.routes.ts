import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
  },
  {
    path: 'filme',
    loadChildren: () =>
      import('./modules/movies/movies.module').then((mod) => mod.MoviesModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (mod) => mod.NotFoundModule
      ),
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
