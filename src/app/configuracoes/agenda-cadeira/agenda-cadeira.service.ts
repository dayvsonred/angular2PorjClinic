
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class AgendaConfigCadeiraService {

    todostratamentos = [];
    RESNumCadCli                : any;
    RESCCCContasEssenciais      : any;
    RESFormCaixaAnt             : any;
    RESGetUnidadeDados          : any;
    URLBASE                     : any;
    URLIndex                    : any;
    RESDrDaUnidade              : any;
    RESAddAgDrUnidade           : any;
    MSGERRO                     : any;
    ALTERARAGENDA               : any;
    RESReMoveDulpCad            : any;

  


  constructor(private http:HttpClient, private varsProd:VarsProd ) {
      this.URLBASE = this.varsProd.Api;
      this.URLIndex = this.varsProd.VarUrlId;
  }

//   extractData(res: Response){
//     return res.json();
//   }

    NumCadCli(dados){
        // console.log("NumCadCli");
        return this.http.post(this.URLBASE + '/api/NumCadCli/'+dados,null).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = this.RESNumCadCli = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    ClinConfig(dados){
        // console.log("ClinConfig");
        return this.http.post(this.URLBASE + '/api/ClinConfig/'+dados,null).pipe(
        map(
                response => {
                    // console.log(response);
                    //this.RESNumCadCli = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    AgCadeirasDentiSemana(dados){
        // console.log("AgCadeirasDentiSemana");
        return this.http.post(this.URLBASE + '/api/AgCadeirasDentiSemana',dados).pipe(
        map(
                response => {
                    // console.log("AgCadeirasDentiSemana88888888888888888888888888888888888");
                    // console.log(response);
                    //this.RESNumCadCli = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    DrDaUnidade(dados){
        // console.log("DrDaUnidade");
        return this.http.post(this.URLBASE + '/api/DrDaUnidade/'+dados,null).pipe(
        map(
                response => {
                    //  console.log("DrDaUnidade");
                    // console.log(response);
                    this.RESDrDaUnidade = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    AddAgDrUnidade(dados){
        // console.log("AddAgDrUnidade");
        return this.http.post(this.URLBASE + '/api/AddAgDrUnidade',dados).pipe(
        map(
                response => {
                    // console.log("AddAgDrUnidade");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }


    
    DellAgDrUnidade(dados){
        // console.log("DellAgDrUnidade");
        return this.http.post(this.URLBASE + '/api/DellAgDrUnidade',dados).pipe(
        map(
                response => {
                    // console.log("AddAgDrUnidade");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }


    DellBloqUnidade(dados){
        // console.log("DellBloqUnidade");
        return this.http.post(this.URLBASE + '/api/DellBloqUnidade',dados).pipe(
        map(
                response => {
                    // console.log("DellBloqUnidade");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    AlterBloqUnidade(dados){
        // console.log("AlterBloqUnidade");
        return this.http.post(this.URLBASE + '/api/AlterBloqUnidade',dados).pipe(
        map(
                response => {
                    // console.log("AlterBloqUnidade");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }


    DellAgDrUnidadeHoje(dados){
        // console.log("DellAgDrUnidadeHoje");
        return this.http.post(this.URLBASE + '/api/DellAgDrUnidadeHoje',dados).pipe(
        map(
                response => {
                    // console.log("DellAgDrUnidadeHoje");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }

    DellAgDrUnidadeAteHoje(dados){
        // console.log("DellAgDrUnidadeAteHoje");
        return this.http.post(this.URLBASE + '/api/DellAgDrUnidadeAteHoje',dados).pipe(
        map(
                response => {
                    // console.log("DellAgDrUnidadeAteHoje");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }

    DrAgMarcada(dados){
        // console.log("DrAgMarcada");
        return this.http.post(this.URLBASE + '/api/DrAgMarcada',dados).pipe(
        map(
                response => {
                    // console.log("DrAgMarcada retorno");
                    // console.log(response);
                    this.ALTERARAGENDA = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }

    

    

    AlterAgDrUnidade(dados){
        // console.log("AlterAgDrUnidade");
        return this.http.post(this.URLBASE + '/api/AlterAgDrUnidade',dados).pipe(
        map(
                response => {
                    // console.log("AlterAgDrUnidade");
                    // console.log(response);
                    // this.RESAddAgDrUnidade = response;
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }



    
    ReMoveDulpCad(dados){
        // console.log("DrAgMarcada");
        return this.http.post(this.URLBASE + '/api/ReMoveDulpCad',dados).pipe(
        map(
                response => {
                    // console.log("DrAgMarcada retorno");
                    this.RESReMoveDulpCad= response;
                    // console.log(response);
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }

    
    AlterDrCadHoje(dados){
        // console.log("DrAgMarcada");
        return this.http.post(this.URLBASE + '/api/AlterDrCadHoje',dados).pipe(
        map(
                response => {
                    // console.log("DrAgMarcada retorno");
                    // console.log(response);
                    let rest; rest = response;
                    return rest;
                },
                error => {
                    return error;
                }
        ));
    }


    SelectTipoAgDr(){
        return [
            {
                'value': 0,
                'nome' : 'Prestador'
            },
            {
                'value': 1,
                'nome' : 'Bloqueio'
            }
        ];

    }

    SelectPuloAgDr(){
        return [
            {
                'value': 0,
                'nome' : 'Não Pular'
            },
            {
                'value': 1,
                'nome' : '1 Semana'
            }
        ];

    }




}
