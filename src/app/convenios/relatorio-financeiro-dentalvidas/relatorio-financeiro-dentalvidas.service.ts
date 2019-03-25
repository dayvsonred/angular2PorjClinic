import {map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
//import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class RelatorioFinanceiroDentalvidasService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    /*GetDadosFinanceirosDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/GetDadosFinanceirosDentalvidas', obj).pipe(
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
                    status: 'confirmados',
                    chaveUnidade: obj.chaveUnidade,
                    baseDados: obj.baseDados
                }

                return this.http.post(this.APIDENTAL + '/api/getDadosMensalidadeVisaoWebdental', objParam).pipe(
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
    }*/

    GetDadosFinanceirosDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/GetDadosFinancConsolidadosDentalvidas', obj).pipe(
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
                    anoMes: obj.anoMes,
                    chaveUnidade: obj.chaveUnidade,
                    baseDados: obj.baseDados
                }

                return this.http.post(this.APIDENTAL + '/api/getRecebMensConsolidadoUnidade', objParam).pipe(
                    map(resp => {
                        
                        let restResp;
                        restResp = resp;
                        
                        if(restResp.Dados)
                        {
                            //console.log(restResp.Dados);
                            resultado.mensalidades = restResp.Dados;
                        }

                        return resultado;
                    }
                ));
            })
        );
    }

}
