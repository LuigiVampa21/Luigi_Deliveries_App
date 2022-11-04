/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _fireAuth: Auth,
    private _firestore: Firestore,
    private storage: StorageService
  ) { }

  async register(form: any){
    try{
      const registeredUser = await createUserWithEmailAndPassword(this._fireAuth, form.email, form.password);
      console.log('registered user: ', registeredUser);
      const uid = registeredUser.user.uid;
      const dataRef = doc(this._firestore, `users/${uid}`);
      setDoc(dataRef, form);
      this.storage.setPreference('userID', uid);
      return uid;
    }catch(err){
      throw(err);
    }
  }

  async login(form: any) {
    try {
      const response = await signInWithEmailAndPassword(this._fireAuth, form.email, form.password);
      console.log('login user: ', response);
      if(response?.user) {
        const uid = response.user.uid;
        await this.storage.setPreference('userID', uid);
        return uid;
      } else {
        return false;
      }
    } catch(err) {
      throw(err);
    }
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._fireAuth, user => {
        console.log(user);
        if(user) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }
}
