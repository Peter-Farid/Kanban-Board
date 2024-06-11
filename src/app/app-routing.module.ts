import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BoardComponent } from './board/board.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'', redirectTo:'board', pathMatch:'full'},
  {path:'signIn',component:SignInComponent,title:"Sign In"},
  {path:'signUp',component:SignUpComponent,title:"Sign Up"},
  {path:'board',component:BoardComponent, canActivate: [AuthGuard] ,title:"Kanban Board"},
  {path:'profile',component:ProfileComponent, canActivate: [AuthGuard] ,title:"Profile"},
  {path:'**', component:NotFoundComponent, title:"Page Not Found !"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
