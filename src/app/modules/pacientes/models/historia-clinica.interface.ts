export interface IHistoriaClinica {
  responsable: Responsable;
  examenes: Examenes;
  antecedentes: Antecedentes;
  paciente: Paciente;
}

export interface Antecedentes {
  idAntecedentes?: any;
  enfermedadesPrevias: string;
  enfermedadesActuales: string;
  alergiasMedicamentos: string;
  lugarNacimiento: string;
  cirugias: string;
}

export interface Examenes {
  idExamenes?: any;
  examenGeneral: string;
  estadoPiel: string;
  nutricion: string;
  estadoOsea: string;
  hidratacion: string;
  estadoMuscular: string;
  articulaciones: string;
  toraxYPulmones: string;
  estadoGeneral: string;
}

export interface Paciente {
  idPaciente?: any;
  dni: string;
  fechaInscrito: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  sexo: string;
  etnia: string;
  estadoCivil: string;
  edad: string;
  correo: string;
  observaciones: string;
  idResponsable?: any;
  idAntecedentes?: any;
  idExamenes?: any;
  estado: number;
}

export interface Responsable {
  idResponsable?: any;
  dni: string;
  apellidoPaterno: string;
  apellidomaterno: string;
  nombres: string;
}
