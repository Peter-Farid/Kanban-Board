import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInfo:any
  constructor(private _authService:AuthService){}
  ngOnInit(): void {
    this._authService.userData.subscribe({
      next: () => {
        if (this._authService.userData.getValue() != null) {
          this.userInfo = this._authService.userData.getValue();
        }
      }
    })
  }
}
