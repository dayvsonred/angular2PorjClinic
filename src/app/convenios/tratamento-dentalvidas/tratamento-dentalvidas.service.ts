
import {map, mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
//import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
  
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class TratamentoDentalvidasService {

	URLBASE                   : any;
  	URLIndex                  : any;
  	APIDENTAL				  : any;

  	constructor(private http:HttpClient, private varsProd:VarsProd ) {
        // this.URLBASE = "http://localhost:8000";
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
        this.APIDENTAL = this.varsProd.ApiDental;
    }

    GetTratamentosEnviarDentalvidas(obj){
        return this.http.post(this.URLBASE + '/api/GetTratamentosEnviarDentalvidas', obj).pipe(
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
            
            if(resultado.dados)
            {
                let arrayChavePacDV = this.GetArrayChavePacDentalvidasUnico(resultado.dados);
                let objPacientes = {
                    listaIDs: arrayChavePacDV,
                    baseDados: obj.baseDados
                };
                //console.log(arrayChavePacDV);

                return this.GetOperadoraPacientes(objPacientes).pipe(
                    map(resp => {
                        let restResp;
                        restResp = resp;
                        if(restResp.Dados)
                        {
                            //console.log(restResp.Dados);
                            resultado.dados.forEach((item) => {
                                item.chave_unid_ope = "";

                                let temp = restResp.Dados.filter(x => x.id_paciente == item.cd_paciente_webvidas)[0];
                                
                                if(temp)
                                {
                                    item.chave_unid_ope = temp.chave_unid_ope;
                                }
                            });
                        }
                        return resultado;
                    }
                ));
            }
        }),);
    }

    GetOperadoraPacientes(obj){
        return this.http.post(this.APIDENTAL + '/api/getOperadoraPacientes', obj).pipe(
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
    };

    RegistrarEnvioTratamentos(obj){
        return this.http.post(this.URLBASE + '/api/RegistrarEnvioTratamentos', obj).pipe(
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

    GetArrayChavePacDentalvidasUnico(arrayOrigem)
    {
        return Array.from(new Set(arrayOrigem.map((item: any) => item.cd_paciente_webvidas)));
    }

}
