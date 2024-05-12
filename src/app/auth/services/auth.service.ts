import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth, IAuthSuccess } from '../models/auth';
import { tap } from 'rxjs/operators';
import { USERS } from 'src/app/global/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //private URLServicio: string = environment.URLTienda;
  private _auth: IAuthSuccess | undefined;

  constructor(private http: HttpClient,
    private router: Router
  ) {
    localStorage.removeItem('token');
  }

  get auth(): IAuthSuccess {
    return this._auth ? { ...this._auth! } : JSON.parse(localStorage.getItem('token')!);
  }

  verificarAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['./']);
      return of(false);
    }

    return of(true);
  }

  login(header: IAuth): Observable<IAuthSuccess> {
    const logueado = USERS.find((user) => (user.usuario === header.usuario) && (user.contrasena === header.contrasena));
    return of({ usuario: logueado } as IAuthSuccess).pipe(
      tap(auth => { this._auth = auth }),
      tap((auth: any) => localStorage.setItem('token', JSON.stringify(auth.usuario))),
    );
  }

  logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
