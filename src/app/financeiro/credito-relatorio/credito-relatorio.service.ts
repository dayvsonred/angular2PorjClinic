
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class CreditoRelatorioService {

  URLBASE                   : any;
  URLIndex                  : any;

  constructor(private http:HttpClient, private varsProd:VarsProd ) {
    //this.GetAllTratamentos();
    // this.URLBASE = "http://localhost:8000";
    this.URLBASE = this.varsProd.Api;
    this.URLIndex = this.varsProd.VarUrlId;
  }



  GetUnitPacientBonus(obj){
    // console.log('GetUnitPacientBonus');
    //console.log(id);
    return this.http.post(this.URLBASE + '/api/GetUnitPacientBonus',obj).pipe(
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
