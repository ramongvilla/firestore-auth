import { Accion } from './../../model/cliente.model';
import { element } from 'protractor';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  public clientesFormGroup: FormGroup;
  clientes: Cliente[];
  titulo: string = 'Agregar Cliente';
  // cerrar modal
  @ViewChild('closebutton') closebutton;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private flashMessages: FlashMessagesService,
    private prueba: PruebaService
  ) {
    this.clientesFormGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      saldo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
  // accion:Accion;
  accionEditar(id: string) {
    let accion: Accion = { title: 'Editar Cliente', esEditar: true };
    this.prueba.accion$.emit(accion);
    this.prueba.accion(id);
  }
  accionAgregar() {
    let accion: Accion = { title: 'Agregar Cliente', esEditar: false };
    this.prueba.accion$.emit(accion);
    // this.prueba.titulo$.emit('Agregar Cliente');
  }

  accionEliminar(id:string){
    if (confirm('Seguro que desea eliminar el cliente?')) {
      this.clientesService.deleteCliente(id); 
      
    }

  }

  // private buildForm() {
  //   const name = 'JOHN DOE';
  //   const minPassLength = 4;
  //   this.formGroup = this.formBuilder.group({
  //     // registeredOn: today,
  //     // name: [name.toLowerCase(), Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(minPassLength),
  //         this.validatePassword,
  //       ],
  //     ],
  //   });
  // }

  getSaldoTotal() {
    // this.clientes.length;
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += Number(cliente.saldo);
      });
    }
    return saldoTotal;
  }

  public register() {
    if (this.clientesFormGroup.invalid) {
      this.flashMessages.show('llene el formulario, no sea imbecil', {
        cssClass: 'alert-danger',
        setTimeout: 400,
      });
      //false
      this.getErrolAll();
    } else {
      const cliente: Cliente = this.clientesFormGroup.value;
      this.clientesService.agregarCliente(cliente);
      this.clientesFormGroup.reset();
      // cerrar modal
      this.closebutton.nativeElement.click();

      console.log('cientes', cliente);
    }

    // this.loginService.login(user);
  }

  validation_messages = [{ type: 'required', message: 'Campo requerido.' }];

  validarAll: boolean = true;

  public prueba1(): boolean {
    return true;
  }

  public getErrolAll() {
    Object.keys(this.clientesFormGroup.controls).forEach((key) => {
      // console.log('entramos', key);
      // this.getError(key);
      // const control = this.clientesFormGroup.get(key);
      // this.prueba1():
      this.validarAll = false;
      this.getError(key);
    });
  }

  public getError(controlName: string): string {
    // console.log('entramos', controlName);

    let error = '';
    const control = this.clientesFormGroup.get(controlName);
    //  console.log(control);

    for (let index = 0; index < this.validation_messages.length; index++) {
      const element = this.validation_messages[index];

      if (this.validarAll) {
        error = this.uno(control, element, index);
      } else {
        error = this.todos(control, element, index);
      }
    }
    return error;
  }

  uno(control, element, index) {
    let error;
    if (control?.hasError(element.type) && (control.dirty || control.touched)) {
      error = this.validation_messages[index].message;
    }
    return error;
  }

  todos(control, element, index) {
    let error;
    if (control?.hasError(element.type)) {
      error = this.validation_messages[index].message;
    }
    return error;
  }

  // function errorAll(controlName: string): string {
  //   return controlName;
  // }
}
