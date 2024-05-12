import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHistoriaClinica } from '../models/historia-clinica.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private URLServicio: string = environment.ApiURL;

  constructor( private httpClient:HttpClient) { }

  getHistoriaClinica(): Observable<IHistoriaClinica[]> {
    return this.httpClient.get<IHistoriaClinica[]>(`${this.URLServicio}paciente/getPacienteHistorial`);
  }


  deleteHistoriaId(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);

    return this.httpClient.put<any>(`${this.URLServicio}paciente/setInactive`, params);
  }
}
