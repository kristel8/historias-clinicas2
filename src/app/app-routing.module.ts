import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/services/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent,

  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
      {
        path: 'pacientes',
        loadChildren: () => import('./modules/pacientes/pacientes.module').then(m => m.PacientesModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
      {
        path: 'agregar-historia-clinica',
        loadChildren: () => import('./modules/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
