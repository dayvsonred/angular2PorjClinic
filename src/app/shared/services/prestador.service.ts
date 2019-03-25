import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
  
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class PrestadorService {

  	URLBASE : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
    }

    PossuiPerfilAdmin(chaveUsuario: string){
        return this.http.get(this.URLBASE + '/api/PossuiPerfilAdmin/' + chaveUsuario).pipe(
        map(
            response => {
                let restResponse;
                restResponse = response;
                //console.log(restResponse.dados);
                return restResponse.dados;
            },
            error => {
                return error;
            }
        ));
    }
}
