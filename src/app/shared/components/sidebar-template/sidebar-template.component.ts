import { Component, OnInit } from '@angular/core';
import { IItemMenu, IUserLogueado } from '../sidebar/models/sidebar';

@Component({
  selector: 'app-sidebar-template',
  templateUrl: './sidebar-template.component.html',
  styleUrls: ['./sidebar-template.component.scss']
})
export class SidebarTemplateComponent implements OnInit {

  Menu: IItemMenu [] = [];
  Usuario!: IUserLogueado;

  constructor() { }

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
        nombre: 'Inicio',
        ruta: '/dashboard',
        estado: false,
        icono: 'nav-icon fas fa-copy',
        subMenu: []
      },
      {
        nombre: 'Empleado',
        ruta: '/empleados',
        icono: 'nav-icon fas fa-copy',
        estado: false,
        subMenu: []
      },
    ]



   this.Menu = itemsMenu;

  //  this.menuService.getAllActive().subscribe(res => {
  //    this.Menu = res;
  //    console.log( this.Menu );
  //  })
  }
}
