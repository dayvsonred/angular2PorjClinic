import {map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable({
  providedIn: 'root'
})
export class RelatorioRecebimentoDentalvidasService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    GetDadosRecebimentoDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/GetRecebimentoDentalvidasGTO', obj).pipe(
            map(
                response => {
                    let restResponse;
                    restResponse = response;
                    return restResponse;
                },
                error => {
                    return error;
                }
            ),
            mergeMap(resultado => {
                
                let objParam = {
                    dataInicio: obj.dataInicio,
                    dataFim: obj.dataFim,
                    chaveUnidade: obj.chaveUnidade,
                    baseDados: obj.baseDados
                }

                return this.http.post(this.APIDENTAL + '/api/getRecebimentoMensVisaoWebdental', objParam).pipe(
                    map(resp => {
                        
                        let restResp;
                        restResp = resp;
                        
                        if(restResp.Dados)
                        {
                            console.log(restResp.Dados);
                            resultado.mensalidades = restResp.Dados;
                        }

                        return resultado;
                    }
                ));
            })
        );
    }
}
