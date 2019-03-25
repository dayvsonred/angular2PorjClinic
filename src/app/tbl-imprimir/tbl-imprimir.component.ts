
import {interval as observableInterval} from 'rxjs';

import {map, take} from 'rxjs/operators';
import { Component, OnInit, TemplateRef  } from '@angular/core';
// import { ContaCorrenteClinicaService } from '../conta-corrente-clinica/conta-corrente-clinica.service';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

// import { IMyDpOptions } from 'mydatepicker';
import { AuthService } from '../auth/auth.service';
// import { CreditoService } from '../credito/credito.service';
// import { ContaCorrentePacienteService } from './conta-corrente-paciente.service';
// import { Alert } from '../../../../node_modules/@types/selenium-webdriver';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import { TblImprimirService } from './tbl-imprimir.service';


@Component({
  selector: 'app-tbl-imprimir',
  templateUrl: './tbl-imprimir.component.html',
  styleUrls: ['./tbl-imprimir.component.css']
})
export class TblImprimirComponent implements OnInit {

  /** Dias nomes */
  DiasSemana = [null, 'Dom', 'Seg','Ter','Qua','Qui','Sex','Sab'];
  DiasSemanaComplt = [null, 'Domingo', 'Segunda','Terça','Quarta','Quinta','Sexta','Sabado'];
  //** default locale for example br  IMyDpOptions mydatepicker */
  locale: string = 'pt-br';
  /*** select 2 */
    multiple0 : boolean = false;
    multiple1 : boolean = true;
    options0  : Array<any> = [];
    selection : Array<string>;
    UnidadeNome               : any;
    startDate                 : any;
    startDateDia              : any;
    startDateMes              : any;
    startDateAno              : any;
    DataHojeini               : any;
    DataHojeFim               : any;
    UnidadeDados              : any;
    contasTipo                : any;
    PacienteSelec             : any;
    ObjSelec                  : any;
    ListUnidade               : any;
    ListPacientes             : any;
    Process                   : boolean = false;
    caregandoFinc             : boolean = false;
    accordionOpen             : boolean = true;
    bxOpen                    : boolean = false;
    bxOpenShow                : boolean = false;  
    PrintShow                 : boolean = false;
    BTVoltar                  : boolean = false;
    BTCancelAg                : boolean = false;
    
    AcDellDr                  :any;
    listaImprimir             :any;
    listaImprimirDados        :any;
    listaImprimirTotais       :any;
    Titulo                    :any;
    DataPg                    :any;
    Unidade                   :any;
    PGVoltar                   :any;

    SelectClinicaDados  = {
      'chave'                  : ' ', 
      'unidade'                : ' ',  //mudae id nome obj para unidade - melhorar intendimento
      'nm_unidade_atendimento' : ' ', 
      'cd_unidade_atendimento' : ' ',
      'USERID'                 : ' ', // - ID solucoes ADM
      'PGnome'                 : 'Conta Corrente Clínica', // nome PG
      'BaseIndex'              : null,
      'DataHoje'               : null,
      'DataHojeFormat'         : '',
      'Val1'                   : null,
      'rotaAcao'               : 'ag2',
      'chaveUsuario'           : null,
      'cd_filial'              : null,
    }; 

  constructor(private router: Router,
    private authService: AuthService, 
    private modalService: BsModalService, 
    private tblImprimirService: TblImprimirService    ) {

    console.log("version 3.20180711");
    //console.log(authService.RESUserValid );
    this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
    this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
    this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
    this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
    this.SelectClinicaDados.chaveUsuario = this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
    this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
    // this.SelectClinicaDados.BaseIndex = this.contaCorrenteClinicaService.URLIndex;
    this.SelectClinicaDados.Val1 = authService.RESVal1;

     //DATA ATUAL
     this.startDate = new Date;
     this.startDateDia = this.startDate.getDate() < 10 ? '0' + this.startDate.getDate() : this.startDate.getDate();
     this.startDateMes = (parseInt(this.startDate.getMonth())+1) < 10 ? '0' + (parseInt(this.startDate.getMonth())+1)  : (parseInt(this.startDate.getMonth())+1);
     this.startDateAno = this.startDate.getFullYear();
     //console.log("Hoje é " + this.startDate.getDay() + ", " + this.startDate.getDate() + " de " + (parseInt(this.startDate.getMonth()) + 1) + " de " + this.startDate.getFullYear() );
     this.SelectClinicaDados.DataHoje =  this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia; // data hoje   
     this.SelectClinicaDados.DataHojeFormat =  this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno; // data hoje    
     
     this.DataHojeini = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
     this.DataHojeFim = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;

     observableInterval(3000).pipe(
          take(10),map((x) => x+1),)
          .subscribe((x) => {
            this.print();
          });

  }

  ngOnInit() {
    // console.log("iniciando imprimri ");
    this.BTVoltar = false;  this.BTCancelAg = false;
    let config = JSON.parse(sessionStorage.getItem('ImprimirPgConfig'));
    let dados = JSON.parse(sessionStorage.getItem('imprimirDados'));
    let dadosTotais = JSON.parse(sessionStorage.getItem('imprimirDadosTotais'));
    this.PGVoltar = JSON.parse(sessionStorage.getItem('PgVoltar'));
    this.AcDellDr = JSON.parse(sessionStorage.getItem('imprimirAcDellDr'));

    
    
    // console.log(dados);
    // console.log("tamanho");
    // console.log(dados.length);
    // console.log(this.PGVoltar);
    // console.log(this.AcDellDr);

    this.Titulo  =  config.Titulo;
    this.DataPg  =  config.DataPg;
    this.Unidade =  config.Unidade;

    if(this.PGVoltar){
      this.BTVoltar = true;
    }

    if(this.AcDellDr){
        this.BTCancelAg = true;
    }

    this.listaImprimir = dados;
    this.listaImprimirTotais = dadosTotais;
    // this.listaImprimirDados = dados;

    // console.log(this.listaImprimir);
    // console.log(this.listaImprimirDados);

    //  this.print();
    
  }

  Voltar(){
    // console.log(this.PGVoltar);
    this.router.navigate(['/'+this.PGVoltar.url]);
  }

  CancelAg(){

      

      let dados = {
        'USERID'                  : this.SelectClinicaDados.USERID,
        'PGnome'                  : 'Cadeiras',
        'PGTela'                  : 'Configurações',
        'acaoBD'                  : 'e',
        'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
        'AgCancel'                : this.AcDellDr.AgCancel,
        'cadDrDell'               : this.AcDellDr.cadDrDell,
      };
      console.log(dados);


      this.tblImprimirService.CancelAgDellDr(dados).subscribe(data => {
          console.log("retorno CancelAgDellDr"); console.log(data);

          if(data.error){
            this.BTCancelAg = false;
              alert("Agendametos Cancelados, Cadeira Removida.");
          }
          
      });


  }


  FunTypeof(v){
    // console.log(v, typeof v );
    // console.log(v.length, v.toString().indexOf('.'), (v.length-v.toString().indexOf('.') )    );
    // console.log(this.isFloat(v) );
    if(typeof v == "number"){
      // console.log(1 );
      return true;
    }
    // console.log(2 );
    return false;
  }

  isFloat(n) {
    if(n == null || n == '' || typeof n === 'undefined'){
      return false;
    }

    if(parseFloat(n)==0){
      // console.log("true");
      return true;
    }
    // console.log(parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0);
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
  }

  public print = (): void => {
    
      if(this.PrintShow == false){
        this.PrintShow = true;
        window.print();
      }
    
  }

  public printa = (): void => {
      
    // setTimeout(this.print(), 6000);

    let dataAgora = new Date();
    let dataAgoraMais  =   dataAgora.setSeconds( dataAgora.getSeconds() + 10);
    let dataais = dataAgoraMais.toString().substr(0,2);
    // console.log('num',parseFloat(dataais),'segund', dataAgora.getSeconds(), ( dataAgora.getSeconds() + 10) );
    let numMinut = 1;


    let num10  = dataAgora.getSeconds() ;
    let numStr = num10.toString().substr(0,2);
    let numInt = parseFloat(numStr);

    console.log('ini',numInt);
    let arryNum = []; arryNum.push(numInt);
    for (let index = 0; index < 9999 ; index++) {
     
      
      dataAgora = new Date();
      num10  = dataAgora.getSeconds();
      numStr = num10.toString().substr(0,2);
      numInt = parseFloat(numStr);


      
      // console.log(arryNum.indexOf(numInt));
      if(arryNum.indexOf(numInt) < 0){
            arryNum.push(numInt);
      }

      if(arryNum.length > 3 ){
          console.log("entrou");
          window.print();
          index = 999999999;
          // break;
      }


      if(index > 9999){
        break;
      }

    }


    
    
  }

}
