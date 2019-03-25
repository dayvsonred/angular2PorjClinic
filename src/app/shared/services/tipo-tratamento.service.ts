
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
//import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
  
import { VarsProd } from '../../app.varsprod';


@Injectable()
export class TipoTratamentoService {

	URLBASE : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
    }

    GetAllTipoTratamento(){
        return this.http.get(this.URLBASE + '/api/GetAllTipoTratamento').pipe(
        map(
            response => {
                let restResponse;
                restResponse = response;
                return restResponse.dados;
            },
            error => {
                return error;
            }
        ));
    }

}
