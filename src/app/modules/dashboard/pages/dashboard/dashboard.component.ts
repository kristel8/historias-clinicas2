import { Component, OnInit } from '@angular/core';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IHistoriaClinica } from '../../models/historia-clinica.interface';
import { MensajesToastService } from 'src/app/shared/services/mensajes-toast.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  historias!: IHistoriaClinica[];

  cols!: any[];

  constructor(
    private historiaService: HistoriaClinicaService,
    private mensajesToast: MensajesToastService,
    private mensajesSwal: MensajesSwalService,
    private service: HistoriaClinicaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getHistoriaClinica();

    this.cols = [
      { icon: 'pi pi-folder', field: 'idPaciente', header: 'ID' },
      { icon: 'pi pi-user', field: 'apellidoPaterno', header: 'Ap. Paterno' },
      { icon: 'pi pi-user', field: 'apellidoMaterno', header: 'Ap. Materno' },
      { icon: 'pi pi-user', field: 'nombres', header: 'Nombres' },
      { icon: 'pi pi-id-card', field: 'dni', header: 'DNI' },
      {
        icon: 'pi pi-calendar',
        field: 'fechaInscrito',
        header: 'Fecha inscrito',
      },
    ];
  }

  getHistoriaClinica(): void {
    this.historiaService
    .getHistoriaClinica()
    .pipe(
      catchError((error) => {
        this.mensajesSwal.mensajeError('Ha ocurrido un error, intente luego');
        throw error;
      })
    )
    .subscribe((response) => (this.historias = response));
  }

  ver(item: IHistoriaClinica): void {
    this.router.navigate(['ver-historia', item.idPaciente], { relativeTo: this.route });
  }

  eliminar(item: IHistoriaClinica): void {
    this.mensajesSwal.mensajePregunta('¿Está seguro de eliminar el paciente?').then((respuesta) => {
      if( respuesta.isConfirmed) {
        this.service.deleteHistoriaId(item.idPaciente).subscribe(() => {
          this.mensajesToast.showSuccess('Se ha eliminado exitosamente!');
          this.getHistoriaClinica();
        });
      }
    })
  }
}
