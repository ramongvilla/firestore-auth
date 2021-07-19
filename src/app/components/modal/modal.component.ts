import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Accion, Cliente } from 'src/app/model/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public clientesFormGroup: FormGroup;
  clientes: Cliente[];
  titulo: string = 'Agregar Cliente!!';
  accion:Accion;
  // cerrar modal
  // @ViewChild(ProfileHostDirective, { static: true })
  @ViewChild('closebutton', { static: true }) closebutton;
  aver;

  close() {
    this.ngOnDestroy();
    return this.closebutton;
  }

  ngOnDestroy(): void {
    // console.log('hola');
  }

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private flashMessages: FlashMessagesService,
    private prueba:PruebaService
  ) {
    this.clientesFormGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      saldo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
    this.prueba.accion$.
    subscribe(accion=>{
      this.accion=accion
      // this.esEditar();
      // console.log(this.accion);
      
      this.titulo=this.accion.title;
    });


    this.aver = this.closebutton;
    console.log(this.aver);
    // console.log(this.closebutton);
    this.clientesService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
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
    // this.aver.nativeElement.click();
    // if (this.clientesFormGroup.invalid) {
    //   this.flashMessages.show('llene el formulario, no sea imbecil', {
    //     cssClass: 'alert-danger',
    //     setTimeout: 400,
    //   });
    //   //false
    //   this.getErrolAll();
    // } else {
    //   const cliente: Cliente = this.clientesFormGroup.value;
    //   this.clientesService.agregarCliente(cliente);
    //   this.clientesFormGroup.reset();
    //   // cerrar modal
    //   console.log('cientes', cliente);
    // }
    // // this.loginService.login(user);
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
