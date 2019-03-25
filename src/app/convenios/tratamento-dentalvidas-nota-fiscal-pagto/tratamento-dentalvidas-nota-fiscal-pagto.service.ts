import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { VarsProd } from '../../app.varsprod';

@Injectable({
  providedIn: 'root'
})
export class TratamentoDentalvidasNotaFiscalPagtoService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    GetLotesDentalvidasPagar(obj){
        return this.http.post(this.URLBASE + '/api/GetLotesDentalvidasPagar', obj).pipe(
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

    GetUrlNotaFiscalLote(obj){
        return this.http.post(this.URLBASE + '/api/GetUrlNotaFiscalLote', obj).pipe(
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

    RegistrarPagtoLotesDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/RegistrarPagtoLotesDentalvidas', obj).pipe(
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

    RegistrarCancPagtoNFDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/RegistrarCancPagtoNFDentalvidas', obj).pipe(
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
