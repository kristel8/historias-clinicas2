import { IUsuario } from "./usuario.model";

export interface IAuth {
  contrasena: string,
  usuario: string
}

export interface IAuthSuccess {
  usuario: IUsuario,
}
