import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Accion } from '../model/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class PruebaService {


  accion$ = new EventEmitter<Accion>();

   id:string;
  private id$: Subject<string>;  

  constructor() {
    this.id='';
    this.id$ = new Subject();
   }

  accion(id:string){
    this.id= id;
    this.id$.next(this.id);
  }
  getID$(): Observable<string>{
    return this.id$.asObservable();
  }


}
