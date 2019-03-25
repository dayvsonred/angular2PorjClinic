
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../app.varsprod';



@Injectable()
export class TblImprimirService {


  URLBASE                     : any;
  URLIndex                    : any;

  
constructor(private http:HttpClient, private varsProd:VarsProd ) {
  this.URLBASE = this.varsProd.Api;
  this.URLIndex = this.varsProd.VarUrlId;
}

  extractData(res: Response){
    return res.json();
  }

  CancelAgDellDr(dados){
    // console.log("AgCadeirasDentiSemana");
    return this.http.post(this.URLBASE + '/api/CancelAgDellDr',dados).pipe(
    map(
            response => {
                // console.log(response);
                let rest; rest = response;
                return rest.dados;
            },
            error => {
                return error;
            }
    ));
  }


}
