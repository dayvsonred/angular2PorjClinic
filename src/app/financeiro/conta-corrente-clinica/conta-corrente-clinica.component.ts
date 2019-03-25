// import { FinanceiroComponent } from './../financeiro.component';
// import { GlobalVariable } from './../../app.varsprod';
import { element } from 'protractor';
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ContaCorrenteClinicaService } from './conta-corrente-clinica.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';
//import {SelectModule} from 'ng2-select';
import { AllService } from '../../all.service';

import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
//import { DatePickerOptions, DateModel } from 'ng2-datepicker';
//import { ModalModule } from 'ngx-bootstrap/modal';
/*
import React from 'react';
import DatePicker from 'react-datepicker';
//import moment from 'moment';
import * as moment from 'moment'; 
import 'moment/locale/pt-br';
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
*/

import {IMyDpOptions} from 'mydatepicker';
import { AuthService } from '../../auth/auth.service';
//import { window } from 'rxjs/operator/window';

import { forEach } from '@angular/router/src/utils/collection';
// import { FormatCurrencyPipe } from '../.././pipes/format-currency.pipe';

@Component({
  selector: 'app-conta-corrente-clinica',
  templateUrl: './conta-corrente-clinica.component.html',
  styleUrls: ['./conta-corrente-clinica.component.css'],
  // pipes: [FormatCurrencyPipe],
})
export class ContaCorrenteClinicaComponent implements OnInit {

 ListplanoContas = [ {label: '...', value: 0, item1: '', item2: ''}, ];


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

  contasTipoS               : string[] = ["inicio"];
  contasTipo                : string[];
  SlVisualizacao            : any;
  startDate                 : any;
  startDateDia              : any;
  startDateMes              : any;
  startDateAno              : any;
  tipoConta                 : any;
  tipotratamento            : any;
  visualizar                : any;
  pesqString                : any;
  totalValorCredito         : any = 0.00;
  totalValorDebito          : any = 0.00;
  totalValorSaldo           : any = 0.00;
  totalMESValorSaldo        : any = 0.00;
  ValorCreditoMes           : any = 0.00;
  ValorParcelaMes           : any = 0.00;
  SaldoAnterior             : any = 0.00;
  ValorCreditoMesAteHoje    : any = 0;
  ValorParcelMesAteHoje     : any = 0;
  ValorSaldoHoje            : any = 0.00; 
  PosicaoCaixa              : any = 0.00;  
  totailGridCredito         : any = 0.00;
  totailGridDebito          : any = 0.00;
  ShowBtsMesAtual           : any = false;
  MD                        : any = {};
  ListFormaPagamentoD       : any = []; 
  ArrayFormaPag             : string[];
  FincTrselectedRow         : any;
  FincTrselectedRowObj      : any = {};
  ListCatcoriClinic         : any;
  ListBancoCheq             : [ {label: '...', value: 0} ];
  NumContasEssenciais       : any = 0;
  ListContsEssenciais       : any = 0; 
  ContaEsseTrSelectObj      : any;
  bTFiltarProssec           : boolean = false;
  divPrecessandoShow        : boolean = false;
  FormCaixaAntIPTs          : string[];
  FormSaldoAnt              : any = 0; 
  MDARRAY                   : string[];
  SaldoCaixaDifirenca       : any = 0; 
  bTCaixAntProssec          : boolean = false;
  UnidadeDados              : any;
  ListNomePacientes         : any;
  LisFincPacitGrid          : any;
  ListSelecFincPacit        : string[];
  gridFinancClinica         : any; // retono selecti grid finaceiro clinica
  ListFinancClinicaGrid     : any;
  contaTipo                 : any;
  ListUnidade               : any;
  ApiProd                   : any;
  DellProcess               : boolean = true;
  DellMD                    : any;
  UnidadeNome               : any;
  LancCaixaAnterioShow      : boolean = true;
  ListFormaAllPag           : any;
  ListFinancClinicaGridAll  : any;
  fpPagamento               : any;
  DataHojeini               : any;
  DataHojeFim               : any;
  ListUnidadesFraqueadora   : any;
  Faqueadoraelected         : any;
  FincselectedBonus         : boolean = false;
  Process                   : boolean = false;
  IsAdm                     : boolean = false;
  showDadosMes              : boolean = true;

  

    // SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
    //   'chave'                  : 'L00200020130130174652', 
    //   'unidade'                : 'L00200020130130174652',  //mudae id nome obj para unidade - melhorar intendimento
    //   'nm_unidade_atendimento' : 'Nossa Clinica - Americana', 
    //   'cd_unidade_atendimento' : '005',
    //   'USERID'                 : 'L00500020160620140212', // - ID solucoes ADM
    //   'PGnome'                 : 'Conta Corrente Clínica', // nome PG
    //  'BaseIndex'               : null,
    //   'DataHoje'               : null 
    // }; 


    /*** OUTRA CLINICA TESTA  */

    // SelectClinicaDados  = {
    //   'chave'                   : 'L00100020130319171357', 
    //   'unidade'                 : 'L00100020130319171357',  //mudae id nome obj para unidade - melhorar intendimento
    //   'nm_unidade_atendimento'  : '....', 
    //   'cd_unidade_atendimento'  : '013',
    //   'USERID'                  : 'L00500020160620140212', // - ID solucoes ADM
    //   'PGnome'                  : 'Conta Corrente Clínica', // nome PG
    //   'BaseIndex'               : null,
    //   'DataHoje'                : null 
    // }; 


    SelectClinicaDados  = {
      'chave'                  : ' ', 
      'unidade'                : ' ',  //mudae id nome obj para unidade - melhorar intendimento
      'nm_unidade_atendimento' : ' ', 
      'cd_unidade_atendimento' : ' ',
      'USERID'                 : ' ', // - ID solucoes ADM
      'PGnome'                 : 'Conta Corrente Clínica', // nome PG
      'BaseIndex'              : null,
      'DataHoje'               : null,
      'rotaAcao'               : 'ag2',
      'chaveUsuario'           : null,
      'cd_filial'              : null,
    }; 

    constructor(private router: Router,private authService: AuthService, private AllService : AllService, private contaCorrenteClinicaService : ContaCorrenteClinicaService,private modalService: BsModalService ) {
      //this.options = new DatePickerOptions();
      console.log("version 12.20180814");
      //console.log(authService.RESUserValid );
      this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
      this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
      this.SelectClinicaDados.chaveUsuario = this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
      this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
      this.SelectClinicaDados.BaseIndex = this.contaCorrenteClinicaService.URLIndex;
      //console.log(this.SelectClinicaDados);


      //let now = moment(); // add this 2 of 4
      //now.locale('pt-BR');
      //console.log('hello world', now.format()); // add this 3 of 4
      //console.log(moment.locale());
      //console.log( now.format('MMMM do YYYY, h;mm:ss a'));
      //console.log(now.add(7, 'days').format()); // add this 4of 4

      //DATA ATUAL
      this.startDate = new Date;
      this.startDateDia = this.startDate.getDate() < 10 ? '0' + this.startDate.getDate() : this.startDate.getDate();
      this.startDateMes = (parseInt(this.startDate.getMonth())+1) < 10 ? '0' + (parseInt(this.startDate.getMonth())+1)  : (parseInt(this.startDate.getMonth())+1);
      this.startDateAno = this.startDate.getFullYear();
      //console.log("Hoje é " + this.startDate.getDay() + ", " + this.startDate.getDate() + " de " + (parseInt(this.startDate.getMonth()) + 1) + " de " + this.startDate.getFullYear() );
      this.SelectClinicaDados.DataHoje =  this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia; // data hoje
      // console.log("hoje");
      // console.log( this.SelectClinicaDados.DataHoje );

      this.DataHojeini = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
      this.DataHojeFim = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
    }


    public myDatePickerOptions: IMyDpOptions = {
          // other options...
        todayBtnTxt     : 'Hoje',
        dateFormat      : 'dd/mm/yyyy',
        firstDayOfWeek  : 'su',
        sunHighlight    : true,
        inline          : false,
        
    };

    // Initialized to specific date (09.10.2018).
    public model: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public model1: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public modalVec: any;
    public modalRef: BsModalRef;
    
    public openModal(template: TemplateRef<any>, classT?:any ) {
      //this.modalRef = this.modalService.show(template);
        if (!classT){  classT =  'md-Full';  }

      this.modalRef = this.modalService.show(template, {class: classT});
      
    }
    
    public hiderModal(){
        // console.log("hiderModal");
        this.modalRef.hide();
    }


    ngOnInit(){
      //console.log("on init");   
      // console.log(this.SelectClinicaDados);

      this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;

      /**ZERO VALORES DOS GET do SERVICE ARA NAO DA ERRO DE USAR DAODS DE OUTRA CLINICA  */
      this.contaCorrenteClinicaService.INI();

      this.FincselectedBonus = false;
      this.showDadosMes = true;


      //this.contasTipo = this.contaCorrenteClinicaService.GetAllTratamentos().subscribe(res=>this.requests=res);
      this.contaCorrenteClinicaService.GetAllTratamentos().subscribe(contasTipo=>this.contasTipo=contasTipo );
      // console.log("on init");
      //console.log(this.contaCorrenteClinicaService.GetAllTratamentos().subscribe(contasTipo=>this.contasTipo=contasTipo ));
      // console.log("2222");
      //console.log(this.contaCorrenteClinicaService.GetAllTratamentos());
      // console.log(this.contasTipo);
      this.SlVisualizacao = this.contaCorrenteClinicaService.GetAllVisualizacoes();
      this.UnidadeDados = {};
      this.contaCorrenteClinicaService.GetUnidadeDados(this.SelectClinicaDados).subscribe(res=>this.UnidadeDados=res[0] );
      // console.log("unidade dados");
      //  console.log(this.UnidadeDados);

      // console.log(this.model);
      // console.log(this.model1);
      
      let dados = {
        'clinicaChave'  : this.SelectClinicaDados.chave,
        'clinicaNum'    : this.SelectClinicaDados.cd_unidade_atendimento,
        'dataHoje'      : this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia,
        'tratamento'    : this.tipotratamento,
        'visualizar'    : this.visualizar
      };

      this.contaCorrenteClinicaService.DadosFinanceiroClinc(this.SelectClinicaDados).subscribe(res=>this.gridFinancClinica=res );

      let dadosEss = {
        'USERID'                  : this.SelectClinicaDados.USERID,
        'PGnome'                  : this.SelectClinicaDados.PGnome, 
        'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
        'dataHoje'                : this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia,
        'dataINI'                 : this.model,
        'dataFIM'                 : this.model1
      };
      //console.log("contas ess");
      //console.log(dadosEss);
      this.contaCorrenteClinicaService.CCCContasEssenciais(dadosEss).subscribe(res=>this.NumContasEssenciais=res );

      this.contaCorrenteClinicaService.ShowCaixaAnt(this.SelectClinicaDados).subscribe(res=>this.LancCaixaAnterioShow=res );

      this.contaCorrenteClinicaService.FormaPagamentoALL().subscribe(data => {  this.CreatArrayFormPG(data); /*console.log("retorno GetRelFinanceiroClinc"); console.log(data); this.ListFormaPagamentoD = data;*/    });
      let dadosUnid = {
        'chaveUsuario'  : this.SelectClinicaDados.USERID,
      }
      //console.log(dadosUnid);

      // console.log("iniciando  *************************");
      // console.log(this.ListUnidade);
      /** para nao buscar varis vezes  */
      if( typeof this.ListUnidade === 'undefined' ){ 
        this.contaCorrenteClinicaService.GetSelcUnidadeB(dadosUnid).subscribe(res=>this.ListUnidade=res);
      }

      let dadosA = {
        'unidade'           : this.SelectClinicaDados.unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'PGTela'            : 'Financeiro',
      }
      // this.creditoService.PrestadorIsAdm(dadosA).subscribe(res=>this.IsAdm=res);
      this.AllService.PostUrl(dadosA,'PrestadorIsAdm').subscribe(res=>this.IsAdm=res);
      
      this.MetPesquisarGrid('none');
      
    }

    CreatArrayFormPG(obj){
      // console.log("CreatArrayFormPG");
      this.ArrayFormaPag = [];
      this.ListFormaAllPag = obj;
      // console.log(this.ListFormaAllPag);
              let arrayAA = [];
              //console.log("aaaaaaaaaaaaaaaaaaassssssssssssssssssssssaaaaaaa");

                Object.keys(obj).map(function (key) {
                      //console.log(obj);
                      //console.log(obj[key]);
                      //console.log(obj[key].chave);
                      //console.log(obj[key].nm_tipo_pagamento);

                        //this.FunNomeFormaPag(obj[key].cd_tipo_pagamento);
                        //this.ArrayFormaPag.push(Object.assign([], this.ListFormaPagamentoD[key] )); 
                      //this.ArrayFormaPag[obj[key].chave] = obj[key].nm_tipo_pagamento;
                      arrayAA[obj[key].chave] = obj[key].nm_tipo_pagamento;
                              // this.MD.MDARRAY.push(Object.assign({}, obj ));
                              //arr.concat([    "dragonfruit",    "elderberry",    "fig"]);
                });
                
                //console.log("1111111111111111111111111111111111111111111");
                //console.log(this.ArrayFormaPag);
                //console.log(arrayAA);
                this.ArrayFormaPag = arrayAA;
              
    }

    myMethod(){
      console.log("relatorio log");
      console.log(this.MD);


    }

    /**
     * BUSCA DADOS FILTRADOS PARA SEREN EXIBIDOS NO GRID
     */
    MetPesquisarGrid(divID){
       //console.log("MetPesquisarGrid");
      this.bTFiltarProssec = true;
      this.ShowBtsMesAtual = false;

      //this.divPrecessandoShow = true;


      this.ListFinancClinicaGrid = [ {label: '...', value: 0, item1: '', item2: ''}, ];
      this.totailGridCredito = this.totailGridDebito = this.PosicaoCaixa = this.ValorSaldoHoje = this.ValorCreditoMesAteHoje = this.ValorParcelMesAteHoje = this.ValorCreditoMes = this.totalValorSaldo = this.totalValorDebito = this.totalValorCredito = 0; 

      // console.log(divID);

      // this.DataHojeini = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
      // this.DataHojeFim = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;


          let dados = {
              'clinicaChave' : this.SelectClinicaDados.chave,
              'clinicaNum' : this.SelectClinicaDados.cd_unidade_atendimento,
              'dataHoje' : this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia,
              'dataINI' : this.model,
              'dataFIM' : this.model1,
              'tratamento' : this.tipotratamento,
              'visualizar' : this.visualizar,
              'pesqString' : this.pesqString
          };

           //console.log(dados);

      this.contaCorrenteClinicaService.GetRelFinanceiroClinc(dados).subscribe(data => {
                                                                                  // console.log("retorno GetRelFinanceiroClinc"); console.log(data);
                                                                                  this.ListFinancClinicaGridAll = data;
                                                                                  this.ListFinancClinicaGrid = data;
                                                                                  this.MetValoresGrid(this.ListFinancClinicaGrid);
                                                                                  this.bTFiltarProssec = false;
      });
    }

    /**
     * CAUCULA VALORES A SER EXIBIDOS NO FINAL DO GRID
     */
    MetValoresGrid(obj){
      //  console.log('MetValoresGrid');
      //  console.log(obj);
      //console.log( typeof obj);
      //console.log("valida");
      this.showDadosMes = true;
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      this.fpPagamento = 0;
      
        //if(1 == 1){
        // console.log("entra");
        //console.log(this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc);
        let objSaldoAntero = this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.resMes;
        let objvaloresHoje = this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.resMesValHoje;
        let objvalores = this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.resMesVal;
        //console.log(typeof objSaldoAntero);
        //console.log(objSaldoAntero !== null);

        this.totailGridCredito = this.totailGridDebito = this.PosicaoCaixa = this.ValorSaldoHoje = this.ValorCreditoMesAteHoje = this.ValorParcelMesAteHoje = this.ValorCreditoMes = this.totalValorSaldo = this.totalValorDebito = this.totalValorCredito = 0; 

        let mesTotalCred  = 0;
        let mesTotalDebit = 0;
        if( (typeof objSaldoAntero !== 'undefined') && (objSaldoAntero !== null) ){
          //console.log("entra if 1");
            mesTotalCred  = objSaldoAntero[0].credito == null ? 0 : parseFloat(objSaldoAntero[0].credito);
            mesTotalDebit = objSaldoAntero[0].parcela == null ? 0 : parseFloat(objSaldoAntero[0].parcela);
        }

        if( (typeof obj !== 'undefined') && (obj !== null) ){
            //console.log("asdasd");
            let a: number = 0.00;
            let b: number = 0.00;
            let ArrayPG = Object.assign([], this.ArrayFormaPag ) ;
            //console.log(this.ArrayFormaPag);
            //console.log(ArrayPG);
            Object.keys(obj).map(function (key) {
              //console.log(obj[key]);
              obj[key].valor_credito = parseFloat(obj[key].valor_credito == null ? 0 : obj[key].valor_credito);
              obj[key].valor_parcela = parseFloat(obj[key].valor_parcela == null ? 0 : obj[key].valor_parcela);
                 
              // console.log("tippo");
              //console.log(obj[key].valor_credito);
              // console.log(obj[key].valor_credito);
              a = a + obj[key].valor_credito; // parseFloat(obj[key].valor_credito);
              b = b + obj[key].valor_parcela; // parseFloat(obj[key].valor_parcela);
              //this.SOMA(a);
              /***   COLOCAR UMA FUNCTION AQUI Q SOMA  */
              //console.log("result");
              // console.log(a);

              obj[key].FormaPagName = ArrayPG[obj[key].pg_form_fc_fpp];
              //console.log(ArrayPG);
              //console.log(obj[key].fc_cd_tipo_pagamento);
              //console.log(ArrayPG[obj[key].fc_cd_tipo_pagamento]);

            });
          
            this.totailGridCredito = a;
            this.totailGridDebito  = b;
        }



       
        
        this.SaldoAnterior = 0;
        this.SaldoAnterior = mesTotalDebit + mesTotalCred;
        // console.log(this.SaldoAnterior);
        // console.log(mesTotalDebit);
        // console.log(mesTotalCred);

        // console.log('mes selecionado');
        let mesSelecionado = this.startDateMes;
        //console.log( typeof this.model);
        // console.log( this.model);
        //console.log( typeof this.model.data);
        
        // console.log(this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.buscaNoMes);
        
        this.ShowBtsMesAtual =  this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.buscaNoMes == false ? true : false;

          // if(typeof this.model !== 'undefined'){
          //   //console.log("selescet mes");
          //   //console.log(this.model);
          //   //console.log(this.model.date.month);
          //   mesSelecionado = this.model.date.month < 10 ? "0" + this.model.date.month : this.model.date.month;

          //   console.log("mes");
          //   console.log(mesSelecionado);
          //   console.log(this.startDateMes);

          //   if(mesSelecionado !=  this.startDateMes){
          //     console.log("e o mes atua selecionado");
          //     this.ShowBtsMesAtual = true;
          //   }

          // }

          /** FOR EACH PQ TEM Q FAZER O LOOP TODO ANTES DO FIM */
          /*obj.forEach(element => {
            element.valor_credito = element.valor_credito == null ? 0 : element.valor_credito;
            element.valor_parcela = element.valor_parcela == null ? 0 : element.valor_parcela;
            //console.log('rodando');    console.log(this.totalValorCredito);
            this.totalValorCredito+= parseFloat(element.valor_credito) ;
            this.totalValorDebito+=  parseFloat(element.valor_parcela);
            let mes = element.data.split("-");
            if( mes[1] == mesSelecionado ){   //console.log("ok");
                  this.ValorCreditoMes += parseFloat(element.valor_credito);
                  this.ValorParcelaMes += parseFloat(element.valor_parcela);
                  if (mes[2] <= this.startDateDia){
                    this.ValorCreditoMesAteHoje+= parseFloat(element.valor_credito) ;
                    this.ValorParcelMesAteHoje+=  parseFloat(element.valor_parcela);
                  }
              }
          });
          */

      if( (typeof objvalores !== 'undefined') && (objvalores !== null ) ){ // O MES PODE NAO TER DADOS AINDA AI E NECESSARIO O IF SE NAO DA ERRO NA PG
          this.ValorParcelaMes = objvalores[0].parcela == null ? 0 : objvalores[0].parcela;
          this.ValorCreditoMes = objvalores[0].credito == null ? 0 : objvalores[0].credito; 
      } 
      if( (typeof objvaloresHoje !== 'undefined') && (objvaloresHoje !== null) ){ // O MES PODE NAO TER DADOS AINDA AI E NECESSARIO O IF SE NAO DA ERRO NA PG
         this.ValorParcelMesAteHoje  = objvaloresHoje[0].parcela == null ? 0 : objvaloresHoje[0].parcela;
         this.ValorCreditoMesAteHoje = objvaloresHoje[0].credito == null ? 0 : objvaloresHoje[0].credito; 
      }
         


      /** para nao da erro de um valor se maior q o outro */
      // console.log("Saldo Geral pode ser");
      // // console.log(this.ValorCreditoMes);
      // // console.log(this.ValorParcelaMes);
      // let aa = parseFloat(this.ValorCreditoMes) - parseFloat(this.ValorParcelaMes);
      // aa  = aa + parseFloat(this.SaldoAnterior);
      // console.log(aa);
      // let bb  =  parseFloat(this.ValorParcelaMes) - parseFloat(this.ValorCreditoMes);
      // this.totalValorSaldo  = ( bb + parseFloat(this.SaldoAnterior) ) * -1 ;
      // console.log(bb);

            // console.log("a");
            // console.log(this.ValorCreditoMes);
            // console.log(this.ValorParcelMesAteHoje);
            // console.log(parseFloat(this.SaldoAnterior));
            
          if(this.ValorCreditoMes != null){
            let y = parseFloat(this.ValorCreditoMes) - parseFloat(this.ValorParcelMesAteHoje);
            this.totalValorSaldo = ( parseFloat(this.ValorCreditoMes) - parseFloat(this.ValorParcelMesAteHoje) ) + parseFloat(this.SaldoAnterior);
          }


          if(this.ValorCreditoMes != null){
            let y = parseFloat(this.ValorCreditoMes) - parseFloat(this.ValorParcelMesAteHoje);
            this.totalValorSaldo = ( parseFloat(this.ValorCreditoMes) - parseFloat(this.ValorParcelMesAteHoje) ) + parseFloat(this.SaldoAnterior);
          }


      // console.log("Saldo Ate Hoje pode ser ");
      // let cc  = this.ValorCreditoMesAteHoje - this.ValorParcelMesAteHoje;
      // console.log(cc);
      // let dd =  ( this.ValorParcelMesAteHoje - this.ValorCreditoMesAteHoje ) * -1;
      // console.log(dd);

      if(this.ValorCreditoMesAteHoje > this.ValorParcelMesAteHoje){
            this.ValorSaldoHoje  = this.ValorCreditoMesAteHoje - this.ValorParcelMesAteHoje;
      }else{
         this.ValorSaldoHoje  =  ( this.ValorParcelMesAteHoje - this.ValorCreditoMesAteHoje ) * -1;
      }
      
      //console.log('aaaaaaaaaa');
      this.PosicaoCaixa = parseFloat(this.SaldoAnterior) + parseFloat(this.ValorSaldoHoje);
      //console.log("valor");
      //console.log(mesTotalCred);
      //console.log(mesTotalDebit);
      if(mesTotalCred > mesTotalDebit){
            this.totalMESValorSaldo  = (this.ValorCreditoMes - this.ValorParcelaMes) + this.SaldoAnterior ;
      }





          /** SE O FILTRO DO MES FOR DIFERENTE DO ATUAL 
           * NAO EXIBIR VALORES
           * E USA O CALCULO ABAIXO PARA MOTRA VALOR REAL  totalValorSaldo
           */
         
          // if(typeof this.model != 'undefined' ){
          //   console.log(typeof this.model.formatted);
          //   console.log("2134123123");
          // }

          console.log(typeof this.model);
          console.log(this.model1);
          // console.log(this.model1.formatted);
          console.log(this.startDateMes);
          if(typeof this.model != 'undefined' && typeof this.model1  != 'undefined'){
            console.log(this.model.date.month,this.model1.date.month);
            if(this.model.date.month == this.model1.date.month ){
              console.log(parseFloat(this.startDateMes), parseFloat(this.model.date.month));
              if(parseFloat(this.startDateMes) > parseFloat(this.model.date.month)){
                console.log("soma valor do mes");
                this.totalValorSaldo = (parseFloat(this.SaldoAnterior) + parseFloat(this.ValorCreditoMes) ) - this.ValorParcelaMes
                this.showDadosMes = false;
              }
            }
          }

          // this.totalValorSaldo = (parseFloat(this.SaldoAnterior) + parseFloat(this.ValorCreditoMes) ) - this.ValorParcelaMes
    
      



    }

    NovoDebto(modalNome){
      //  console.log("NovoDebto");
      // console.log(this.SelectClinicaDados);
      // console.log("unidade dados");
      // console.log(this.UnidadeDados);

      this.FincaTrSelect(null,null); // deseleciona o iten 

      this.MD = {};
      this.ListSelecFincPacit = [];
      this.LisFincPacitGrid = [];
      this.MD.Titulo = "Novo Débito";
      this.MD.catTipoDisable = true;
      this.MD.actionExe = "NovoDebito";
      this.MD.CheqTerce = 'S';
      this.MD.tipo_movimento = 'D';
      this.MD.PagForm = 'L00000020110310134731'; //dinheiro
      this.MD.ProMesFrom = this.MD.PagFormShow = true;
      this.MD.vencimento = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
      this.FormDataPagChanger(this.MD.vencimento);
      this.MD.acaoBD = 'i';

      let diaEscolhido = this.MD.vencimento.split("/");
  
      this.modalVec = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) },
                      formatted : diaEscolhido[0]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[2],
                      jsdate : new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0])
                    };


      this.Faqueadoraelected = '';
        this.MD.Faqueadora = null;
        if(this.UnidadeDados.franqueadora == 'S'){

            this.Faqueadoraelected = this.UnidadeDados.nm_unidade_atendimento

            let dadosUnid = {
              'chaveUsuario'  : this.SelectClinicaDados.USERID
            }
      
            if( typeof this.ListUnidadesFraqueadora === 'undefined' ){ 
              this.contaCorrenteClinicaService.GetSelcUnidadesFraq(dadosUnid).subscribe(res=>this.ListUnidadesFraqueadora=res);
            }
          
        }

      this.ListCatcoriClinic =  this.contaCorrenteClinicaService.GetCatcoriClinic();/* ta imbutido no codigo nao prescisa ir no back**/ 
          //this.ListFormaPagamentoD = [];
          // console.log("testando forma de pagamento get obj null") ;
          if(this.contaCorrenteClinicaService.RESFormaPagamentoD){
            // console.log("entrou forma de pagamento nao e null") ;
            this.ListFormaPagamentoD = this.contaCorrenteClinicaService.RESFormaPagamentoD.dados;
          }else{
            // console.log("foi buscar forma de pagamento") ;
                  this.contaCorrenteClinicaService.GetFormaPagamentoD().subscribe(data => {
                             // console.log("retorno GetRelFinanceiroClinc"); console.log(data);
                              this.ListFormaPagamentoD = data;
                            });
          }
          this.ListplanoContas = [];
          // console.log("testando get obj null") ;
          // console.log(this.contaCorrenteClinicaService.RESPlanoContaDebt);
          if(this.contaCorrenteClinicaService.RESPlanoContaDebt ){
            // console.log("nao e null") ;
            // console.log(this.contaCorrenteClinicaService.RESPlanoContaDebt.dados);
            this.ListplanoContas = this.contaCorrenteClinicaService.RESPlanoContaDebt.dados;
                          if( (this.ContaEsseTrSelectObj) && (this.ContaEsseTrSelectObj.chave) ){
                              let add = {
                                value : this.ContaEsseTrSelectObj.chave,
                                label : this.ContaEsseTrSelectObj.nm_categoria_plano_conta
                              }
                              this.MD.historico = 'Pgto ref. a ' + this.ContaEsseTrSelectObj.nm_categoria_plano_conta;
                              this.onSingleSelected(add);
                              this.ContaEsseTrSelectObj = {};
                          }
          }else{
            //  console.log("ok foi buscar ");
              this.contaCorrenteClinicaService.PlanoContaDebt(this.SelectClinicaDados).subscribe(data => {
                //  console.log("retorno PlanoContaDebt"); console.log(data);
                  this.ListplanoContas = data;
                  if( (this.ContaEsseTrSelectObj) && (this.ContaEsseTrSelectObj.chave) ){
                    let add = {
                      value : this.ContaEsseTrSelectObj.chave,
                      label : this.ContaEsseTrSelectObj.nm_categoria_plano_conta
                    }
                    this.MD.historico = 'Pgto ref. a ' + this.ContaEsseTrSelectObj.nm_categoria_plano_conta;
                    this.onSingleSelected(add);
                    this.ContaEsseTrSelectObj = {};
                  }
              });
          }

    

          if( this.ListBancoCheq == undefined){
                    this.contaCorrenteClinicaService.GetBancosList().subscribe(data => { //busco os bancos do cheque q clinica aceita
                                  // console.log("retorno GetBancosList"); console.log(data);
                                    this.ListBancoCheq = data;
                                });
          }

          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.unidade = this.SelectClinicaDados.unidade;


          if( (this.ContaEsseTrSelectObj) && (this.ContaEsseTrSelectObj.chave) ){
            let add = {
              value : this.ContaEsseTrSelectObj.chave,
              label : this.ContaEsseTrSelectObj.nm_categoria_plano_conta
            }
            this.MD.historico = 'Pgto ref. a ' + this.ContaEsseTrSelectObj.nm_categoria_plano_conta;
            this.onSingleSelected(add);
            this.ContaEsseTrSelectObj = {};
          }



      this.openModal(modalNome);

      //staticModal.show();
    };

    NovoDebtoExecutar(obj){
      console.log("NovoDebtoExecutar");
      obj.ArrayPacs = Object.assign([], this.ListSelecFincPacit );
      obj.IsAdm = this.IsAdm;
      // console.log(this.ListSelecFincPacit);
      // console.log(obj);
      // console.log("-----------------------------");
      //console.log(this.FincTrselectedRowObj);
      //console.log(this.MD);
      //console.log("------------------");
      this.hiderModal(); // esconde modal });
      this.contaCorrenteClinicaService.CCCNovoDebito(obj).subscribe(data => { 
        /* console.log("retorno NovoDebtoExecutar"); console.log(data);*/
         if(data == 'Erro Permicao'){ this.alertMe('Permissão recursada pelo sistema , Usuário não tem privilégios para a ação. '); }
                this.FincaTrSelect(null,null); // deseleciona o iten 
                this.MetPesquisarGrid(null); //Recaregar o grid
                this.Process = false;
      });
    }

    NovoCredito(obj){
      // console.log("NovoCredito");
      // console.log(this.SelectClinicaDados);

      this.FincaTrSelect(null,null); // deseleciona o iten 

      this.MD = {};
      this.ListSelecFincPacit = [];
      this.LisFincPacitGrid = [];
      this.MD.Titulo = "Novo Crédito";
      this.MD.catTipoDisable = true;
      this.MD.actionExe = "NovoCredito";
      this.MD.PagForm = 'L00000020110310134731'; //dinheiro
      this.MD.CheqTerce = 'S';
      this.MD.tipo_movimento = 'C';
      this.MD.ProMesFrom = this.MD.PagFormShow = true;
      this.MD.vencimento = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
      this.FormDataPagChanger(this.MD.vencimento);
      this.MD.acaoBD = 'i';

      let diaEscolhido = this.MD.vencimento.split("/");
  
      this.modalVec = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) },
                      formatted : diaEscolhido[0]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[2],
                      jsdate : new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0])
                    };

      this.Faqueadoraelected = '';
        this.MD.Faqueadora = null;
        if(this.UnidadeDados.franqueadora == 'S'){

            this.Faqueadoraelected = this.UnidadeDados.nm_unidade_atendimento

            let dadosUnid = {
              'chaveUsuario'  : this.SelectClinicaDados.USERID
            }
      
            if( typeof this.ListUnidadesFraqueadora === 'undefined' ){ 
              this.contaCorrenteClinicaService.GetSelcUnidadesFraq(dadosUnid).subscribe(res=>this.ListUnidadesFraqueadora=res);
            }
          
        }

      this.ListCatcoriClinic =  this.contaCorrenteClinicaService.GetCatcoriClinic();/* ta imbutido no codigo nao prescisa ir no back**/ 

          if(this.contaCorrenteClinicaService.RESFormaPagamentoC){
                  this.ListFormaPagamentoD = this.contaCorrenteClinicaService.RESFormaPagamentoC.dados;
          }else{
                this.contaCorrenteClinicaService.FormaPagamentoC().subscribe(data => {
                             // console.log("retorno GetRelFinanceiroClinc"); console.log(data);
                              this.ListFormaPagamentoD = data;
                            });
          }
          this.ListplanoContas = [];
          if(this.contaCorrenteClinicaService.RESPlanoContaCred){
              this.ListplanoContas = this.contaCorrenteClinicaService.RESPlanoContaCred.dados;
          }else{
             this.contaCorrenteClinicaService.PlanoContaCred(this.SelectClinicaDados).subscribe(data => {
                              //  console.log("retorno PlanoContaCred"); console.log(data);
                                this.ListplanoContas = data;
                            });
          }

         
          

          if( this.ListBancoCheq == undefined){
                    this.contaCorrenteClinicaService.GetBancosList().subscribe(data => { //busco os bancos do cheque q clinica aceita
                                  //console.log("retorno GetBancosList"); console.log(data);
                                    this.ListBancoCheq = data;
                                });
          }


          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;

      this.openModal(obj);

      //staticModal.show();
    };

    NovoCreditoExecutar(obj){
      // console.log("NovoCreditoExecutar");
      // console.log(obj);
      // console.log(this.LisFincPacitGrid);
      // console.log("-----------------------------");
      //console.log(this.FincTrselectedRowObj);
      //console.log(this.MD);
      //console.log("------------------");
      obj.ArrayPacs = Object.assign([], this.ListSelecFincPacit );
      obj.IsAdm = this.IsAdm;
      this.hiderModal();
      this.contaCorrenteClinicaService.CCCNovoCredito(obj).subscribe(data => {
                               //console.log("retorno NovoCreditoExecutar"); console.log(data);
                               if(data == 'Erro Permicao'){ this.alertMe('Permissão recursada pelo sistema , Usuário não tem privilégios para a ação. '); }
                              this.FincaTrSelect(null,null); // deseleciona o iten 
                              this.MetPesquisarGrid(null);//Recaregar o grid
                              this.Process = false;
      });
      
      
    };

    onSelectedFranc(item){
      // console.log("onSelectedFranc");
      // console.log(item);

      this.MD.Faqueadora = item.value;
      this.Faqueadoraelected = item.label;
      //console.log("sevico admin");
      //console.log('- selected (value: ' + item.value  + ', label:' + item.label + ')');
    };

    AlterarDebto(modalNome){
      // console.log("AlterarDebto");
      console.log(this.FincTrselectedRowObj);
      // console.log("clinica dados");
      // console.log(this.SelectClinicaDados);

      //  console.log(this.UnidadeDados);
      // console.log(this.UnidadeDados.franqueadora);
            
      // ListUnidadesFraqueadora

      /** SE FOR BONUS PODE ALTERAR APENAS A DATA  */
      this.FincselectedBonus = false;
      if(this.FincTrselectedRowObj.chaveOdontoBonus != null){
        this.FincselectedBonus = true;
      }
        

      if( ( typeof this.FincTrselectedRow !== 'undefined' ) && ( this.FincTrselectedRow !== null ) ){
          //  console.log("iten selecionando");
          //  console.log(this.FincTrselectedRowObj);


          this.ListCatcoriClinic =  this.contaCorrenteClinicaService.GetCatcoriClinic();/* ta imbutido no codigo nao prescisa ir no back**/ 
          if( ( typeof this.ListFormaPagamentoD === 'undefined' ) || ( this.ListFormaPagamentoD === null ) ){
                  this.contaCorrenteClinicaService.GetFormaPagamentoD().subscribe(data => {
                             // console.log("retorno GetRelFinanceiroClinc"); console.log(data);
                              this.ListFormaPagamentoD = data;
                            });
          }

          this.contaCorrenteClinicaService.PlanoContasAll(this.SelectClinicaDados).subscribe(data => {
                               //console.log("retorno PlanoContasAll"); console.log(data);
                                this.ListplanoContas = data;
          });
          

          this.MD = {};
          this.ListSelecFincPacit = [];
          this.LisFincPacitGrid = [];
          this.MD.actionExe = "AterarDebito";
          this.MD.catTipoDisable = true;
          this.MD.Titulo =  this.FincTrselectedRowObj.tipo_movimento == 'C' ? "Alterar Crédito" : "Alterar Débito";
          this.MD.chave = this.FincTrselectedRowObj.chave;
          this.MD.valorParcela = this.FincTrselectedRowObj.valor_parcela == 0 ? this.FincTrselectedRowObj.valor_credito : this.FincTrselectedRowObj.valor_parcela ; 
          this.MD.ProMesFrom = this.MD.PagFormShow = false;
          this.MD.historico = this.FincTrselectedRowObj.historico;
          this.MD.observacao = this.FincTrselectedRowObj.observacoes;
          this.MD.tipo_movimento = this.FincTrselectedRowObj.tipo_movimento;
          this.MD.planoContaSelected = this.FincTrselectedRowObj.nm_grupo_financeiro +' & '+ this.FincTrselectedRowObj.nm_categoria_plano_conta;
          this.MD.planoContaAtual = this.FincTrselectedRowObj.chave_catconta;
          this.MD.acaoBD = 'a';
          this.MD.chaveOdontoBonus = this.FincTrselectedRowObj.chaveOdontoBonus;
          

          this.Faqueadoraelected = '';
          this.MD.Faqueadora = null;
          if(this.UnidadeDados.franqueadora == 'S'){

              this.Faqueadoraelected = this.UnidadeDados.nm_unidade_atendimento

              let dadosUnid = {
                'chaveUsuario'  : this.SelectClinicaDados.USERID
              }
        
              if( typeof this.ListUnidadesFraqueadora === 'undefined' ){ 
                this.contaCorrenteClinicaService.GetSelcUnidadesFraq(dadosUnid).subscribe(res=>this.ListUnidadesFraqueadora=res);
              }
            
          }
        
      
          /*** VERIFICAR COM FLAVIO A QUESTAO DA DATA QUAL USAR  HOJE - DATA DEBITO - DATA VENCIMENTO*/
           this.MD.vencimentoMsql =  this.FincTrselectedRowObj.data; //this.FundataShow(this.FincTrselectedRowObj.data);
           /*if(this.FincTrselectedRowObj.dt_vencimentofpp != null){
             console.log("1");
              this.MD.vencimentoMsql = this.FincTrselectedRowObj.dt_vencimentofpp;
           }else if(this.FincTrselectedRowObj.fpp_dt_baixa != null){
             console.log("2");
              this.MD.vencimentoMsql = this.FincTrselectedRowObj.fpp_dt_baixa;
           } */ 
          //  modalVec
            // console.log(this.FincTrselectedRowObj.data);
            this.MD.vencimento = this.FundataShow(this.MD.vencimentoMsql);
            let diaEscolhido = this.MD.vencimento.split("/");
        
            this.modalVec = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) },
                            formatted : diaEscolhido[0]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[2],
                            jsdate : new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0])
                          };

          
          let diaArray = this.FunDiaSemana(this.MD.vencimentoMsql);
          this.MD.diaNome =  this.DiasSemana[diaArray]; /*** e um array com os nome do dia da semana  */
          this.MD.objSelect = this.FincTrselectedRowObj;
          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.PagForm = this.FincTrselectedRowObj.pg_form_fc_fpp; //fc_cd_tipo_pagamento;
          this.MD.unidade = this.SelectClinicaDados.unidade;

          // console.log("----------------------------------- ");
          // console.log(this.FincTrselectedRowObj.id_cheq_terc);
           if(this.FincTrselectedRowObj.id_cheq_terc !== null){
              // console.log("e cheque ");
              // console.log('add parcela');
              // console.log(this.FincTrselectedRowObj);
              this.MD.valorParcela = 0;
              let dados = {
                'id' : this.FincTrselectedRowObj.id_cheq_terc 
              };

              this.contaCorrenteClinicaService.FincCheqById(dados).subscribe(data => {
                    //console.log("retorno PlanoContasAll"); console.log(data);
                    this.AltershowFincParcs(data);
              });

           }

          //this.MD.modalNome = modalNome;
          
          this.openModal(modalNome);

      }else{
        alert("Selecione primeiro! ");
      }
    }

    AlterarDebtoExecutar(obj){
      // console.log("AlterarDebtoExecutar");
      //  console.log(obj);
      // console.log("-----------------------------");
      // console.log(this.FincTrselectedRowObj);
      // console.log("11111111111111111");

      /** PODE ALTERAR A DATA DO BONUS SE FOR UM CREDITO - APENAS */
      
      
      /*** nao pode altera nada do bonus  */
      if(this.FincTrselectedRowObj.chaveOdontoBonus != null && this.FincTrselectedRowObj.tipo_movimento == 'D'  ){ 
        alert("Erro permissão negada! "); 
        this.hiderModal();
        this.FincaTrSelect(null,null); // deseleciona o iten 
        this.MetPesquisarGrid(null); 
        this.Process = false;
        return true; 
      }

      if(obj.Faqueadora){
        // console.log(obj.Faqueadora);
        // console.log(this.contaCorrenteClinicaService.RESGetSelcUnidadesFraq);
        this.contaCorrenteClinicaService.RESGetSelcUnidadesFraq.dados.forEach(element => {
          if(element.value == obj.Faqueadora){
              obj.Faqueadora = element.cd_unidade_atendimento ;
              // console.log(element.cd_unidade_atendimento );
          }
        });

      }

      // console.log('atualizando obj');
      // console.log(obj);

      let result;
      obj.ArrayPacs = Object.assign([], this.ListSelecFincPacit );
      this.contaCorrenteClinicaService.AlterarDebitoCredito(obj).subscribe(data => {
                              //  console.log("retorno AlterarDebitoCredito"); console.log(data);
                              if(data == 'Erro Permicao'){ this.alertMe('Permissão recursada pelo sistema , Usuário não tem privilégios para a ação. '); }
                            });
      //this.modalService.hide;

      //this.MD.valorParcela = this.FincTrselectedRowObj.valor_parcela == 0 ? this.FincTrselectedRowObj.valor_credito : this.FincTrselectedRowObj.valor_parcela ; 
      this.FincTrselectedRowObj.valor_parcela = this.MD.tipo_movimento == 'D' ? this.MD.valorParcela : this.FincTrselectedRowObj.valor_parcela;
      this.FincTrselectedRowObj.valor_credito = this.MD.tipo_movimento == 'C' ? this.MD.valorParcela : this.FincTrselectedRowObj.valor_credito;
      this.FincTrselectedRowObj.categoria = this.MD.tipo_movimento == 'C' ? "CR Clínica" : "DB Clínica";
      let planoSelectArray = this.MD.planoContaSelected.split("&");
      // console.log(planoSelectArray);
      this.FincTrselectedRowObj.nm_grupo_financeiro = planoSelectArray[0];
      this.FincTrselectedRowObj.categoria =  planoSelectArray[1];
      this.FincTrselectedRowObj.historico =  this.MD.historico;
      this.FincTrselectedRowObj.observacoes = this.MD.observacao;
      this.FincTrselectedRowObj.observacoes = this.MD.observacao;
      this.FincTrselectedRowObj.tipo_movimento = this.MD.tipo_movimento;
      
      // console.log("-------i-----------");
      // console.log(this.FincTrselectedRowObj);
      this.hiderModal();
      this.FincaTrSelect(null,null); // deseleciona o iten 
      /*** se for CHEQ TERCEIRO RECAREGA GRID */
      // if(obj.PagForm == 'L00500020161205113918'){
        this.MetPesquisarGrid(null);//Recaregar o grid
      // }
      this.Process = false;
    
    }

    ConfirmarDellCred(modalNome,executar){
      this.DellProcess = true;
      //console.log("ConfirmarDellCred");
      //console.log(executar);
      if( executar == false &&  ( typeof this.FincTrselectedRow !== 'undefined' ) && ( this.FincTrselectedRow !== null ) ){
          this.DellProcess = false;
          this.DellMD = {};
          let obj = {
            'valor_parcela' : this.FincTrselectedRowObj.valor_parcela ,
            'valor_credito' : this.FincTrselectedRowObj.valor_credito ,
            'nm_prestador'  : this.FincTrselectedRowObj.nm_prestador 
          }
          this.DellMD = obj;
          this.openModal(modalNome, 'modal-md');
          //console.log(this.FincTrselectedRow);
          //console.log(this.FincTrselectedRowObj);
      }

      if( executar == true &&  ( typeof this.FincTrselectedRow !== 'undefined' ) && ( this.FincTrselectedRow !== null ) ){
          //console.log("gogoogogogo");
          this.hiderModal();
          this.DellDebtoCredito(modalNome); 
      }else{
          this.DellProcess = false;
      }
    }

    DellDebtoCredito(val){
      //console.log("DellDebtoCredito");
      //console.log("clinica dados");
      //console.log(this.SelectClinicaDados);
      if( ( typeof this.FincTrselectedRow !== 'undefined' ) && ( this.FincTrselectedRow !== null ) ){
          // console.log("iten selecionando");
          //  console.log(this.FincTrselectedRowObj);

              /*** nao pode altera/Deletar nada do bonus pela tela da conta corrente  clinica  */
          if( this.FincTrselectedRowObj.chaveOdontoBonus != null ){ 
            alert("Erro permissão negada! "); 
            this.hiderModal();
            this.FincaTrSelect(null,null); // deseleciona o iten 
            this.MetPesquisarGrid(null); 
            return true; 
          }

          this.MD = {};
          //this.ListSelecFincPacit = [];
          this.LisFincPacitGrid = [];
          this.MD.actionExe = "eliminar";
          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.chave = this.FincTrselectedRowObj.chave;
          this.MD.cd_financeiro = this.FincTrselectedRowObj.cd_financeirofpp;
          this.MD.chavefpp = this.FincTrselectedRowObj.chavefpp;
          this.MD.ArrayPacs = Object.assign([], this.ListSelecFincPacit );
          this.ListSelecFincPacit = [];
          this.MD.acaoBD = 'e';
          
          // console.log(this.MD); 
          this.contaCorrenteClinicaService.CCCDellCreditoDebito(this.MD).subscribe(data => {
                               //console.log("retorno AlterarDebitoCredito"); console.log(data);
                               if(data == 'Erro Permicao'){ this.alertMe('Permissão recursada pelo sistema , Usuário não tem privilégios para a ação. '); }
                              this.FincaTrSelect(null,null); // deseleciona o iten 
                              this.MetPesquisarGrid(null);//Recaregar o grid
          });

      
      }
    }

    /**
     * Botao executar do modal - o mesmo modal para varios comandos
     * valida o form antes de enviar 
     */
    ExeForm(obj){
      //  console.log("ExeForm");
      //  console.log(obj);
      //  console.log(this.modalVec);

        this.Process = true;

        let erro = 0;
        this.MD.vencimentoDanger = false;
        this.MD.valorParcelaDanger = false;
        this.MD.planoContaDanger = false;
        if(this.isNullOrEmpety(this.modalVec)){
          // console.log("NAO data vencimento");
          this.MD.vencimentoDanger = true;
          erro++;
          this.Process = false;
        }else{
          this.FormDataPagChanger(this.modalVec.formatted);
        }
        if(!this.MD.vencimento){
          // console.log("NAO data vencimento");
          this.MD.vencimentoDanger = true;
          erro++;
          this.Process = false;
        }
        if(!this.MD.valorParcela){
          // console.log("NAO  valorParcela");
          this.MD.valorParcelaDanger = true;
          erro++;
          this.Process = false;
        }
        if(!this.MD.planoContaAtual){
          // console.log("NAO  planoContaAtual");     
          this.MD.planoContaDanger = true;
          erro++;
          this.Process = false;
        }


          

        if(erro == 0 ){
            // console.log(obj);
            switch (obj.actionExe) {
              case 'AterarDebito':
                  this.AlterarDebtoExecutar(obj);
                  break;
              case 'NovoDebito':
                  this.NovoDebtoExecutar(obj);
                  break;
              case 'NovoCredito':
                  this.NovoCreditoExecutar(obj);
                  break;
                  
              
              default:
                  console.log("erro enviar dados invalidos");
                  break;
            }
        }else{
            alert("Preencha os campos obrigatórios! ");
        }
        
    }

    ShowContsEssenciais(modalNome){
      // console.log("ShowContsEssenciais");
      // console.log(this.FincTrselectedRow);
      // console.log(this.FincTrselectedRowObj);
      // console.log("GET ESSSE");
      // console.log(this.contaCorrenteClinicaService.RESCCCContasEssenciais);
      this.ListContsEssenciais = this.contaCorrenteClinicaService.RESCCCContasEssenciais.dadosnomes;

      this.MD = {};
      this.MD.Filial = this.SelectClinicaDados.nm_unidade_atendimento;
      let dataHoje = 
      this.MD.ini = typeof this.model == 'undefined'  ?   this.SelectClinicaDados.DataHoje :  this.model;
      this.MD.fim = typeof this.model1 == 'undefined' ?   this.SelectClinicaDados.DataHoje :  this.model1;

      this.openModal(modalNome);

    };

    ContaEsseTrSelect(obj,i,modalNome){
      //  console.log("ContaEsseTrSelect");
      //  console.log(obj);
      //  console.log(i);
      //  console.log(this.ContaEsseTrSelectObj);
      this.ContaEsseTrSelectObj = obj;
      // console.log(this.ContaEsseTrSelectObj);
      this.hiderModal();

      this.NovoDebto(modalNome);

    }

    FincaTrSelect(obj,i,Modal = null){
      // console.log("FincaTrSelect");
      // console.log(obj);
      // console.log(i);

      if(this.FincTrselectedRow == i && Modal != null){
          // console.log("open alterar");
          this.FincTrselectedRow = i;
          this.FincTrselectedRowObj = obj;
          this.AlterarDebto(Modal);
      }else{
          this.FincTrselectedRow = i;
          this.FincTrselectedRowObj = obj;
      }

     
      
      //console.log(this.FincTrselectedRowObj);
    };

    LancamentoCaixaAnt(modalNome){
      // console.log("LancamentoCaixaAnt");
      this.openModal(modalNome, 'modal-lg');

      // console.log(this.SelectClinicaDados);
      this.FormSaldoAnt = 0;
      this.MDARRAY = [];
      this.bTCaixAntProssec = false;
      

          this.contaCorrenteClinicaService.FormLancamentoCaixaAnt(this.SelectClinicaDados).subscribe(data => { this.FormCaixaAntIPTs = data;
                                this.LancamentoCaixaAntSaldos();
                                //console.log(this.contaCorrenteClinicaService.RESFormCaixaAnt);
                               //console.log("retorno AlterarDebitoCredito"); console.log(data);
          });
    }

    /*** Verificar valor negativo na variavael total FormSaldoAnt pode esta dando erro  */
    LancamentoCaixaAntSaldos(){
      // console.log("LancamentoCaixaAntSaldos");
      // console.log(this.contaCorrenteClinicaService.RESFormCaixaAnt.saldo_anterior[0]);
      let saldoAnt = this.contaCorrenteClinicaService.RESFormCaixaAnt.saldo_anterior[0]; //credito
      saldoAnt = saldoAnt.credito == null ? 0 : saldoAnt.credito;
      // console.log('saldoAnt');console.log(saldoAnt);

      //console.log(this.contaCorrenteClinicaService.RESFormCaixaAnt.saldo_hoje);
      let saldoHoje = this.contaCorrenteClinicaService.RESFormCaixaAnt.saldo_hoje[0];
      let saldoHojeParc = saldoHoje.parcela == null ? 0 : saldoHoje.parcela;
      let saldoHojeCredt = saldoHoje.credito == null ? 0 : saldoHoje.credito;
      //console.log("saldoHojeParc");console.log(saldoHojeParc);
      //console.log("saldoHojeCredt");console.log(saldoHojeCredt);
      this.FormSaldoAnt =  ( parseFloat(saldoHojeCredt)  -  parseFloat(saldoHojeParc)  ) + parseFloat(saldoAnt) ;

      // if(this.FormSaldoAnt < 0 ){
      //   this.FormSaldoAnt = this.FormSaldoAnt * -1;
      // }
      // console.log(this.FormSaldoAnt);
      //console.log(this.MD);
      

    }

    LancamentoCaixaAntExe(obj,modalNome){
      // console.log('LancamentoCaixaAntExe');
      // console.log(obj);

      // console.log(this.FormCaixaAntIPTs);

      this.bTCaixAntProssec = true; /**multiplos envios block */

      /*** Valida se valores eguevalem a soma total */

      let a: number = 0.00;
      for (let key in obj) {
        //console.log( obj[key]);
          if (obj.hasOwnProperty(key)) {
            //console.log( obj[key]);
            if(parseFloat(obj[key]) >= -9999999 ){ //0.000000001 ){
              //console.log("ok maior 0");
              a +=  parseFloat(obj[key]);
            }
           
          }
      }

      // console.log("total var ");
      // console.log(a.toFixed(2));
      // console.log(  this.FormSaldoAnt );
      // console.log(  this.FormSaldoAnt.toFixed(2) );
      // console.log( (this.FormSaldoAnt != a.toFixed(2) ) );
      // console.log( (this.FormSaldoAnt.toFixed(2) != a.toFixed(2) ) );

      if(this.FormSaldoAnt.toFixed(2) != a.toFixed(2)){
        alert("Os valores devem ser equivalente ao caixa!");
        this.bTCaixAntProssec = false;
        
      }else{
          
          this.MD = {};
          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.DataHoje = this.SelectClinicaDados.DataHoje;
          this.MD.DiaNome =  this.DiasSemana[this.FunDiaSemana(this.SelectClinicaDados.DataHoje)];
          this.MD.MDARRAY =  [];
          //this.MD.MDARRAY.push(Object.assign([], obj ));
          this.MD.MDARRAY.push(Object.assign({}, obj ));
            
          this.MD.SaldoAnt  = this.FormSaldoAnt; 


          //console.log(this.FormSaldoAnt);
          //console.log(this.MD);

          //modalNom
          this.contaCorrenteClinicaService.ShowCaixaAnt(this.SelectClinicaDados).subscribe(data => {res=>this.LancCaixaAnterioShow=res;
                  //console.log("indo confirmar anterior caixa");
            if(this.LancCaixaAnterioShow == false ){
              //console.log("entrou caixa");
                      this.contaCorrenteClinicaService.LancamentoCaixaAnt(this.MD).subscribe(data => { //this.FormCaixaAntIPTs = data;
                          //console.log(this.contaCorrenteClinicaService.RESFormCaixaAnt);
                          //console.log("retorno LancamentoCaixaAnt"); 
                          //console.log(data);
                          this.bTCaixAntProssec = false;
                          this.hiderModal(); 
                          alert("Os valores foram adicionados com sucesso!");  
                      });
                }else{
                  this.bTCaixAntProssec = false;
                  alert("Erro - os valores do caixa ja estão preenchidos!");  
                }
          });
      }
    }

    DellCaixaAnt(){
        //console.log("CCCDellCaixaAnt");
        let dados = {
            'USERID'                  : this.SelectClinicaDados.USERID,
            'PGnome'                  : this.SelectClinicaDados.PGnome, 
            'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
            'dataHoje'                : this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia,
            'dataINI'                 : this.model,
            'dataFIM'                 : this.model1,
            'acaoBD'                  : 'e'
        };

        
        //console.log(dados);

        this.contaCorrenteClinicaService.CCCDellCaixaAnt(dados).subscribe(data => { //this.FormCaixaAntIPTs = data;
          //console.log("retorno"); console.log(data);
          if(data == 'Erro Permicao'){ this.alertMe('Permissão recursada pelo sistema , Usuário não tem privilégios para a ação. '); }
          this.DellCaixaAntMSG(data);
        });


    }

    DellCaixaAntMSG(val){
      //console.log("DellCaixaAntMSG");
      if(!val){
        alert("Lançamentos de caixa anterior deste periodo excluído");
      }
    }

    onchagerSaldo(obj){
     // console.log("onchagerSaldo");

      var a: number = 0.00;
      let b: number = 0.00;
      this.SaldoCaixaDifirenca = 0;
      //console.log(obj);
      for (let key in obj) {
        //console.log( obj[key]);
          if (obj.hasOwnProperty(key)) {
            //console.log( obj[key]);
            if(parseFloat(obj[key]) >= 0.000000001 ){
              //console.log("ok maior 0");
              a +=  parseFloat(obj[key]);
            }
           
          }
      }
      //console.log("total var ");
      //console.log(a.toFixed(2));
      if(this.FormSaldoAnt && this.FormSaldoAnt > 0){
        b = this.FormSaldoAnt -  a;
      }
      this.SaldoCaixaDifirenca = b.toFixed(2);
    }

    onchagerPagForm(){
      // console.log("onchagerPagForm");
      this.MD.valorParcela = 0.00;
      // console.log(this.MD.PagForm);
      /** se for cheque terceiro preenche o banco clinica */
      if( (this.MD.PagForm == 'L00000020100620202851') || (this.MD.PagForm == 'L00000020100620202853') ){
          // console.log("add addoas banco");
          //  console.log( this.UnidadeDados.cheq_banco );
          //  console.log( this.ListBancoCheq );
          //  console.log( this.MD.CheqBanco );

           
            this.MD.CheqBanco = this.UnidadeDados.cheq_banco; 
            this.MD.CheqAgen  = this.UnidadeDados.cheq_agencia;
            this.MD.CheqCont  = this.UnidadeDados.cheq_conta;
            //ListBancoCheq
      }

    }

    onSingleSelected(item){
      this.MD.planoContaAtual = item.value;
      this.MD.planoContaSelected = item.label;
      //console.log("sevico admin");
      //console.log('- selected (value: ' + item.value  + ', label:' + item.label + ')');
    };

    onNamePSelected(item){
      //console.log("onNamePSelected");
      //console.log(item);
      this.LisFincPacitGrid = [];

      

      let  dados = {
          'chave'     : item.value,
          'cd_filial' : this.SelectClinicaDados.cd_unidade_atendimento,
          'USERID'    : this.SelectClinicaDados.USERID,
          'PGnome'    : this.SelectClinicaDados.PGnome
      };

      this.contaCorrenteClinicaService.FincPaParcById(dados).subscribe(data => {
                                  //  console.log(data);
                                   this.showFincParcs(data);
      });
    }

    onSelectUnidade(item){
      //console.log("onSelectUnidade");
      //console.log(item);

      this.SelectClinicaDados.chave = item.value;
      this.SelectClinicaDados.unidade = item.value;
      this.SelectClinicaDados.nm_unidade_atendimento = item.label;
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      this.ListFinancClinicaGrid = [];
      this.totailGridCredito = this.totailGridDebito = this.PosicaoCaixa = this.ValorSaldoHoje = this.ValorCreditoMesAteHoje = this.ValorParcelMesAteHoje = this.ValorCreditoMes = this.totalValorSaldo = this.totalValorDebito = this.totalValorCredito = 0; 
      //console.log("unidades");
      //console.log(this.contaCorrenteClinicaService.RESGetSelcUnidadeB);
      
      this.contaCorrenteClinicaService.RESGetSelcUnidadeB.dados.forEach(element => {
          //console.log(element['value']);
          if(this.SelectClinicaDados.unidade == element['value'] ){
              this.SelectClinicaDados.cd_unidade_atendimento = element['cd_unidade_atendimento'];
          }
      });
      //console.log(this.SelectClinicaDados);

      //let a = {};
      //this.MetValoresGrid(a);

      this.ngOnInit();
    }

    showFincParcs(obj){
      // console.log("showFincParcs");
      // console.log(obj);
      let listFincParcs = [];
        Object.keys(obj).map(function (key) {
          //console.log("---------------");
          // console.log(obj[key].fp_dt_aprovacao);
          // console.log(obj[key].nm_tipo_tratamento);
          // console.log(obj[key].valor_total);
          // console.log(obj[key].cd_financeiro);
          // console.log(obj[key].valor_parcela);
          // console.log(obj[key].valor_credito);
          // console.log(obj[key].debito_efetivado);
          // console.log(obj[key].tipo_movimento);

          // console.log( obj[key].fp_dt_aprovacao +"("+  obj[key].cd_financeiro +") -"+  obj[key].nm_tipo_tratamento  );
          
          let k = {
            'fincAprov'         : obj[key].fp_dt_aprovacao +"("+  obj[key].cd_financeiro +")-"+ obj[key].nm_tipo_tratamento,
            'fincAprovN'        : obj[key].fp_dt_aprovacao +"("+  obj[key].cd_financeiro +")-"+ obj[key].nm_tipo_tratamento + " "+  obj[key].nome,
            'nome'              : obj[key].nome,
            'valTotal'          : obj[key].valor_total,
            'valCredito'        : obj[key].valor_credito,
            'valparcela'        : obj[key].valor_parcela,
            'parcelaNum'        : obj[key].num_parcela,
            'cheqNum'           : obj[key].pg_cheque_numero,
            'debito_efetivado'  : obj[key].debito_efetivado,
            'dtBaixa'           : obj[key].fpp_dt_baixa,
            'fppChave'          : obj[key].fpp_chave,
            'fpChave'           : obj[key].chave,
            'Selected'          : false,
            'historico'         : obj[key].historico,
            'fp_cd_financeiro'  : obj[key].cd_financeiro,
            'fp_cd_tratamento'  : obj[key].cd_tratamento
          }

          listFincParcs.push(k);
        });

      this.LisFincPacitGrid = listFincParcs;



    }

    AltershowFincParcs(obj){
      //  console.log("AltershowFincParcs");
      //  console.log(obj);
      let listFincParcs = [];
        Object.keys(obj).map(function (key) {
          //console.log("---------------");
          // console.log(obj[key].fp_dt_aprovacao);
          // console.log(obj[key].nm_tipo_tratamento);
          // console.log(obj[key].valor_total);
          // console.log(obj[key].cd_financeiro);
          // console.log(obj[key].valor_parcela);
          // console.log(obj[key].valor_credito);
          // console.log(obj[key].debito_efetivado);
          // console.log(obj[key].tipo_movimento);

          // console.log( obj[key].fp_dt_aprovacao +"("+  obj[key].cd_financeiro +") -"+  obj[key].nm_tipo_tratamento  );
          
          let k = {
            'fincAprov'         : obj[key].fp_dt_aprovacao +"("+  obj[key].cd_financeiro +")-"+ obj[key].nm_tipo_tratamento,
            'fincAprovN'        : obj[key].fp_dt_aprovacao +"("+  obj[key].cd_financeiro +")-"+ obj[key].nm_tipo_tratamento + " "+  obj[key].nome,
            'nome'              : obj[key].nome,
            'valTotal'          : obj[key].valor_total,
            'valCredito'        : obj[key].valor_credito,
            'valparcela'        : obj[key].valor_parcela,
            'parcelaNum'        : obj[key].num_parcela,
            'cheqNum'           : obj[key].pg_cheque_numero,
            'debito_efetivado'  : obj[key].debito_efetivado,
            'dtBaixa'           : obj[key].fpp_dt_baixa,
            'fppChave'          : obj[key].fpp_chave,
            'fpChave'           : obj[key].chave,
            'Selected'          : false,
            'historico'         : obj[key].historico,
            'fp_cd_financeiro'  : obj[key].cd_financeiro,
            'fp_cd_tratamento'  : obj[key].cd_tratamento,
            'disable'           : true

          }

          listFincParcs.push(k);
        });


     // this.LisFincPacitGrid = listFincParcs;

      // console.log("dados");
      // console.log(listFincParcs);
      listFincParcs.forEach(element => {
            // console.log(element);
            this.FincaParcSelectAdd(element);
      });





    }

    FincaParcSelectAdd(item){
      // console.log("FincaParcSelectAdd");
      // console.log(item);
      // console.log(this.MD.valorParcela);
      item.Selected = true;
      item.valCredito == null ? 0 : item.valCredito;
      this.MD.valorParcela += parseFloat(item.valCredito);
      // console.log(this.MD.valorParcela);

      //this.ListSelecFincPacit.push(item);
      this.ListSelecFincPacit.splice(0, 0, item);
      this.ItemParcSelectExist(item);


    }

    FincaParcValid(item){
      //  console.log("FincaParcValid");
      //  console.log(item);
      //  console.log(this.ListSelecFincPacit)
      // console.log(this.MD.valorParcela);



      let n = 0;
      this.ListSelecFincPacit.forEach(element => {
          if(item.fppChave == element['fppChave'] ){
            this.ListSelecFincPacit.splice(n, 1);
          }
          n++;
      });

      this.MD.valorParcela = this.MD.valorParcela - parseFloat(item.valCredito);

      item.Selected = false;

        // console.log(this.MD.valorParcela);




    }

    ItemParcSelectExist(item){
      // console.log("ItemParcSelectExist");
      this.ListSelecFincPacit.forEach(element => {
        // console.log(element['fppChave']);
        if(item == element['fppChave'] ){
          return false;
        }

      });

    }

    onGetNamePaciente(item){
      //  console.log("onGetNamePaciente");
      //console.log(item.keyCode);
      //console.log(item.path[0])
      let a = item.path[0];
      //console.log(a.value);

        let dados = {
              'grupo_unidades' : this.UnidadeDados.grupo_unidades,
              'paciente_unidade' : this.UnidadeDados.paciente_unidade,
              'BuscarString' : a.value,
              'cd_filial' : this.SelectClinicaDados.cd_unidade_atendimento,
              'USERID'                  : this.SelectClinicaDados.USERID,
              'PGnome'                  : this.SelectClinicaDados.PGnome
          };

          //  console.log(dados);
          
        if(item.keyCode == 32 || item.keyCode == 13){
          this.contaCorrenteClinicaService.PaCheqForString(dados).subscribe(data => {
                                      // console.log(data);
                                      this.addListNomePacientes(data);
                                      //  this.ListNomePacientes.push(Object.assign({}, data ));
                                    });
        }

     

    }

    addListNomePacientes(obj){
      //console.log("addListNomePacientes");
      let arrayNome = [];
      //console.log(this.ListNomePacientes);

       Object.keys(obj).map(function (key) {
        //console.log(obj[key].nome);
        let i = {label: obj[key].nome +" - " + obj[key].cpf  , value: obj[key].chave} ;
        arrayNome.push(i);
        //this.ListNomePacientes.push(i)

      });

      //arrayNome.push(Object.assign({},   );

      for (var key in this.ListNomePacientes) {
        if (this.ListNomePacientes.hasOwnProperty(key)) {
          //console.log(this.ListNomePacientes[key]);
          //var element = this.ListNomePacientes[key];
          arrayNome.push(this.ListNomePacientes[key]);
          
        }
      }


      //var list = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }, { x: 1, y: 2 }];

      var uniq = new Set(arrayNome.map(e => JSON.stringify(e)));
      //console.log("*********************************");
      //console.log(uniq);

      arrayNome = Array.from(uniq).map(e => JSON.parse(e));
      //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      //console.log(arrayNome);

      //arrayNome.sort(function(a,b) {return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);} );
      this.ListNomePacientes = arrayNome;
      //console.log("++++++++++++++++++++++++++++++++++++");
      //console.log(this.ListNomePacientes);
      
    }

    /** NAO USADO AINDA */
    OrdenarTextLabel(a,b) {
      if (a.label < b.label)
        return -1;
      if (a.label > b.label)
        return 1;
      return 0;
    }

    FunNomeFormaPag(val){
        // console.log("FunNomeFormaPag");
         for (let key in  this.ListFormaPagamentoD ) {
        //console.log( obj[key]);
          if ( this.ListFormaPagamentoD.hasOwnProperty(key)) {
              // console.log(this.ListFormaPagamentoD[key]);
              // console.log(key);
              // console.log(val);

          }
         }

         
       
       //return ;
    };

    FundataShow(data){
        //console.log("FundataShow" , data);
        //var data = this.value;
        let arr = data.split("-");
        //console.log(arr);

        return arr[2] +'/'+ arr[1] +'/'+ arr[0];
        //alert(dia);
    };

    FunDiaSemana(data){
        //console.log("FunDiaSemana" + data);
        //var data = this.value;
        let arr = data.split("-");
        let teste = new Date(arr[0], arr[1] - 1, arr[2]);
        //var dia = teste.getDay()+1;
        //console.log(teste.getDay()+1);
        return teste.getDay()+1;
        //alert(dia);
    };
      
    FormDataPagChanger(data){
      //console.log("FormDataPagChanger");
      //console.log(data);
        //let dataOk  = subs
        let arr = data.split("/").reverse();
        //console.log(arr);
        let teste = new Date(arr[0], arr[1] - 1, arr[2]);
        //var dia = teste.getDay()+1;
        //console.log(teste.getDay()+1);
        this.MD.vencimentoMsql = arr[0] +"-"+ arr[1] +"-"+ arr[2];
        this.MD.diaNome  = this.DiasSemana[teste.getDay()+1];

    };

    /** move o cursor para o final do input
     * @param inptID id do input agular 
     */
    FumMovCusorOfEnd(inptID){
      //console.log("FumMovCusorOfEnd");
      //console.log(inptID);
      //console.log(value);
      if (inptID.setSelectionRange) {
          inptID.focus();
          inptID.setSelectionRange(inptID.value.length, inptID.value.length);
      } else if (inptID.createTextRange) {
          var range = inptID.createTextRange();
          range.collapse(true);
          range.moveEnd('character', inptID.value.length);
          //range.collapse();
          range.select();
      }
    };


    onSelectFormPg(e){
      //  console.log("onSelectFormPg");
      // console.log(e);
      // console.log("gisdsss");
      // console.log(this.ListFinancClinicaGridAll);
      // console.log("aaa");
      // console.log(this.ListFinancClinicaGrid);

      this.bTFiltarProssec = true;
      let ArrayFiltando =  Object.assign([], this.ListFinancClinicaGridAll );
      let newArray = [];

      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      

        let objSaldoAntero = this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.resMes;
        let objvaloresHoje = this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.resMesValHoje;
        let objvalores = this.contaCorrenteClinicaService.RESGetRelFinanceiroClinc.resMesVal;

        this.totailGridCredito = this.totailGridDebito = this.PosicaoCaixa = this.ValorSaldoHoje = this.ValorCreditoMesAteHoje = this.ValorParcelMesAteHoje = this.ValorCreditoMes = this.totalValorSaldo = this.totalValorDebito = this.totalValorCredito = 0; 
        let mesTotalCred  = 0;
        let mesTotalDebit = 0;
        if( (typeof objSaldoAntero !== 'undefined') && (objSaldoAntero !== null) ){
            mesTotalCred  = objSaldoAntero[0].credito == null ? 0 : objSaldoAntero[0].credito;
            mesTotalDebit = objSaldoAntero[0].parcela == null ? 0 : objSaldoAntero[0].parcela;
        }


      let a: number = 0.00;
      let b: number = 0.00;
      let ArrayPG = Object.assign([], this.ArrayFormaPag ) ;
      // console.log("loop ini");
      /** se for 0 e para exibir todas as formas de pagamento */
      if(e == 0){

          /** exibe todos os tipo de pagamento */
          ArrayFiltando.forEach(element => {
            //console.log(element.pg_form_fc_fpp);

              element.valor_credito = parseFloat(element.valor_credito == null ? 0 : element.valor_credito);
              element.valor_parcela = parseFloat(element.valor_parcela == null ? 0 : element.valor_parcela);
                
              a = a + element.valor_credito; 
              b = b + element.valor_parcela; 

              element.FormaPagName = ArrayPG[element.pg_form_fc_fpp];

              //newArray.push(element);
            
        });


      }else{

          /** filtra por um tipo de pagamento */
          ArrayFiltando.forEach(element => {
            //console.log(element.pg_form_fc_fpp);
            if(element.pg_form_fc_fpp == e){
              

              element.valor_credito = parseFloat(element.valor_credito == null ? 0 : element.valor_credito);
              element.valor_parcela = parseFloat(element.valor_parcela == null ? 0 : element.valor_parcela);
                
              a = a + element.valor_credito; 
              b = b + element.valor_parcela; 

              element.FormaPagName = ArrayPG[element.pg_form_fc_fpp];

              newArray.push(element);
            }
        });

        ArrayFiltando = newArray;

      }

      

      

      // console.log("loop fim");


      this.totailGridCredito = a;
      this.totailGridDebito  = b;

      this.SaldoAnterior = 0;
      this.SaldoAnterior = mesTotalDebit + mesTotalCred;

      let mesSelecionado = this.startDateMes;

      if(typeof this.model !== 'undefined'){
        mesSelecionado = this.model.date.month < 10 ? "0" + this.model.date.month : this.model.date.month;
        if(mesSelecionado !=  this.startDateMes){
          this.ShowBtsMesAtual = true;
        }
      }

      if( (typeof objvalores !== 'undefined') && (objvalores !== null ) ){ // O MES PODE NAO TER DADOS AINDA AI E NECESSARIO O IF SE NAO DA ERRO NA PG
        this.ValorParcelaMes = objvalores[0].parcela == null ? 0 : objvalores[0].parcela;
        this.ValorCreditoMes = objvalores[0].credito == null ? 0 : objvalores[0].credito; 
      } 
      if( (typeof objvaloresHoje !== 'undefined') && (objvaloresHoje !== null) ){ // O MES PODE NAO TER DADOS AINDA AI E NECESSARIO O IF SE NAO DA ERRO NA PG
        this.ValorParcelMesAteHoje  = objvaloresHoje[0].parcela == null ? 0 : objvaloresHoje[0].parcela;
        this.ValorCreditoMesAteHoje = objvaloresHoje[0].credito == null ? 0 : objvaloresHoje[0].credito; 
      }
      // console.log("estap 2 ");

      if(this.ValorCreditoMes > this.ValorParcelaMes){
        let u = parseFloat(this.ValorCreditoMes) - parseFloat(this.ValorParcelaMes);
        this.totalValorSaldo  = u + parseFloat(this.SaldoAnterior);
      }else{    
        let u  =  parseFloat(this.ValorParcelaMes) - parseFloat(this.ValorCreditoMes);
        this.totalValorSaldo  = ( u + parseFloat(this.SaldoAnterior) ) * -1 ;
      }

      if(this.ValorCreditoMesAteHoje > this.ValorParcelMesAteHoje){ 
            this.ValorSaldoHoje  = this.ValorCreditoMesAteHoje - this.ValorParcelMesAteHoje;
      }else{ 
        this.ValorSaldoHoje  =  ( this.ValorParcelMesAteHoje - this.ValorCreditoMesAteHoje ) * -1;
      }
      this.PosicaoCaixa = parseFloat(this.SaldoAnterior) + parseFloat(this.ValorSaldoHoje);
      if(mesTotalCred > mesTotalDebit){
            this.totalMESValorSaldo  = (this.ValorCreditoMes - this.ValorParcelaMes) + this.SaldoAnterior ;
      }

      // console.log("estap 3 ");
      // console.log("Antes array");
      // console.log(this.ListFinancClinicaGrid);
      // console.log(newArray);
      // console.log("depoissssssss");

      this.ListFinancClinicaGrid =  Object.assign([], ArrayFiltando );
      // console.log(this.ListFinancClinicaGrid);
      this.bTFiltarProssec = false;
      
      
      //this.MetValoresGrid(this.ListFinancClinicaGrid);




    };

    alertMe(MSG): void {
      setTimeout(function(): void {
        alert(MSG);
      });
    }

    /**
     * verifica se e null ou empety e retorna true caso for 
     * @param val object ou any 
     */
    isNullOrEmpety(val){
      // console.log("isNullOrEmpety");
      if(val == '' || val == null || val == ' ' ){
        return true;
      }
      return false;
    }


    // public print = (): void => {
    //   window.print();
    // }
    print(){

      /** Joga na sess o obj com os dados para imprimir */
      // let dados = this.ListFinancClinicaGrid;
      
      
      

      let arraylinha = [];    arraylinha.push('Data');  							
      let arrayGrup = [];     arraylinha.push('Grupo & Categoria	');
          arraylinha.push('Pac./Func.');
          arraylinha.push('Tratamento');
          arraylinha.push('Forma PG');
          arraylinha.push('Tipo');
          arraylinha.push('Histórico');
          arraylinha.push('Func. Lançou');
          arraylinha.push('Débito');
          arraylinha.push('Crédito');
      
      let i = 0;
      arrayGrup[i] = (arraylinha);
      i++;

      // console.log('linha', arrayGrup);

      this.ListFinancClinicaGrid.forEach(element => {
        // console.log(element);
        arraylinha = [];
        arraylinha.push(element.dataShow);
        arraylinha.push(element.nm_grupo_financeiro);
        arraylinha.push(element.nome_tp);
        arraylinha.push(element.data2);
        arraylinha.push(element.FormaPagName);
        arraylinha.push(element.nm_tipo_tratamento);
        arraylinha.push(element.historico);
        arraylinha.push(element.nm_prestador);
        arraylinha.push( parseFloat(element.valor_parcela).toFixed(2));
        arraylinha.push( parseFloat(element.valor_credito).toFixed(2));
        // arraylinha.push( element.valor_parcela);
        // arraylinha.push( element.valor_credito);

        arrayGrup[i] = arraylinha;
        i++;
      });


      // console.log(this.model);
      // console.log(this.model1);

     //Débito :    {{totailGridDebito  | formatCurrency }} </span> </div>
    // Crédito :   {{totailGridCredito | formatCurrency }}  </span> </div>


      let arraylinhaT = [];    
      let arrayGrupT = [];  
      arraylinhaT.push('TOTAIS');    
      arraylinhaT.push('Débito');
      arraylinhaT.push('Crédito');
      let y= 0;
      arrayGrupT[y] = (arraylinhaT); arraylinhaT=[];
      y++;
      let numd = this.totailGridDebito;
      let numc = this.totailGridCredito;
      arraylinhaT.push('');    
      arraylinhaT.push(parseFloat(numd).toFixed(2));
      arraylinhaT.push(parseFloat(numc).toFixed(2));
      arrayGrupT[y] = (arraylinhaT);


     

      let ImprimirPgConfig = {
        'Titulo'      : 'IMPRESSÃO DE CAIXA',
        'DataPg'      : 'Data Inicio: 05/07/2018 - Data Fim: 05/07/2018',
        'Unidade'     : this.SelectClinicaDados.nm_unidade_atendimento
      };

      let PgVoltar = {
        'url' : 'financ'
      }


      sessionStorage.removeItem('imprimirDados');
      sessionStorage.removeItem('imprimirDadosTotais');
      sessionStorage.removeItem('ImprimirPgConfig');
      sessionStorage.removeItem('PgVoltar');

      sessionStorage.setItem('imprimirDados' , JSON.stringify(arrayGrup));
      sessionStorage.setItem('imprimirDadosTotais' , JSON.stringify(arrayGrupT));
      sessionStorage.setItem('ImprimirPgConfig' , JSON.stringify(ImprimirPgConfig));
      sessionStorage.setItem('PgVoltar' , JSON.stringify(PgVoltar));
      // console.log(arrayGrup);
    
       this.router.navigate(['/Imprimir/ccc']);
    }



}


export class DemoModalStaticComponent {
 
}
