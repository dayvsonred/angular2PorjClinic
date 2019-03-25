import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';


@Injectable()
export class VarsProd {
      
      private Inprod = false;

      
      
      //private  VarLocalIndex:   string  = 'http://192.168.0.29/WebDental_System_IEB'; // 'http://localhost:2020'; //'http://192.168.0.29/WebDental_System_IEB';
      //private  VarApiLocal:     string  = 'http://api.webdental.hmg'; //'http://localhost:8000';//'http://192.168.0.29:8000';
      private  VarLocalIndex:   string  = 'http://localhost/ieb_git/webdental_ieb';
      private  VarApiLocal:     string  = 'http://localhost:8000';


      /*** Vars Solucoes  */
      // private  VarApiProd:     string  = 'http://api.webdentalsolucoes.com.br';
      // private  VarProdIndex:   string  = 'http://sistema.webdentalsolucoes.com.br';
      // private  VarApiLocal:    string  = 'http://api.webdentalsolucoes.com.br'; 


      /*** Vars IEB */
      private  VarApiProd:        string  = 'http://laravel.webdental.com.br';
      private  VarProdIndex:      string  = 'http://sistema.webdental.com.br';
      // private  VarApiLocal:       string = 'http://laravel.webdental.com.br';



      



      private  VarApi:        string; // = Inprod == false ? VarApiLocal : VarApiProd;
      private  VarURLIndex:   string;
      private  VarApiDentalvidas: string;
      private  VarNomeEmpresa: string = "IEB";


      public get ApiLocal():string {
        return this.VarApiLocal;
      }

      public get ApiProd():string {
        return this.VarApiProd;
      }

      public get Api():string {
        return this.VarApi;
      }

      public get ApiDental():string {
        return this.VarApiDentalvidas;
      }

      public get NomeEmpresa():string {
        return this.VarNomeEmpresa;
      }

      public get VarUrlId():string {
        return this.VarURLIndex;
      }

      constructor(){
        this.VarApi          = environment.production ? this.VarApiProd : this.VarApiLocal;
        this.VarURLIndex     = environment.production ? this.VarProdIndex : this.VarLocalIndex;
        this.VarApiDentalvidas = environment.production ? "http://apiwebvidas.webdentalsolucoes.com.br" : "http://127.0.0.1:8001"; //"apiwebvidas.webdentalsolucoes.hmg";
      }


}; 

 export const GlobalVariable = Object.freeze({
     BASE_API_URL: 'http://example.com/',
     //... more of your variables
 });

//export const VarsProd;
