import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { PacientesService } from '../../services/pacientes.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { MensajesToastService } from 'src/app/shared/services/mensajes-toast.service';
import { IHistoriaClinicaRequest } from 'src/app/modules/historia-clinica/models/historia-clinica-request.interface';
import { Responsable, Paciente, Examenes, Antecedentes } from '../../models/historia-clinica.interface';
import { AgregarHistoriaClinicaService } from 'src/app/modules/historia-clinica/services/agregar-historia-clinica.service';

@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.scss']
})
export class VerPacienteComponent implements OnInit {

  pacienteNombre!: string;
  historiaClinicaForm = this.fb.group({
    pacienteForm: this.fb.group({
      id: [null],
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
      idResponsable: [null],
      dniTutor: [null],
      apellidoMaternoTutor: [null],
      apellidoPaternoTutor: [null],
      nombresTutor: [null],
    }),
    atencedenteForm: this.fb.group({
      id: [null],
      enfermedadesPrevias: [null, [Validators.required]],
      enfermedadesActuales: [null, [Validators.required]],
      alergiasMedicamentos: [null, [Validators.required]],
      lugarNacimiento: [null, [Validators.required]],
      cirugias: [null, [Validators.required]],
    }),
    examenForm: this.fb.group({
      id: [null],
      examenGeneral: [null, [Validators.required]],
      estadoPiel: [null, [Validators.required]],
      nutricion: [null, [Validators.required]],
      estadoOsea: [null, [Validators.required]],
      hidratacion: [null, [Validators.required]],
      estadoMuscular: [null, [Validators.required]],
      articulaciones: [null, [Validators.required]],
      toraxYPulmones: [null, [Validators.required]],
      estadoGeneral: [null, [Validators.required]],
    }),
  });

  isLoading: boolean = false;
  buttonName: string = 'Editar'
  public get pacienteFormCtrl() : AbstractControl  {
    return this.historiaClinicaForm.get('pacienteForm')!;
  }

  public get atencedenteFormCtrl() : AbstractControl  {
    return this.historiaClinicaForm.get('atencedenteForm')!;
  }

  public get examenFormCtrl() : AbstractControl  {
    return this.historiaClinicaForm.get('examenForm')!;
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: PacientesService,
    private serviceHistoria: AgregarHistoriaClinicaService,
    private router: Router,
    private mensajesToast: MensajesToastService,
    private mensajesSwal: MensajesSwalService
  ) {}

  ngOnInit(): void {
    this.historiaClinicaForm.disable();
    this.route.params.pipe(
      switchMap((params) => this.service.getPacienteId(+params['id']))
    ).subscribe((response) => {
      const { responsable, examenes, antecedentes, paciente } = response[0] ;
      this.pacienteNombre = `${paciente.apellidoPaterno} ${paciente.apellidoMaterno} ${paciente.nombres}`;
      this.pacienteFormCtrl.patchValue({
        fechaInscrito: paciente.fechaInscrito,
        dni: paciente.dni,
        id: paciente.idPaciente,
        apellidoPaterno: paciente.apellidoPaterno,
        genero: paciente.sexo,
        edad: paciente.edad,
        apellidoMaterno: paciente.apellidoMaterno,
        etnia: paciente.etnia,
        correo: paciente.correo,
        nombres: paciente.nombres,
        estadoCivil: paciente.estadoCivil,
        observaciones: paciente.observaciones,
        idResponsable: responsable.idResponsable,
        dniTutor: responsable.dni,
        apellidoMaternoTutor: responsable.apellidomaterno,
        apellidoPaternoTutor: responsable.apellidoPaterno,
        nombresTutor: responsable.nombres
      });

      this.atencedenteFormCtrl.patchValue({
        id: antecedentes.idAntecedentes,
        enfermedadesPrevias: antecedentes.enfermedadesPrevias,
        enfermedadesActuales: antecedentes.enfermedadesActuales,
        alergiasMedicamentos: antecedentes.alergiasMedicamentos,
        lugarNacimiento: antecedentes.lugarNacimiento,
        cirugias: antecedentes.cirugias
      });

      this.examenFormCtrl.patchValue({
        id: examenes.idExamenes,
        examenGeneral: examenes.examenGeneral,
        estadoPiel: examenes.estadoPiel,
        nutricion: examenes.nutricion,
        estadoOsea: examenes.estadoOsea,
        hidratacion: examenes.hidratacion,
        estadoMuscular: examenes.estadoMuscular,
        articulaciones: examenes.articulaciones,
        toraxYPulmones: examenes.toraxYPulmones,
        estadoGeneral: examenes.estadoGeneral
      });
    })
  }

  editarYGuardar(): void {
    if (this.buttonName == 'Editar') {
      this.buttonName = 'Guardar'
      this.historiaClinicaForm.enable();
      return;
    }

    this.saveHistoriaClinica();

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
      id,
      idResponsable
    } = this.pacienteFormCtrl.value;

    const examenes: Examenes = this.examenFormCtrl.value;
    const antecedentes: Antecedentes = this.atencedenteFormCtrl.value;

    const responsable: Responsable = {
      idResponsable: idResponsable,
      dni: dniTutor,
      apellidoPaterno: apellidoPaternoTutor,
      apellidomaterno: apellidoMaternoTutor,
      nombres: nombresTutor,
    };

    const paciente: Paciente = {
      idAntecedentes: antecedentes.idAntecedentes,
      idExamenes: examenes.idExamenes,
      idPaciente: id,
      idResponsable: idResponsable,
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

    const request: IHistoriaClinicaRequest = {
      responsable: responsable,
      examenes: examenes,
      antecedentes: antecedentes,
      paciente: paciente,
    };

    this.isLoading = true;
    this.historiaClinicaForm.disable();

    this.serviceHistoria
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
          'Sus datos han sido actualizados exitosamente!'
        );
        this.router.navigate(['/pacientes'], { relativeTo: this.route });
      });
  }

  formatFecha(fechaOriginal: string): string {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().split('T')[0];
  }

  volver(): void {
    this.mensajesSwal.mensajePregunta('¿Está seguro de volver atrás?').then((respuesta) => {
      if( respuesta.isConfirmed) {
        this.router.navigate(['/pacientes'], { relativeTo: this.route });
      }
    })
  }
}
