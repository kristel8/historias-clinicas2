import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHistoriaClinicaResponse } from '../models/historia-clinica-response.interface';
import { IHistoriaClinicaRequest } from '../models/historia-clinica-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AgregarHistoriaClinicaService {

  private URLServicio: string = environment.ApiURL;

  constructor( private httpClient:HttpClient) { }

  save(data: IHistoriaClinicaRequest):Observable<IHistoriaClinicaResponse[]> {
    return this.httpClient.post<IHistoriaClinicaResponse[]>(`${this.URLServicio}paciente/save`, data);
  }

}
