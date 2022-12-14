import { Injectable } from '@angular/core';
import  {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';





@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string){
      return new Promise((resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then((userData) => resolve(userData), (error) => reject(error))
      })
  }

  loginWithGoogle(){

    return new Promise((resolve, reject) => {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((userData) => resolve(userData), (error) => reject(error))
    })

  }

  register(email: string, password: string){

    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
          .then((userData) => resolve(userData), (error) => reject(error))
    })

  }


  getAuth(){
    return this.afAuth.authState.pipe(auth => auth);
  }

  logout(){
    this.afAuth.signOut();
  }
}
