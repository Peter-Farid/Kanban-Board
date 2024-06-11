import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private _authService: AuthService) { }
  userInfo: any = {};
  isLogin: boolean = false;
  token: any
  userName: any

  logOut() {
    this._authService.signOut();
  }
  ngOnInit(): void {
    this._authService.userData.subscribe({
      next: () => {
        if (this._authService.userData.getValue() != null) {
          this.isLogin = true;
          this.userInfo = this._authService.userData.getValue();
        }
        else {
          this.isLogin = false;
        }
      }
    })
  }
}
