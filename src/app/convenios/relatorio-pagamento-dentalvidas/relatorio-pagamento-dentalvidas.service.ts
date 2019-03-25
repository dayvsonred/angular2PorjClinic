import {map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable({
  providedIn: 'root'
})
export class RelatorioPagamentoDentalvidasService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    GetDadosPagamentoDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/GetPagamentoDentalvidasGTO', obj).pipe(
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
