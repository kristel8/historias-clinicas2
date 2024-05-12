import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TableComponent } from './components/table/table/table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from './components/button/button.component';
import { ButtonModule } from 'primeng/button';
import { StyleButtonDirective } from './directives/style-button.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { SidebarTemplateComponent } from './components/sidebar-template/sidebar-template.component';
import { NavbarTemplateComponent } from './components/navbar-template/navbar-template.component';
import { FooterTemplateComponent } from './components/footer-template/footer-template.component';
import { FlagsPipe } from './pipes/flags.pipe';
import { StyleEstadoDirective } from './directives/style-estado.directive';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    TableComponent,
    ButtonComponent,
    StyleButtonDirective,
    NumbersOnlyDirective,
    SidebarTemplateComponent,
    NavbarTemplateComponent,
    FooterTemplateComponent,
    FlagsPipe,
    StyleEstadoDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ToastModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TableComponent,
    ButtonComponent,
    SidebarTemplateComponent,
    StyleButtonDirective,
    NumbersOnlyDirective
  ],
  providers: [MessageService]
})
export class SharedModule { }
