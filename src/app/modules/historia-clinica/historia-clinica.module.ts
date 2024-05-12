import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './pages/historia-clinica/historia-clinica.component';
import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    HistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule
  ]
})
export class HistoriaClinicaModule { }
