import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { VerPacienteComponent } from './pages/ver-paciente/ver-paciente.component';

const routes: Routes = [
  { path: '', component: PacientesComponent },
  { path: 'ver-paciente/:id', component: VerPacienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
