
import {map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
//import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { VarsProd } from '../../app.varsprod';

@Injectable()
export class MensalidadeDentalvidasService {
	
	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        // this.URLBASE = "http://localhost:8000";
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
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

    GetMensalidadesReceber(obj){
        return this.http.post(this.APIDENTAL + '/api/getDadosMensalidadeVisaoWebdental', obj).pipe(
        map(
            response => {
                let restResponse;
                restResponse = response;
                return restResponse;
            },
            error => {
                return error;
            }
        ));
    }

}
