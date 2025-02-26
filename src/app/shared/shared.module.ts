import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from './components/button/button.component';
import { ChatComponent } from './components/chat/chat.component';
import { FooterTemplateComponent } from './components/footer-template/footer-template.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarTemplateComponent } from './components/navbar-template/navbar-template.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarTemplateComponent } from './components/sidebar-template/sidebar-template.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table/table.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { StyleButtonDirective } from './directives/style-button.directive';
import { StyleEstadoDirective } from './directives/style-estado.directive';
import { FlagsPipe } from './pipes/flags.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    TableComponent,
    ButtonComponent,
    ChatComponent,
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
    ToastModule,
    ReactiveFormsModule,
    FormsModule
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
    ChatComponent,
    StyleButtonDirective,
    NumbersOnlyDirective
  ],
  providers: [MessageService]
})
export class SharedModule { }
