import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private readonly servicioMensajesSwal: MensajesSwalService

  ) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    usuario: [null, [Validators.required]],
    contrasena: [null, [Validators.required]],
  });

  get usuario() {
    return this.loginForm.get('usuario');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }


  iniciarSesion() {
    const header = this.loginForm.getRawValue();
    this.authService.login(header).subscribe((res) => {
     if(res.usuario){
        this.router.navigate(['./dashboard']);
     } else {
      this.servicioMensajesSwal.mensajeAdvertencia('Verifique usuario y contraseña');
     }
    });
  }

}
