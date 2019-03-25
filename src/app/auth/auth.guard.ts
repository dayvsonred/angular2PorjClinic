import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad , Route} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

  constructor(
    private router: Router,
    private authService: AuthService) {
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
     //console.log("atenticando");


    //  console.log(this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      return this.verificarAcessoPg();
    }
    /** se nao autenticar ele retorna false e vai para a rota abaixo */
    // console.log("go signin ");
    // console.log(this.router);
    this.router.navigate(['/signin']);
    if(!sessionStorage.getItem('toke')){
      this.alertMe("Erro na autenticação - acesse sua conta novamente! ");
    }
    return false;
  }

  alertMe(MSG): void {
    setTimeout(function(): void {
      alert(MSG);
    });
  }

  private verificarAcessoPg(){


    if (this.authService.isAuthenticated()) {
      return true;
    }
    /** se nao autenticar ele retorna false e vai para a rota abaixo */
    // console.log("go signin ");
    // console.log(this.router);
    this.router.navigate(['/signin']);
    if(!sessionStorage.getItem('toke')){
      this.alertMe("Erro na autenticação - acesse sua conta novamente! ");
    }
    return false;
  }

  canLoad(route: Route ): Observable<boolean>|Promise<boolean>|boolean{
    return this.verificarAcessoPg();

  }


}
