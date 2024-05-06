import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    CalendarModule,
    SidebarModule,
    DropdownModule,
    InputNumberModule,
    ConfirmPopupModule,
    DialogModule,
    FormsModule,
    OverlayPanelModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    CalendarModule,
    SidebarModule,
    DropdownModule,
    InputNumberModule,
    ConfirmPopupModule,
    DialogModule,
    FormsModule,
    OverlayPanelModule
  ]
})
export class SharedModule { }
