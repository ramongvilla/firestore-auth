import { ClientesService } from './../../services/clientes.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Accion, Cliente } from 'src/app/model/cliente.model';
import { PruebaService } from 'src/app/services/prueba.service';
import { noop } from 'rxjs';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss'],
})
export class FormClienteComponent implements OnInit {
  public clientesFormGroup: FormGroup;
  clientes: Cliente[];
  titulo: string = 'Agregar Cliente';
  id: string = '';
  cliente: Cliente;
  accion: Accion;
  esEdirar: boolean;
  // cerrar modal
  @Input() closebutton;

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
    this.prueba.getID$().subscribe((id) => {
      this.id = id;
      this.getClientes(this.id);
    });

    this.prueba.accion$.subscribe((accion) => {
      this.accion = accion;

      console.log(this.esEdirar= accion.esEditar);
      
      
      // console.log('hola',this.accion.esEditar);  
      this.titulo = this.accion.title;
    });
  }

  // cargar datos en cada campo

  prueba11 = {
  "apellido": "asdf",
  "email": "sdf",
  "nombre": "asadf",
  "saldo": 51514}

  getClientes(id: string): void {
    this.clientesService.getCliente(id).subscribe((cliente) => {
      // this.clientesFormGroup.setValue({
      //   nombre: cliente.nombre,
      //   apellido: cliente.apellido,
      //   email: cliente.email,
      //   saldo: cliente.saldo,
      // });
      this.prueba11 = {
        apellido: cliente.apellido,
        email: cliente.email,
        nombre: cliente.nombre,
        saldo: cliente.saldo
      }
      // console.log(cliente);
      
      this.clientesFormGroup.setValue(this.prueba11);
    });

  }

  // this.clientesService.getClientes().subscribe((clientes) => {
  //   this.clientes = clientes;
  // });

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
      
      // definir si es editar o agregar
      
      if (this.esEdirar) {
        cliente.id = this.id;
        this.clientesService.modificarCliente(cliente);
        
      } else {
        // console.log('editar es falso');
        this.clientesService.agregarCliente(cliente);
        
      }

      
      
      this.clientesFormGroup.reset();
      // cerrar modal

      this.closebutton.nativeElement.click();
      //es importante para que se limpien las alertas
      this.validarAll = true;
      // this.getError('');
      console.log('cientes', cliente);
    }
  }



  cerrar() {}

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
