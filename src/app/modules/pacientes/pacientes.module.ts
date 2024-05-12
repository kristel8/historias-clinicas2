import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { VerPacienteComponent } from './pages/ver-paciente/ver-paciente.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    PacientesComponent,
    VerPacienteComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    RouterModule,
    ButtonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TableModule
  ],
  exports: [
    PacientesComponent,
    VerPacienteComponent
  ],
})
export class PacientesModule { }
