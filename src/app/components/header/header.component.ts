import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser:string;
 
  permitirRegistro:boolean;

  constructor(private loginService:LoginService,
              private router:Router, 
              private confServicio:ConfiguracionService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth=>{
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    
    
    this.confServicio.getConfiguracion().subscribe(conf =>{
      this.permitirRegistro = conf.permitirRegistro;
    })
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

  }

}
