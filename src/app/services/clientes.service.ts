import { Cliente } from './../model/cliente.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PruebaService } from './prueba.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clienteColeccion: AngularFirestoreCollection<Cliente>;
  clienteeDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;
  
  id:string='';

  constructor(private db: AngularFirestore,
             private prueba: PruebaService) {
    this.clienteColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );

   

  }

  getClientes(): Observable<Cliente[]> {
    // obtener clientes

    this.clientes = this.clienteColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clienteColeccion.add(cliente);
  }

   

  getCliente(id: string) {

      // console.log('prueba',id);
    
    this.clienteeDoc = this.db.doc<Cliente>(`clientes/${id}`); //ctrl + alt + } ``
    this.cliente = this.clienteeDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  modificarCliente(cliente:Cliente){
    this.clienteeDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteeDoc.update(cliente); 
  }

  deleteCliente(idBook: string): void {
    this.clienteeDoc = this.db.doc<Cliente>(`clientes/${idBook}`);
    this.clienteeDoc.delete();
  }

}
