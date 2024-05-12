import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IHistoriaClinica } from '../models/historia-clinica.interface';
import { IPaciente } from '../models/paciente.interface';
import { IPacienteRequest } from '../models/paciente-request';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private URLServicio: string = environment.ApiURL;

  constructor( private httpClient:HttpClient) { }

  getPacienteHistorialByDni(param: IPacienteRequest): Observable<IPaciente[]> {
    let url;

    if(param.dni) {
      url = this.httpClient.get<IPaciente[]>(`${this.URLServicio}paciente/getPacienteHistorialByDni?dni=${param.dni}`);
    } else {
      url = this.httpClient.get<IPaciente[]>(`${this.URLServicio}paciente/getPacienteHistorialByDni?apellidos=${param.apellido}`);
    }

    return url;
  }

  getPacienteId(id: number): Observable<IHistoriaClinica[]> {
    return this.httpClient.get<IHistoriaClinica[]>(`${this.URLServicio}paciente/getPaciente?id=${id}`);
  }

  deletePacienteId(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);

    return this.httpClient.put<any>(`${this.URLServicio}paciente/setInactive`, params);
  }
}
