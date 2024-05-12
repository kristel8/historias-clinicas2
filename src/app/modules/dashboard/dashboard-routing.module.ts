import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VerPacienteComponent } from './pages/ver-paciente/ver-paciente.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'ver-historia/:id', component: VerPacienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
