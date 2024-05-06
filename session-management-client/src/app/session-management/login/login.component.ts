import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/core/utils/util.service';
import { sessionApiList } from 'src/app/core/variables/api-list';
import { roles } from 'src/app/core/variables/enum';
import { ILoginResponse } from 'src/app/core/variables/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private utilService: UtilService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [
        Validators.required, 
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      password: [null, [
        Validators.required, 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/),
        Validators.minLength(8),
        Validators.maxLength(50)
      ]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
  
    const data = this.loginForm.value;
  
    this.apiService.post(sessionApiList.login, data).subscribe({
      next: (res: ILoginResponse) => {
        if (res.status) {
          switch (res.role) {
            case roles.ADMIN:
              this.router.navigate(['/admin']);
              break;
            case roles.USER:
              this.router.navigate(['/user']);
              break;
            default:
              this.utilService.errorToast(res.message);
          }
          this.utilService.successToast(res.message);
        } else {
          this.utilService.errorToast(res.message);
        }
      }, 
      error: (err: HttpErrorResponse) => {
        console.log('err', err);
      }
    });
  }
  
  get form() {
    return this.loginForm.controls;
  }
}
