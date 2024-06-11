import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isLoading: boolean = false;
  errorMessage: string = "";

  signUpForm: FormGroup = new FormGroup({
    user_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    avatar: new FormControl(null),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  constructor(private _authService: AuthService, private _router: Router,private _toastr:ToastrService) {
    if (this._authService.userData.getValue()) {
      this._router.navigate(['/'])
    }
  }

  submitsignUpForm(registerForm: FormGroup) {
    this.isLoading = true;
    if (this.signUpForm.valid) {
      const user = this._authService.signUp(registerForm.value.user_name, registerForm.value.email, registerForm.value.password)
      if (user != null) {
        this.isLoading = false;
        this._router.navigate(['/signIn']);
        this._toastr.success('User Registered Successfuly! Please Sign In')
      }
      //   next: (res) => {
      //     if (res.status == 1 && res.statusCode == 200) {
      //       this.isLoading = false;
      //       localStorage.setItem("userToken", res.token);
      //       this._authService.saveUserData();
      //       this._router.navigate(['/home']);
      //     }
      //   },
      //   error: (err) => {
      //     this.errorMessage = err.error.message;
      //     this.isLoading = false;
      //   }
      // })
    }
  }
}
