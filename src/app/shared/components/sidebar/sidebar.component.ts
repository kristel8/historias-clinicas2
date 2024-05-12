import { Component, OnInit } from '@angular/core';
import { IItemMenu, IUserLogueado } from './models/sidebar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  Menu: IItemMenu [] = [];
  Usuario!: IUserLogueado;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getMenu();
  }

  getUsuario () {
    const usuarioLogueado: IUserLogueado = {
      imagen: '',
      nombre: 'Amanda Belliski',
      rol: 'Administrador'
    }

    this.Usuario = usuarioLogueado;
  }


  getMenu () {
    const itemsMenu: IItemMenu[]= [
      {
        nombre: 'Agregar historia clinica',
        ruta: '/agregar-historia-clinica',
        icono: 'pi pi-plus icon2',
        estado: false,
        subMenu: []
      },
      {
        nombre: 'Buscar pacientes',
        ruta: '/pacientes',
        icono: 'pi pi-search icon2',
        estado: false,
        subMenu: []
      },
      {
        nombre: 'Historias clinicas',
        ruta: '/dashboard',
        estado: false,
        icono: 'pi pi-file icon2',
        subMenu: []
      },
    ]



   this.Menu = itemsMenu;

  //  this.menuService.getAllActive().subscribe(res => {
  //    this.Menu = res;
  //    console.log( this.Menu );
  //  })
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['./']);
  }
}
