import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import firebase from 'firebase/compat';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  isLoading: boolean = false;
  userData: any

  token: any


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })
  constructor(private _authService: AuthService, private _router: Router) {
    if (this._authService.userData.getValue()) {
      this._router.navigate(['/'])
    }
  }
  async submitLoginForm(loginForm: FormGroup) {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.userData = await this._authService.signIn(loginForm.value.email, loginForm.value.password)
      if (this.userData) {
        this.token = await this._authService.getIdToken()
            localStorage.setItem("userToken", this.token);
        this.isLoading = false;
        await this._authService.saveUserData();
        this._router.navigate(['/board']);
      }

      // this._authService.signIn(registerForm.value).subscribe({
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
