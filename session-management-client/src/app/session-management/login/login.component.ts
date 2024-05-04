import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/core/utils/util.service';
import { sessionApiList } from 'src/app/core/variables/api-list';
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

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      console.log('this.loginForm',this.loginForm);
      console.log('this.loginForm.invalid',this.loginForm.invalid);
      return this.loginForm.markAllAsTouched();
    }
    const data = this.loginForm.value;
    console.log('data',data);
    // this.apiService.post(sessionApiList.login, data).subscribe({
    //   next:(res: any) => {
    //     console.log('res',res);
    //     if(res.status) {
    //       this.router.navigate(['/admin']);
    //       console.log('res.message',res. );
    //       this.utilService.successToast(res.message);
    //     } else {

    //     }
    //   }, error: (err: HttpErrorResponse) => {
    //     console.log('err',err);
    //   }
    // });
  }

  get form() {
    return this.loginForm.controls;
  }
}
