import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import { jwtDecode } from 'jwt-decode';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  token: any

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,

    private _HttpClient: HttpClient,
    private _router: Router) {
    if (localStorage.getItem('userToken')) {
      this.token = localStorage.getItem('userToken')
      if (isJwtTokenExpired(this.token)) {
        this.signOut()
      }
      else {
        this.saveUserData();
      }
    }
  }
  userData: any = new BehaviorSubject(null);
  userName: any
  async signUp(username: string, email: string, password: string) {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.updateUserData(user, username);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);

      return user;
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  }

  async getIdToken() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return await user.getIdToken();
    } else {
      return null;
    }
  }

  async updateUserData(user: any, username?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: username || user.displayName,
    };
    await userRef.set(data, { merge: true });
    console.log(userRef);

  }
  saveUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    this.isLogged = true;
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem("userToken");
    this.isLogged = false;
    this.userData.next(null);
    this._router.navigate(['/signIn'])
  }
}

