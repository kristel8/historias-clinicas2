import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private apiKey = 'AIzaSyD_2u5FuRh8w6gHMP9eiEmuasCbunyrekM'; // 🔑 Sustituye por tu API Key de Gemini

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      contents: [{ parts: [{ text: message }] }]
    };

    return this.http.post<any>(`${this.apiUrl}?key=${this.apiKey}`, body, { headers }).pipe(
      map(response => response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta.')
    );
  }
}
