import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracionService } from '../services/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGuard implements CanActivate {
  
  constructor(private router: Router,
              private configService: ConfiguracionService ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.configService.getConfiguracion().pipe(
      map( conf => {
        if (conf.permitirRegistro) {
          return true
        }else{
          this.router.navigate(['/login']);
          return false
        }
      })
    )
  }
  
}
