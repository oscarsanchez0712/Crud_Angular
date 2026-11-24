import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'incidencias', pathMatch: 'full' },
  {
    path: 'incidencias',
    loadChildren: () =>
      import('./features/incidencias/incidencias.module').then(m => m.IncidenciasModule)
  },
  { path: '**', redirectTo: 'incidencias' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
