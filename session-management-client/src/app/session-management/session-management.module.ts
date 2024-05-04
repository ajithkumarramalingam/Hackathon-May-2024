import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionManagementRoutingModule } from './session-management-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UsersComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SessionManagementRoutingModule,
    SharedModule
  ]
})
export class SessionManagementModule { }
