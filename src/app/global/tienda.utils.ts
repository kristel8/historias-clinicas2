import { Injectable } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class TiendaUtils {
  token: any;

  constructor( authService: AuthService) {
    this.token = authService.auth;
  }

  get logueado() {
    return this.token;
  }

  get idSucursal() {
    return this.token.idSucursal;
  }

  get idUsuario() {
    return this.token.idUsuario;
  }
}
