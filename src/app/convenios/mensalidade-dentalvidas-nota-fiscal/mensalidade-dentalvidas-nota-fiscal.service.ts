import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { VarsProd } from '../../app.varsprod';

@Injectable({
  providedIn: 'root'
})
export class MensalidadeDentalvidasNotaFiscalService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    GetLotesMensalidadeNotaFiscal(obj){
        return this.http.post(this.APIDENTAL + '/api/getLotesMensalidadeNotaFiscal', obj).pipe(
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

    UploadNotaFiscalLoteMens(formData){
        return this.http.post(this.APIDENTAL + '/api/uploadNotaFiscalLoteMens', formData).pipe(
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

    GetUrlNotaFiscalLoteMens(obj){
        return this.http.post(this.APIDENTAL + '/api/getUrlNotaFiscalLoteMens', obj).pipe(
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
