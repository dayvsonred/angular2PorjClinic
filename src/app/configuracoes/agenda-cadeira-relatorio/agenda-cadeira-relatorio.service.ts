
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
  
import { VarsProd } from '../../app.varsprod';


@Injectable()
export class AgendaCadeiraRelatorioService {

  URLBASE                     : any;
  URLIndex                    : any;


  constructor(private http:HttpClient, private varsProd:VarsProd ) {
    this.URLBASE = this.varsProd.Api;
    this.URLIndex = this.varsProd.VarUrlId;
  }

  // extractData(res: Response){
  //   return res.json();
  // }


  PrestadorByString(dados){
    // console.log("AddAgDrUnidade");
    return this.http.post(this.URLBASE + '/api/PrestadorByString',dados).pipe(
    map(
            response => {
                // console.log("AddAgDrUnidade");
                // console.log(response);
                // this.RESAddAgDrUnidade = response;
                let rest; rest = response;
                return rest;
            },
            error => {
                return error;
            }
    ));
  }

  

  CadeirasDrPeriodo(dados){
    // console.log("AddAgDrUnidade");
    return this.http.post(this.URLBASE + '/api/CadeirasDrPeriodo',dados).pipe(
    map(
            response => {
                // console.log("AddAgDrUnidade");
                // console.log(response);
                // this.RESAddAgDrUnidade = response;
                let rest; rest = response;
                return rest;
            },
            error => {
                return error;
            }
    ));
  }



}
