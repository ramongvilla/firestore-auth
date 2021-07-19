import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../model/cliente.model';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  login(user: User) {
    return new Promise((resolve, reject) => {
      this.authService
        .signInWithEmailAndPassword(user.email, user.password)
        .then(
          (datos) => resolve(datos),
          (error) => reject(error),
          
        )
    })
  }
  // async login(user: User) {
  //   await this.authService.signInWithEmailAndPassword(user.email, user.password)
  //     .then(response => {
  //       // obtener token
  //       response.user.getIdToken().then(res=>{

  //         console.log('hola que hace',res);

  //       })
        
  //       // this.authService.idToken
  //       // this.isLoggedIn = true

  //       localStorage.setItem('@AngularAuthFirebase:user', JSON.stringify(response.user))
  //     })
  // }

  // obtener el usuario que se ha autenticado
  getAuth(){
    return this.authService.authState.pipe(
      map(auth=> auth)
    );
  }

  logout(){
    this.authService.signOut();
  }

  registrarse(user:User){
    return new Promise((resolve, reject)=>{
      this.authService.createUserWithEmailAndPassword(user.email,user.password)
      .then(datos => resolve(datos),
      error => reject(error))
    });
  }


}
