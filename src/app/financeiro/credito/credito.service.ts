
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class CreditoService {

  URLBASE                   : any;
  URLIndex                  : any;
  BonusAtual                : any;
  RESDethCredBonusPac       : any;
  RESGetDTHLBonusValor         : any;
  RESDellBonusDebito           : any;
  RESAltBonusFormPag           : any;
  RESIsertBonusCredit          : any;
  RESBonusDevolucao            : any;
  
  constructor(private http:HttpClient, private varsProd:VarsProd ) {
    //this.GetAllTratamentos();
    // this.URLBASE = "http://localhost:8000";
    this.URLBASE = this.varsProd.Api;
    this.URLIndex = this.varsProd.VarUrlId;
  }


  

    /*** ROTA AgendaController  */
    GetListPaciente(obj){
        //console.log('PaCheqForString');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetListPacienteForString',obj).pipe(
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


    GetCreditoBonusPac(obj){
        // console.log('GetCreditoBonusPac');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetCreditoBonusPac',obj).pipe(
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

    
    DethCredBonusPac(obj){
        // console.log('DethCredBonusPac');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/DethCredBonusPac',obj).pipe(
        map(
                response => {
                    //  console.log(response);
                     this.RESDethCredBonusPac = response;
                     let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    BonusCreditAtual(obj){
        // console.log('BonusCreditAtual');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/BonusCreditAtual',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    this.BonusAtual = rest.dados;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    IsertBonusCredit(obj){
        // console.log('IsertBonusCredit----------------------------------------------------');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/IsertBonusCredit',obj).pipe(
        map(
                response => {
                    //  console.log(response);
                    this.RESIsertBonusCredit = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    IsertBonusDebito(obj){
        // console.log('IsertBonusDebito');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/IsertBonusDebito',obj).pipe(
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

    
    GetSelcTratamento(obj){
        // console.log('GetSelcTratamento');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetSelcTratamento',obj).pipe(
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

    AlteraBonusDebito(obj){
        // console.log('AlteraBonusDebito');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/AlteraBonusDebito',obj).pipe(
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

    
    DellBonusDebito(obj){
        // console.log('DellBonusDebito');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/DellBonusDebito',obj).pipe(
        map(
                response => {
                    //  console.log(response);
                     this.RESDellBonusDebito = response;
                     let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    GetBandeirasCartao(obj){
        // console.log('GetBandeirasCartao');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetBandeirasCartao/'+obj.unidade ,obj).pipe(
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

    GetTiposPagamento(){
        // console.log('GetTiposPagamento');
        //console.log(id);
        return this.http.get(this.URLBASE + '/api/GetTiposPagamento' ).pipe(
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

    
    GetPlanoContBnus(){
        // console.log('GetPlanoContBnus');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetPlanoContBnus' ,null).pipe(
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

    
    GetDTHLBonusValor(obj){
        // console.log('GetDTHLBonusValor');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetDTHLBonusValor' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                     this.RESGetDTHLBonusValor = response;
                     let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }


    
    AlteraBonusValor(obj){
        //console.log('AlteraBonusValor');
        this.RESAltBonusFormPag = false;
        return this.http.post(this.URLBASE + '/api/AlteraBonusValor' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                    this.RESAltBonusFormPag = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    AlteraBonusPacADD(obj){
        //console.log('AlteraBonusParcela');
        this.RESAltBonusFormPag = false;
        return this.http.post(this.URLBASE + '/api/AlteraBonusPacADD' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                    this.RESAltBonusFormPag = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    AltBonusPacRemv(obj){
        //console.log('AltBonusPacRemv');
        this.RESAltBonusFormPag = false;
        return this.http.post(this.URLBASE + '/api/AltBonusPacRemv' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                    this.RESAltBonusFormPag = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    AltBonusPac(obj){
        //console.log('AltBonusPac');
        this.RESAltBonusFormPag = false;
        return this.http.post(this.URLBASE + '/api/AltBonusPac' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                    this.RESAltBonusFormPag = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }


    AltBonusFormPag(obj){
        //console.log('AltBonusPac');
        this.RESAltBonusFormPag = false;
        return this.http.post(this.URLBASE + '/api/AltBonusFormPag' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                     this.RESAltBonusFormPag = response;
                     let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    AltCartBandNum(obj){
        // console.log('AltBonusPac');
        this.RESAltBonusFormPag = false;
        return this.http.post(this.URLBASE + '/api/AltCartBandNum' ,obj).pipe(
        map(
                response => {
                    this.RESAltBonusFormPag = response;
                    //  console.log(response);
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    GetTiposPagamentoS(){
        return this.http.post(this.URLBASE + '/api/GetTiposPagamentoS' ,null).pipe(
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

    
    BonusDevolucao(obj){
        return this.http.post(this.URLBASE + '/api/BonusDevolucao' ,obj).pipe(
        map(
                response => {
                    //  console.log(response);
                     this.RESBonusDevolucao = response;
                     let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    BonusTranferCredito(obj){
        return this.http.post(this.URLBASE + '/api/BonusTranferCredito' ,obj).pipe(
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

    
    GetPaciente(id){
        return this.http.post(this.URLBASE + '/api/GetPaciente/'+id ,null).pipe(
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

    GetPrestador(id){
        return this.http.post(this.URLBASE + '/api/GetPrestador/'+id ,null).pipe(
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
    
    RecalcularSaldoDisp(obj){
        return this.http.post(this.URLBASE + '/api/RecalcularSaldoDisp' ,obj).pipe(
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

    
    PrestadorIsAdm(obj){
        return this.http.post(this.URLBASE + '/api/PrestadorIsAdm' ,obj).pipe(
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

    
    





    
    

    

    ObjTipoParcela(){
        return [
            {
                'value': 'D',
                'nome' : 'Débito'
            },
            {
                'value': 'C',
                'nome' : 'Crédito'
            }
        ];

    }


   

    

    



    








}
