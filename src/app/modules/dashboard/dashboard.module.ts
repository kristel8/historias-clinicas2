import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';


import {InputTextModule} from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PacientesModule } from '../pacientes/pacientes.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerPacienteComponent } from './pages/ver-paciente/ver-paciente.component';


@NgModule({
  declarations: [
    DashboardComponent,
    VerPacienteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    InputTextModule,
    ButtonModule,
    PacientesModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
