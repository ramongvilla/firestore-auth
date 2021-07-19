import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/model/configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro=false; 
  constructor( private router: Router,
               private confService: ConfiguracionService) { }

  ngOnInit(): void {
    this.confService.getConfiguracion().subscribe(
      (configuracion: Configuracion) =>{
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro};
    this.confService.modificarConfiguracion(configuracion); 
    this.router.navigate[('/')];

  }

}
