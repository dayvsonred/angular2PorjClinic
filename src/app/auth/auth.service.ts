
import {map} from 'rxjs/operators';
import { Injectable /*EventEmitter*/ } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from "rxjs/BehaviorSubject";
// import { Observable } from 'rxjs/Rx';



// import { Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
  

// import { User } from './user.interface';
import { VarsProd } from '../app.varsprod';


@Injectable()
export class AuthService {

  //private _showNavBar = new BehaviorSubject<boolean>(null);
 // public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;
  RESUserValid  : any;
  URLBASE       : any;
  RESVal1       : any = null;

  constructor(
    private router: Router, 
    private http:HttpClient, 
    private varsProd:VarsProd 
  ) {
    // this.URLBASE = "http://localhost:8000";
    // this.URLBASE = "http://laravel.webdental.com.br";
    this.URLBASE = this.varsProd.Api;
    console.log(this.varsProd.Api);
    // console.log("wwwwwwwwwwww");
   }

  signIn(Obj) {
    // if ((user.email === 'user@email.com' || user.email === 'usuario@email.com') 
    //   && user.password === '123456'){
    //  if (1 == 1){
    if (Obj && Obj.error == false ){
        this.authenticated = true;
        // console.log("logado com sussesso! ");
        // console.log(this.RESUserValid);
        // sessionStorage.removeItem('LoginTok');
        //           sessionStorage.setItem('LoginTok' , JSON.stringify(arrayGrup));
        //this.showNavBar(true);
        //this.router.navigate(['/signin']);
    } else {
      this.authenticated = false;
    }
  }

  logout() {
    this.authenticated = false;
    //this.showNavBar(false);
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  UserValid(toke){
    // console.log("user validadno ++++++++++++");
    //console.log('http://localhost:8000/api/AuthFast/'+toke);
     return this.http.post(this.URLBASE + '/api/AuthFast/'+toke,null).pipe(
      map(
              response => {
                // console.log('UserValid *********************');
                // console.log(response.json());
                this.RESUserValid = response;
                this.signIn(response);
                
                return this.RESUserValid.dados;
            },
            error => {
                //console.log("entour no erro ");
                this.logout();
                return error;
            }
      ));

  }

  private showNavBar(ifShow: boolean) {
    // this.showNavBarEmitter.emit(ifShow);
  }
}
