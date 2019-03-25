
import {map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class ContaCorrenteClinicaService {

  todostratamentos = [];
  RESGetRelFinanceiroClinc  : any;
  RESCCCContasEssenciais    : any;
  RESFormCaixaAnt           : any;
  RESGetUnidadeDados        : any;
  RESPlanoContaCred         : any;
  RESPlanoContaDebt         : any;
  RESFormaPagamentoC        : any;
  RESFormaPagamentoD        : any;
  URLBASE                   : any;
  URLIndex                  : any;
  RESGetSelcUnidadeB        : any;
  RESGetSelcUnidadesFraq    : any;     
  

    constructor(private http:HttpClient, private varsProd:VarsProd ) {
        //this.GetAllTratamentos();
        // this.URLBASE = "http://localhost:8000";
        this.URLBASE = this.varsProd.Api;
        this.URLIndex = this.varsProd.VarUrlId;
    }

    INI(){
        
        /** DELETO */
        delete this.RESGetRelFinanceiroClinc  ;
        delete this.RESCCCContasEssenciais    ;
        delete this.RESFormCaixaAnt           ;
        delete this.RESGetUnidadeDados        ;
        delete this.RESPlanoContaCred         ;
        delete this.RESPlanoContaDebt         ;
        delete this.RESFormaPagamentoC        ;
        delete this.RESFormaPagamentoD        ;
        delete this.RESGetSelcUnidadesFraq    ;   

        /** RECRIO */
        // this.RESGetRelFinanceiroClinc  = {};
        // this.RESCCCContasEssenciais    = {};
        // this.RESFormCaixaAnt           = {};
        // this.RESGetUnidadeDados        = {};
        // this.RESPlanoContaCred         = {};
        // this.RESPlanoContaDebt         = {};
        // this.RESFormaPagamentoC        = {};
        // this.RESFormaPagamentoD        = {};
        // this.RESGetSelcUnidadeB        = {};
        // this.RESGetSelcUnidadesFraq    = {};     
    }

    // extractData(res: Response){
    //   return res.json();
    // }

    DadosFinanceiroClinc (dados){
        return this.http.post(this.URLBASE + '/api/DadosFinanceiroClinc',dados).pipe(
        map(
                response => {
                    //console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    GetAllTratamentos (){
        //return this.http.get('http://localhost:8000/api/GetSelcTratamento').map(this.extractData);
        return this.http.post(this.URLBASE + '/api/TiposTratamento',null).pipe(
        map(
                response => {
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }
  
    GetRelFinanceiroClinc (dados){
        //return this.http.get('http://localhost:8000/api/GetSelcTratamento').map(this.extractData);
        return this.http.post(this.URLBASE + '/api/GetRelFinanceiroClinc',dados).pipe(
        map(
                response => {
                    //  console.log('RETORNO FINANCEIRO');
                     //console.log(response);
                    this.RESGetRelFinanceiroClinc = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    GetFormaPagamentoD(){
        return this.http.post(this.URLBASE + '/api/FormaPagamentoD',null).pipe(
        map(
                response => {
                    //console.log('GetFormaPagamentoD');
                    //console.log(response);
                    this.RESFormaPagamentoD = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    FormaPagamentoC(){
        return this.http.post(this.URLBASE + '/api/FormaPagamentoC',null).pipe(
        map(
                response => {
                    //console.log('GetFormaPagamentoD');
                    //console.log(response);
                    this.RESFormaPagamentoC = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    FormaPagamentoALL(){
        return this.http.post(this.URLBASE + '/api/FormaPagamentoALL',null).pipe(
        map(
                response => {
                    //console.log('GetFormaPagamentoD');
                    //console.log(response);
                    //this.RESGetFormaPagamentoD = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    PlanoContasAll(obj){
        return this.http.post(this.URLBASE + '/api/PlanoContasAll',obj).pipe(
        map(
                response => {
                    //console.log('PlanoContasAll');
                    //console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    PlanoContaDebt(obj){
        return this.http.post(this.URLBASE + '/api/PlanoContaDebt',obj).pipe(
        map(
                response => {
                    //console.log('PlanoContaDebt');
                    this.RESPlanoContaDebt = response;
                    //console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    PlanoContaCred(obj){
        return this.http.post(this.URLBASE + '/api/PlanoContaCred',obj).pipe(
        map(
                response => {
                    //console.log('PlanoContaCred');
                    this.RESPlanoContaCred = response;
                    console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    AlterarDebitoCredito(obj){
        //console.log('AlterarDebitoCredito');
        return this.http.post(this.URLBASE + '/api/CCCaterarDebitoCredito',obj).pipe(
        map(
                response => {
                    // console.log('AlterarDebitoCredito');
                    // console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));

    }

    GetBandeirasCartao(id){
        //console.log('GetBandeirasCartao');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetBandeirasCartao/'+id,null).pipe(
        map(
                response => {
                    //console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    CCCNovoDebito(obj){
        // console.log('CCCNovoDebito');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/CCCNovoDebito',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    CCCNovoCredito(obj){
        //console.log('CCCNovoCredito');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/CCCNovoCredito',obj).pipe(
        map(
                response => {
                    //console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    CCCDellCreditoDebito(obj){
        //console.log('CCCDellCreditoDebito');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/CCCDellCreditoDebito',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    CCCContasEssenciais(obj){
        //console.log('CCCContasEssenciais');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/CCCContasEssenciais',obj).pipe(
        map(
                response => {
                    //console.log(response);
                    this.RESCCCContasEssenciais = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }
  
    FormLancamentoCaixaAnt(obj){
        // console.log('formLancamentoCaixaAnt');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/FormLancamentoCaixaAnt',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    this.RESFormCaixaAnt = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }


    LancamentoCaixaAnt(obj){
        // console.log('formLancamentoCaixaAnt');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/LancamentoCaixaAnt',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    ShowCaixaAnt(obj){
        //  console.log('ShowCaixaAnt');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/ShowCaixaAnt',obj).pipe(
        map(
                response => {
                    //  console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    CCCDellCaixaAnt(obj){
        // console.log('CCCDellCaixaAnt');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/CCCDellCaixaAnt',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    return rest.error;
                },
                error => {
                    return error;
                }
        ));
    }

        /*** ROTA AgendaController  */
    PaCheqForString(obj){
        //console.log('PaCheqForString');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/PaCheqForString',obj).pipe(
        map(
                response => {
                    //console.log(response);
                    let rest; rest = response;
                    return rest.dados;

                },
                error => {
                    return error;
                }
        ));
    }

    GetUnidadeDados(obj){
        // console.log('GetUnidadeDados');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetUnidadeDados',obj).pipe(
        map(
                response => {
                    // console.log(' RESSSSSSSSSSSSSSSSSSSSSSSSSSSS GetUnidadeDados');
                    // console.log(response);
                    this.RESGetUnidadeDados = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

  
    FincPaParcById(obj){
        //console.log('FincPaParcById');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/FincPaParcById',obj).pipe(
        map(
                response => {
                    //console.log(' RESSSSSSSSSSSSSSSSSSSSSSSSSSSS GetUnidadeDados');
                    //console.log(response);
                    //this.RESGetUnidadeDados = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    FincCheqById(obj){
        // console.log('FincCheqById');
        return this.http.post(this.URLBASE + '/api/FincCheqById',obj).pipe(
        map(
                response => {
                    // console.log('RESSSSSSSSSSSSSSSSSSSSSSSSSSSS FincCheqById');
                    // console.log(response);
                    //this.RESGetUnidadeDados = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    GetBancosList(){
        //console.log('GetBancosList');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetBancosList',null).pipe(
        map(
                response => {
                    //console.log(' RESSSSSSSSSSSSSSSSSSSSSSSSSSSS GetUnidadeDados');
                    //console.log(response);
                    //this.RESGetUnidadeDados = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    /*** AGENDA CONTROLE */
    GetSelcUnidadeB(obj){
        //console.log('GetSelcUnidade');
        // console.log(this.RESGetSelcUnidadeB);
        return this.http.post(this.URLBASE + '/api/GetSelcUnidadeB',obj).pipe(
        map(
                response => {
                    // console.log(' ----------------------------- GetSelcUnidadeB');
                    // console.log(response);
                    this.RESGetSelcUnidadeB = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    /*** AGENDA CONTROLE */
    GetSelcUnidadesFraq(obj){
            // console.log('GetSelcUnidadesFraq');
            // console.log(this.RESGetGetSelcUnidadesFraq);
            return this.http.post(this.URLBASE + '/api/GetSelcUnidadesFraq',obj).pipe(
            map(
                    response => {
                        // console.log(' ----------------------------- GetSelcUnidadesFraq');
                        // console.log(response);
                        this.RESGetSelcUnidadesFraq = response;
                        let rest; rest = response;
                        return rest.dados;
                    },
                    error => {
                        return error;
                    }
            ));
    }

    GetAllVisualizacoes (){
        return [
            {
                'value':'0',
                'nome' : 'Todos'
            },
            {
                'value':'0',
                'nome' : 'Apenas Lançamentos Tributáveis'
            },
            {
                'value':'C',
                'nome' : 'Apenas Créditos'
            },
            {
                'value':'D',
                'nome' : 'Apenas Débitos'
            },
        ];

    }

    GetCatcoriClinic (){
        return [
            {
                'value':'D',
                'nome' : 'DB Clínica'
            },
            {
                'value':'C',
                'nome' : 'CR Clínica'
            }
        ];

    }



}
