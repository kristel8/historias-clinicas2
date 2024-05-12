import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';

import { MessageService } from 'primeng/api';
import { PacientesModule } from './pacientes/pacientes.module';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardModule,
    PacientesModule,
    HistoriaClinicaModule
  ],
  exports: [
    CommonModule,
    DashboardModule,
    PacientesModule,
    HistoriaClinicaModule
  ],
  providers: [MessageService]
})
export class ModulesModule { }
