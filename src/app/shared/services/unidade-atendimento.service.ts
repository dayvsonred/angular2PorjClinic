import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
//import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

//import 'rxjs/add/operator/map';  

@Injectable()
export class UnidadeAtendimentoService {
	
	URLBASE : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
    }

    GetUnidadesPrestador(obj){
        return this.http.post(this.URLBASE + '/api/GetUnidadesPrestador',obj).pipe(
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

    GetAllUnidadeAtendimento(){
        return this.http.get(this.URLBASE + '/api/GetAllUnidadeAtendimento').pipe(
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
