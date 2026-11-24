import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { IncidenciaListComponent } from './pages/incidencia-list/incidencia-list.component';
import { IncidenciaFormComponent } from './pages/incidencia-form/incidencia-form.component';
import { IncidenciaDetailComponent } from './pages/incidencia-detail/incidencia-detail.component';

const routes: Routes = [
  { path: '', component: IncidenciaListComponent },
  { path: 'nueva', component: IncidenciaFormComponent },
  { path: ':id', component: IncidenciaDetailComponent },
  { path: ':id/editar', component: IncidenciaFormComponent }
];

@NgModule({
  declarations: [
    IncidenciaListComponent,
    IncidenciaFormComponent,
    IncidenciaDetailComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class IncidenciasModule {}
