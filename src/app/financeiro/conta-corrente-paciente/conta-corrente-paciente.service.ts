
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Http, Response, Jsonp, URLSearchParams, ResponseOptions} from '@angular/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from '../../app.varsprod';

@Injectable()
export class ContaCorrentePacienteService {

  URLBASE                   : any;
  URLIndex                  : any;
  RESGetFinacPaciente       : any;


  constructor(private http:HttpClient, private varsProd:VarsProd ) {
    //this.GetAllTratamentos();
    // this.URLBASE = "http://localhost:8000";
    this.URLBASE = this.varsProd.Api;
    this.URLIndex = this.varsProd.VarUrlId;
  }


    GetFinacPaciente(obj){
        // console.log('GetFinacPaciente');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetFinacPaciente',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    this.RESGetFinacPaciente = response;
                    let rest; rest = response;
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    GetBonusPaciente(id){
        // console.log('GetBonusPaciente');
        // console.log(id);
        return this.http.get(this.URLBASE + '/api/GetBonusPaciente/'+id).pipe(
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

    /*** ROTA AGENDA */
    GetTratamentDesconto(id){
        return this.http.get(this.URLBASE + '/api/GetTratamentDesconto/'+id).pipe(
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



    
    BonusDescontoOrt(obj){
        // console.log('BonusDescontoOrt');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/BonusDescontoOrt',obj).pipe(
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


    BaixarParcela(obj){
        // console.log('BaixaParcela');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/BaixarParcela',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    ConfirmaParcelaPG(obj){
        // console.log('BaixaParcela');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/ConfirmaParcelaPG',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    DellParcelaPacT(obj){
        // console.log('BaixaParcela');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/DellParcelaPacT',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    AlterParcelaCCP(obj){
        // console.log('BaixaParcela');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/AlterParcelaCCP',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    CancelBaixa(obj){
        // console.log('CancelBaixa');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/CancelBaixa',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    ValorNaEfetiv(obj){
        // console.log('CancelBaixa');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/ValorNaEfetiv',obj).pipe(
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

    RenegociaPacelas(obj){
        // console.log('CancelBaixa');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/RenegociaPacelas',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }

    
    GetValTratam(obj){
        // console.log('CancelBaixa');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/GetValTratam',obj).pipe(
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

    
    RenegociaUmaPacela(obj){
        // console.log('CancelBaixa');
        //console.log(id);
        return this.http.post(this.URLBASE + '/api/RenegociaUmaPacela',obj).pipe(
        map(
                response => {
                    // console.log(response);
                    let rest; rest = response;
                    if(rest.error){
                        alert(rest.MSG);
                    }
                    return rest.dados;
                },
                error => {
                    return error;
                }
        ));
    }


    TipoPagTratamento (){
        return [
            {
                'value':'A',
                'nome' : 'Todas'
            },
            {
                'value':'N',
                'nome' : 'Débitos'
            },
            {
                'value':'S',
                'nome' : 'Pagas'
            }
        ];

    }


    

    


    

    


}
