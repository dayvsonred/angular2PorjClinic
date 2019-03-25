import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { VarsProd } from '../../app.varsprod';

@Injectable({
  providedIn: 'root'
})
export class TratamentoDentalvidasLoteGtoService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    GetTratamentosDentalvidasGerarLote(obj){
        return this.http.post(this.URLBASE + '/api/GetTratamentosDentalvidasGerarLote', obj).pipe(
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

    CriarLoteGto(obj){
        return this.http.post(this.URLBASE + '/api/CriarLoteGto', obj).pipe(
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
    };

    ExcluirLoteGto(obj){
        return this.http.post(this.URLBASE + '/api/ExcluirLoteGto', obj).pipe(
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
    };

    /*RegistrarPagtoTratDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/RegistrarPagtoTratDentalvidas', obj).pipe(
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
    };

    RegistrarCancPagtoGlosaDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/RegistrarCancPagtoGlosaDentalvidas', obj).pipe(
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
    };*/

}
