import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaciente } from '../../models/paciente.interface';
import { MensajesToastService } from 'src/app/shared/services/mensajes-toast.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { catchError } from 'rxjs/operators';
import { PacientesService } from '../../services/pacientes.service';
import { IPacienteRequest } from '../../models/paciente-request';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  pacientes: IPaciente[] = [];
  cols!: any[];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: PacientesService,
    private mensajesToast: MensajesToastService,
    private mensajesSwal: MensajesSwalService
  ) {}

  pacienteForm = this.fb.group({
    dni: [''],
    apellidoPaterno: [''],
  });

  public get apellidoFormCtrl(): AbstractControl {
    return this.pacienteForm.controls['apellidoPaterno'];
  }

  public get dniFormCtrl(): AbstractControl {
    return this.pacienteForm.controls['dni'];
  }

  disableForm(): void {
    const { dni, apellidoPaterno } = this.pacienteForm.getRawValue();

    if (dni) {
      this.apellidoFormCtrl.disable();
      this.dniFormCtrl.enable();
      return;
    }

    if (apellidoPaterno) {
      this.dniFormCtrl.disable();
      this.apellidoFormCtrl.enable();
      return;
    }

    this.pacienteForm.enable();
  }

  ngOnInit(): void {
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

  buscar(): void {
    const { dni, apellidoPaterno } = this.pacienteForm.getRawValue();

    const param: IPacienteRequest = {
      dni: dni,
      apellido: apellidoPaterno,
    };

    if (dni || apellidoPaterno) {
      this.isLoading = true;
      this.pacienteForm.disable();

      this.service
        .getPacienteHistorialByDni(param)
        .pipe(
          catchError((error) => {
            this.pacienteForm.enable();
            this.pacienteForm.reset();
            this.isLoading = false;
            this.mensajesSwal.mensajeError(
              'Ha ocurrido un error, intente luego'
            );
            throw error;
          })
        )
        .subscribe((response) => {
          this.isLoading = false;
          this.pacientes = response;
          this.disableForm();
          if (response.length === 0) {
            if (dni)
              this.mensajesToast.showWarn(`No hay paciente con el DNI ${dni}`);
            if (apellidoPaterno)
              this.mensajesToast.showWarn(
                `No hay paciente con el Apellido ${apellidoPaterno}`
              );
          }
        });
    } else {
      this.mensajesToast.showWarn('Complete al menos un campo');
      return;
    }
  }

  limpiar(): void {
    this.pacienteForm.reset();
    this.pacientes = [];
  }

  ver(item: IPaciente): void {
    this.router.navigate(['ver-paciente', item.idPaciente], {
      relativeTo: this.route,
    });
  }

  eliminar(item: IPaciente): void {
    this.mensajesSwal
      .mensajePregunta('¿Está seguro de eliminar el paciente?')
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          this.service.deletePacienteId(item.idPaciente).subscribe(() => {
            this.mensajesToast.showSuccess('Se ha eliminado exitosamente!');
            this.buscar();
          });
        }
      });
  }
}
