import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MENU } from 'src/app/global/constantes';
import { AgregarHistoriaClinicaService } from '../../services/agregar-historia-clinica.service';
import {
  Antecedentes,
  Examenes,
  IHistoriaClinicaRequest,
  Paciente,
  Responsable,
} from '../../models/historia-clinica-request.interface';
import { catchError } from 'rxjs/operators';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { MensajesToastService } from 'src/app/shared/services/mensajes-toast.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent implements OnInit {
  menuOptions!: any[];
  menuControl = new FormControl(MENU.Paciente);
  menu = MENU;
  isLoading: boolean = false;
  historiaClinicaForm = this.fb.group({
    pacienteForm: this.fb.group({
      fechaInscrito: [null, [Validators.required]],
      dni: [null, [Validators.required]],
      apellidoPaterno: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      edad: [null, [Validators.required]],
      apellidoMaterno: [null, [Validators.required]],
      etnia: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      observaciones: [null, [Validators.required]],
      dniTutor: [null],
      apellidoMaternoTutor: [null],
      apellidoPaternoTutor: [null],
      nombresTutor: [null],
    }),
    atencedenteForm: this.fb.group({
      enfermedadesPrevias: [null, [Validators.required]],
      enfermedadesActuales: [null, [Validators.required]],
      alergiasMedicamentos: [null, [Validators.required]],
      lugarNacimiento: [null, [Validators.required]],
      cirugias: [null, [Validators.required]],
    }),
    examenForm: this.fb.group({
      examenGeneral: [null, [Validators.required]],
      estadoPiel: [null, [Validators.required]],
      nutricion: [null, [Validators.required]],
      estadoOseo: [null, [Validators.required]],
      hidratacion: [null, [Validators.required]],
      estadoMuscular: [null, [Validators.required]],
      articulaciones: [null, [Validators.required]],
      toraxYPulmones: [null, [Validators.required]],
      estadoGeneral: [null, [Validators.required]],
    }),
  });

  public get pacienteFormCtrl(): AbstractControl {
    return this.historiaClinicaForm.get('pacienteForm')!;
  }

  public get atencedenteFormCtrl(): AbstractControl {
    return this.historiaClinicaForm.get('atencedenteForm')!;
  }

  public get examenFormCtrl(): AbstractControl {
    return this.historiaClinicaForm.get('examenForm')!;
  }

  constructor(
    private fb: FormBuilder,
    private service: AgregarHistoriaClinicaService,
    private mensajesSwal: MensajesSwalService,
    private mensajesToast: MensajesToastService
  ) {}

  ngOnInit(): void {
    this.menuOptions = [
      { name: 'Datos paciente', value: MENU.Paciente, inactive: false },
      { name: 'Antecedentes', value: MENU.Antecedente, inactive: true },
      { name: 'Examenes', value: MENU.Examen, inactive: true },
    ];
  }

  guardarPaciente(): void {
    if (this.menuControl.value == MENU.Paciente) {
      if (this.pacienteFormCtrl.invalid) {
        this.pacienteFormCtrl.markAllAsTouched();
        return;
      }
      this.menuControl.setValue(MENU.Antecedente);
      const menuSiguiente = this.menuOptions.find(
        (resp) => resp.value === this.menuControl.value
      );
      menuSiguiente.inactive = false;
      return;
    }

    if (this.menuControl.value == MENU.Antecedente) {
      if (this.atencedenteFormCtrl.invalid) {
        this.atencedenteFormCtrl.markAllAsTouched();
        return;
      }
      this.menuControl.setValue(MENU.Examen);
      const menuSiguiente = this.menuOptions.find(
        (resp) => resp.value === this.menuControl.value
      );
      menuSiguiente.inactive = false;
      return;
    }

    if (this.examenFormCtrl.invalid) {
      this.examenFormCtrl.markAllAsTouched();
      return;
    }

    this.saveHistoriaClinica();
  }

  eliminarPaciente(): void {
    if (this.menuControl.value == MENU.Paciente) {
      this.pacienteFormCtrl.reset();
    }

    if (this.menuControl.value == MENU.Antecedente) {
      this.atencedenteFormCtrl.reset();
    }

    if (this.menuControl.value == MENU.Examen) {
      this.examenFormCtrl.reset();
    }
  }

  saveHistoriaClinica(): void {
    const {
      fechaInscrito,
      dni,
      apellidoPaterno,
      genero,
      edad,
      apellidoMaterno,
      etnia,
      correo,
      nombres,
      estadoCivil,
      observaciones,
      dniTutor,
      apellidoMaternoTutor,
      apellidoPaternoTutor,
      nombresTutor,
    } = this.pacienteFormCtrl.value;

    const responsable: Responsable = {
      dni: dniTutor,
      apellidoPaterno: apellidoPaternoTutor,
      apellidomaterno: apellidoMaternoTutor,
      nombres: nombresTutor,
    };

    const paciente: Paciente = {
      dni: dni,
      fechaInscrito: this.formatFecha(fechaInscrito),
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      nombres: nombres,
      sexo: genero,
      etnia: etnia,
      estadoCivil: estadoCivil,
      edad: edad,
      correo: correo,
      observaciones: observaciones,
      estado: 1,
    };

    const examenes: Examenes = this.examenFormCtrl.value;

    const antecedentes: Antecedentes = this.atencedenteFormCtrl.value;

    const request: IHistoriaClinicaRequest = {
      responsable: responsable,
      examenes: examenes,
      antecedentes: antecedentes,
      paciente: paciente,
    };

    this.isLoading = true;
    this.historiaClinicaForm.disable();

    this.service
      .save(request)
      .pipe(
        catchError((error) => {
          this.historiaClinicaForm.enable();
          this.isLoading = false;
          this.mensajesSwal.mensajeError('Ha ocurrido un error, intente luego');
          throw error;
        })
      )
      .subscribe(() => {
        this.mensajesToast.showSuccess(
          'Sus datos han sido guardados exitosamente!'
        );
        this.isLoading = false;
        this.historiaClinicaForm.enable();
        this.historiaClinicaForm.reset();
        this.menuOptions[0].inactive = false;
        this.menuOptions[1].inactive = true;
        this.menuOptions[2].inactive = true;
        this.menuControl.setValue(MENU.Paciente);
      });
  }

  formatFecha(fechaOriginal: string): string {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().split('T')[0];
  }
}
