import {throwError as observableThrowError,  Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { VarsProd } from './app.varsprod';


@Injectable()
export class AllService {

    URLBASE                     : any;
    URLIndex                    : any;

  // contactsChanged = new EventEmitter<Observable<Contact[]>>();

  private url: string = 'app/';

  constructor(private http:HttpClient, private varsProd:VarsProd) {
    this.URLBASE = this.varsProd.Api;
    this.URLIndex = this.varsProd.VarUrlId;
  }

  
  /*if(R == 'FinacPrestPNLPROD'   ){ console.log(rr); } */
  GetUrl(dados,R){
    return this.http.post(this.URLBASE + '/api/'+R+'/'+dados,null).pipe(
    map( r => { let rr; rr=r;    return rr.dados; }, e => { return e; } ),
    // catchError(err => { this.of(err); } ),);
    catchError(this.handleError),);
  }

  PostUrl(obj,R){ 
    return this.http.post(this.URLBASE + '/api/'+R,obj).pipe(
    map( r => { let rr; rr=r;    return rr.dados; }, e => { return e; } ),
    catchError(this.handleError),);
  }
  
  PostUrlAll(obj,R){
    return this.http.post(this.URLBASE + '/api/'+R,obj).pipe(
    map( r => { let rr; rr=r;   return rr; }, e => { return e; } ),
    catchError(this.handleError),);
  }


  DatMysqForDatBr(data){
    // console.log("DatMysqForDatBr");
    // console.log(data);
      //let dataOk  = subs
      let arr = data.split("-").reverse();
      // console.log(arr);
      return  arr[0] +"/"+ arr[1] +"/"+ arr[2];
      // let teste = new Date(arr[0], arr[1] - 1, arr[2]);
      //console.log(teste);
      // this.MD.vencimentoMsql = arr[0] +"-"+ arr[1] +"-"+ arr[2];
      // this.MD.diaNome  = this.DiasSemana[teste.getDay()+1];



  };
  

  AlertError(msg){
    // console.log('AlertError');
    alert(msg);

 
  }



  // getAll(): Observable<Contact[]> {
  //   return this.http.get(this.url)
  //     .map(res => res.json().data)
  //     .catch(this.handleError);
  // }

  // get(id){
  //   return this.getAll()
  //     .map((list: any) => list.find(contact => contact.id == id))
  //     .catch(this.handleError);
  // }

  // add(record){
  //   return this.http.post(this.url, JSON.stringify(record),
  //       {headers: this.getHeaders()})
  //     .map(res => res.json().data)
  //     .do(data => this.contactsChanged.emit(this.getAll()))
  //     .catch(this.handleError);
  // }

  // update(record){
  //   return this.http.put(this.getUrl(record.id), JSON.stringify(record), {headers: this.getHeaders()})
  //     .map(res => res.json().data)
  //     .catch(this.handleError);
  // }

  // remove(id){
  //   return this.http.delete(this.getUrl(id), {headers: this.getHeaders()})
  //     .map(res => res.json())
  //     .do(data => this.contactsChanged.emit(this.getAll()))
  //     .catch(this.handleError);
  // }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    let erro = error.message || 'Server error';
    console.error('Ocorreu um erro', error);
    return observableThrowError(erro);
  }

  private getUrl(id){
    return `${this.url}/${id}`;
  }






}
