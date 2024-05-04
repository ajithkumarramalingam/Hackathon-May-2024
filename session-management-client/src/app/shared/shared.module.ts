import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
