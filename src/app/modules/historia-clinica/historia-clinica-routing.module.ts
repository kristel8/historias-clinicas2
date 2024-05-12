import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaComponent } from './pages/historia-clinica/historia-clinica.component';

const routes: Routes = [
  { path: '', component: HistoriaClinicaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaClinicaRoutingModule { }
