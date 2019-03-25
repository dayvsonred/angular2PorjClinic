import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

import { VarsProd } from '../../app.varsprod';

@Injectable({
  providedIn: 'root'
})
export class AliquotaImpostosService {

	URLBASE                   : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
    }

    GetAliquotaImpostosRegime(obj){
        return this.http.post(this.URLBASE + '/api/GetAliquotaImpostosRegime',obj).pipe(
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

    GetAllRegimeTributario(){
        return this.http.get(this.URLBASE + '/api/GetAllRegimeTributario').pipe(
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

    GetAllTipoImposto(){
        return this.http.get(this.URLBASE + '/api/GetAllTipoImposto').pipe(
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

    InserirNovaAliquota(objeto){
        return this.http.post(this.URLBASE + '/api/InserirNovaAliquota', objeto).pipe(
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

    ExcluirAliquota(objeto){
        return this.http.post(this.URLBASE + '/api/ExcluirAliquota', objeto).pipe(
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
