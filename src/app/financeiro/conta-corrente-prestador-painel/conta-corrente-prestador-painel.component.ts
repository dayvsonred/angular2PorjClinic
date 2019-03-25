import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { AuthService } from '../../auth/auth.service';
import { AllService } from '../../all.service';
 


@Component({
  selector: 'app-conta-corrente-prestador-painel',
  templateUrl: './conta-corrente-prestador-painel.component.html',
  styleUrls: ['./conta-corrente-prestador-painel.component.css']
})
export class ContaCorrentePrestadorPainelComponent implements OnInit {

  ListplanoContas = [ {label: '...', value: 0, item1: '', item2: ''}, ];


  /** Dias nomes */
  DiasSemana = [null, 'Dom', 'Seg','Ter','Qua','Qui','Sex','Sab'];
  DiasSemanaComplt = [null, 'Domingo', 'Segunda','Terça','Quarta','Quinta','Sexta','Sabado'];
  MesAnoComplt = [null, 'janeiro', 'Fevereiro','Março','Abril','Maio','Junho','Julho', 'Agosto','Setembro','Outubro','Novembro','Dezembro'];
  //** default locale for example br  IMyDpOptions mydatepicker */
  locale: string = 'pt-br';

  // Initialized to specific date (09.10.2018).
  public model : any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
  public model1: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
  

  /*** select 2 */
  multiple0 : boolean = false;
  multiple1 : boolean = true;
  options0  : Array<any> = [];
  selection : Array<string>;

 
  UnidadeNome               : any;
  ListUnidade               : any;
  ListPacientes             : any;
  UnidadeDados              : any;
  contasTipo                : string[];
  DrUnidade                 : any;
  startDateDia              : any;
  startDateMes              : any;
  startDateAno              : any;
  startDate                 : any;
  caregandoFinc             : boolean = false;
  SelectPrestadoKey         : any;
  SelectPrestadoNome        : any;
  ListFinancGrid            : any;
  ListFinancDTHGrid         : any;
  MD                        : any;
  ListFinancGridR           : any;
  startDateMesInt           : any;
  ValorAExtenso             : any;
  TotalEntrada              : any;
  TotalSaida                : any;
  TotalSaldo                : any;
  ListTatamentoMed          : any;
  GrupTratUnidade           : any;
  Process                   : boolean = false;
  extenso                   : string[];
  SelectTratameno           : any;
  LinhasDthShow             : any;
  FinanPagar                : string[];
  ExibirChkAll              : boolean = false;
  pagaAllCH                 : boolean = false;
  FormPag                   : any;
  SelectFormPag             : any;
  TotalSelecPagar           : any;
  TotalSelecPagarIn         : any;
  TotalSelecPagarRe         : any;
  TotalSelecPagaDebt        : any;
  total_indicacao           : any;  
  total_repeticao           : any;  
  TotalDebito               : any; 
  DivProssec                : boolean = false;
  ObjTblDthFinac            : any;  
  ListDTHA                  : any; 
  ListDTHB                  : any; 
  Tratment                  : any; 
  op                        : boolean = false;
  SelectItemTrat            : any; 
  MDDTHB                    : any; 
  ListDTHC                  : any; 
  TotalValCg                : any; 
  TotalValImp               : any; 
  TotalValOrt               : any; 
  TotalValPrt               : any; 
  TotalSaldFim              : any; 
  TotalPago                 : any; 
  ListDTH_valor_total       : any; 
  ListDTH_valor_pago        : any; 
  ListDTH_valor_a_pagar     : any; 
  ListDTH_taxa_forma_pag    : any; 
  ListDTH_tot_protetico     : any; 
  ListDTH_tot_protetico_pg  : any; 
  ListDTH_tot_protetico_apg : any; 
  showTBL                   : boolean = false;
  showTBL2                  : boolean = false;

  

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    todayBtnTxt     : 'Hoje',
    dateFormat      : 'dd/mm/yyyy',
    firstDayOfWeek  : 'su',
    sunHighlight    : true,
    inline          : false,
  };

  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  public openModal(template: TemplateRef<any>, classT?:any ) {
    //this.modalRef = this.modalService.show(template);
      if (!classT){  classT =  'md-Full';  }

    this.modalRef = this.modalService.show(template, {class: classT});
  }

  public openModal2(template: TemplateRef<any>, classT?:any ) {
    //this.modalRef = this.modalService.show(template);
      if (!classT){  classT =  'md-Full';  }
      classT = ' second  ModalSegundo ' + classT;

    this.modalRef2 = this.modalService.show(template, {class: classT});
  }

  public hiderModal(){
      this.modalRef.hide();
  }

  public hiderModal2(){
    this.modalRef2.hide();
    this.modalRef2 = null;
  }
  
  SelectClinicaDados  = {
    'chave'                  : ' ', 
    'unidade'                : ' ',  //mudae id nome obj para unidade - melhorar intendimento
    'nm_unidade_atendimento' : ' ', 
    'cd_unidade_atendimento' : ' ',
    'USERID'                 : ' ', // - ID solucoes ADM
    'PGnome'                 : 'Conta Corrente Clínica', // nome PG
    'BaseIndex'              : null,
    'DataHoje'               : null,
    'rotaAcao'               : 'ccpp',
    'chaveUsuario'           : null,
    'cd_filial'              : null,
  }; 

  


  constructor(private router: Router,private authService: AuthService,private AllService : AllService,private modalService: BsModalService ) {
      //this.options = new DatePickerOptions();
      console.log("version 3.30102018");
      //console.log(authService.RESUserValid );
      this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
      this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
      this.SelectClinicaDados.chaveUsuario = this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
      this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
      this.SelectClinicaDados.BaseIndex = this.AllService.URLIndex;


      //DATA ATUAL
       this.startDate = new Date;
       this.startDateDia = this.startDate.getDate() < 10 ? '0' + this.startDate.getDate() : this.startDate.getDate();
       this.startDateMesInt = parseInt(this.startDate.getMonth())+1;
       this.startDateMes = (parseInt(this.startDate.getMonth())+1) < 10 ? '0' + (parseInt(this.startDate.getMonth())+1)  : (parseInt(this.startDate.getMonth())+1);
       this.startDateAno = this.startDate.getFullYear();
      //  console.log("Hoje é " + this.startDate.getDay() + ", " + this.startDate.getDate() + " de " + (parseInt(this.startDate.getMonth()) + 1) + " de " + this.startDate.getFullYear() );
       this.SelectClinicaDados.DataHoje =  this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia; // data hoje
       console.log(this.SelectClinicaDados.DataHoje);
  } 

  ngOnInit(){
    // this.AllService.PostUrl(NewObj,'DrAgMarcada').subscribe( res => { this.ValidandoAgAlterar(res); });
    // console.log("V B.01");

    this.SelectPrestadoKey    =  null;
    this.SelectPrestadoNome   =  '';
    this.ListFinancGrid       =  [];
    this.ListFinancDTHGrid    =  [];
    this.ListFinancGridR      =  [];
    this.FinanPagar      =  [];
    this.MD = {};
    this.ListTatamentoMed = [];
    this.ValorAExtenso    =  null;
    this.TotalEntrada     = 0;
    this.TotalSaida       = 0;
    this.TotalSaldo = 0;
    this.GrupTratUnidade  = null;
    this.SelectTratameno  = null;
    this.LinhasDthShow    = [];
    this.ExibirChkAll = false;
    this.pagaAllCH = false;
    this.SelectFormPag = null;
    this.TotalSelecPagar = 0;
    this.TotalSelecPagarIn  = 0;
    this.TotalSelecPagarRe = 0;
    this.total_indicacao = 0;
    this.total_repeticao = 0;
    this.TotalDebito = 0;
    this.TotalSelecPagaDebt = 0;
    this.DivProssec = false;
    this.ObjTblDthFinac = {};
    this.ListDTHA = [];
    this.ListDTHB = [];
    this.Tratment = null;
    this.op = false;
    this.SelectItemTrat = {};
    this.MDDTHB = {};
    this.ListDTHC = [];
    this.TotalValCg  = 0;
    this.TotalValImp = 0;
    this.TotalValOrt = 0;
    this.TotalValPrt = 0;
    this.TotalSaldFim = 0;
    this.TotalPago   =0;
    
    
 


    this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
    // this.contaCorrenteClinicaService.GetAllTratamentos().subscribe(contasTipo=>this.contasTipo=contasTipo );
    this.AllService.PostUrl(null,'TiposTratamento').subscribe( res => this.contasTipo = res );

    this.UnidadeDados = {};
    this.AllService.PostUrl(this.SelectClinicaDados,'GetUnidadeDados').subscribe(res=> {this.UnidadeDados=res[0]; this.SelectClinicaDados.cd_unidade_atendimento = res[0].cd_unidade_atendimento; this.OnIniB(); console.log(res); } );

    let dadosUnid = {
      'chaveUsuario'  : this.SelectClinicaDados.USERID,
    }

    if( typeof this.ListUnidade === 'undefined' ){
      this.AllService.PostUrl(dadosUnid,'GetSelcUnidadeB').subscribe( res=>this.ListUnidade=res);
    }
    this.DrUnidade = [];
    this.AllService.GetUrl(this.SelectClinicaDados.unidade,'DrDaUnidade').subscribe(res=>this.DrUnidade=res);

    /* DATA AUTOMATICA PREENCHIDA */
    let diaEscolhido = this.SelectClinicaDados.DataHoje.split("-");
    let diaUm = '01';

    this.model = { date: { year: diaEscolhido[0], month: parseInt(diaEscolhido[1]) , day: parseInt(diaUm) },
        formatted : diaUm+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[0],
        jsdate : new Date(diaEscolhido[0],parseInt(diaEscolhido[1])-1,parseInt(diaUm) )
    };
  
    this.model1 = { date: { year: diaEscolhido[0], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[2]) },
        formatted : diaEscolhido[2]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[0],
        jsdate : new Date(diaEscolhido[0],parseInt(diaEscolhido[1])-1,diaEscolhido[2])
    };

  
    this.AllService.PostUrl(this.SelectClinicaDados,'FinacPrestTpPag').subscribe(res=>this.FormPag=res);

    // console.log(this.model);
    // console.log(this.model1);
  }

  OnIniB(){
    this.AllService.PostUrl(this.SelectClinicaDados,'GrupoTratUND').subscribe(res=>this.GrupTratUnidade=res);
  }




  BuscarFinaceiro(){

    
    // console.log(this.GrupTratUnidade);
    this.FinanPagar      =  [];
    this.ExibirChkAll = false;
    this.pagaAllCH = false;
    this.SelectFormPag = null;
    this.TotalSelecPagar = 0;
    this.total_indicacao = 0;
    this.total_repeticao = 0;
    this.TotalSelecPagarIn  = 0;
    this.TotalSelecPagarRe = 0;
    this.TotalDebito = 0;
    this.DivProssec = true;
    this.op = false;
    this.SelectItemTrat = {};
    this.TotalValCg  = 0;
    this.TotalValImp = 0;
    this.TotalValOrt = 0;
    this.TotalValPrt = 0;
    this.TotalSaldFim = 0;
    this.TotalPago   = 0;
 

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'GrupTratUnidade'         : this.GrupTratUnidade.cd_grupo_tratamento,
      'tipo_tratamento'         : this.SelectTratameno, 
      'acaoBD'                  : 'v',
    };

    // console.log(dados); 
    this.AllService.PostUrl(dados,'FinacPrestPNLPROD')
    .subscribe(res => { /*this.ListFinancGrid=res;*/ this.SomaTotais(res);   }, 
    err =>  this.erroBuscarFinaceiro() );
  }

  erroBuscarFinaceiro(){
    let msg = 'Aconteceu um erro codigo: ccppc298';
    this.DivProssec = false;
    this.ListFinancGrid = [];
    this.AllService.AlertError(msg);
  }

  SomaTotais(OBJ){
    // console.log('SomaTotais');
    // console.log(OBJ);

      // let somaValor_credito = 0;
      // let somaValor_parcela = 0;
      // this.TotalEntrada   = 0;
      // this.TotalSaida     = 0;
      // this.TotalSaldo = 0;


      let soma_valor_credito= 0, totalPago = 0 ,valor_debito= 0, somapro = 0 ,somacg = 0, somaorto = 0, somaimplante = 0, somaprotese = 0, checkExist = 0, total_indicacao = 0, total_repeticao = 0 ;
      let addCHKB;
      let txtSituacao;
      let valor_comissao;
      let faltam;
      let historico;
      let preferencia;
      let valor_credito;
      this.LinhasDthShow = [];
      
      
      OBJ.forEach(element => {

        element.valor_parcela = element.valor_parcela == null ? 0 : parseFloat(element.valor_parcela);  
        element.valor_credito = element.valor_credito == null ? 0 : parseFloat(element.valor_credito);


        // console.log(element );
        soma_valor_credito = soma_valor_credito + element.valor_credito ;
        valor_credito = element.valor_credito - (element.valor_credito);
        valor_debito = valor_debito + parseFloat(element.valor_debito);
        // console.log(element.tipo_convenio );
        if(element.tipo_convenio != 'O' || (element.tipo_convenio == 'O' && ((element.chave_financeiro_convenio && element.cd_financeiro_clinica) || element.conv_dentalvidas_100_perc == 'S'))){

            addCHKB = false;
            element.pagoSituacao = null;
            if(element.efetivado != 'S'){
                  if(element.boleto == 'S'){
                        if(element.situacao_op == 'NP'){
                            faltam = 0;
                            valor_comissao = element.valor_credito_pg ? element.valor_credito_pg : 0.00;
                            faltam = element.valor_credito - element.valor_comissao;
                            //$faltam = number_format($faltam,2,',','');
                            txtSituacao = "Faltam <br /> R$"+ faltam ;
                        }else{
                            //echo '<input type="checkbox" name="pagar[]" value="'.$res['chave'].'|S|'.$res['cd_intervencao'].'" onclick="mudar_cor_chk(this)" class="check"/>';
                            //form_input_hidden($res['chave'],($res['valor_credito'] - $res['valor_debito']));
                            addCHKB = true;
                            txtSituacao = 1;
                            element.pagoSituacao = 'S';
                            checkExist++;
                        }
                  }else{
                      if(element.tipo_comissao == 'P' && !element.cd_parcela_destino && element.cd_parcela_destino > 0){
                          txtSituacao = "Não caiu no caixa";
                      }else{
                          ///echo '<input type="checkbox" name="pagar[]" value="'.$res['chave'].'|N|'.$res['cd_intervencao'].'" onclick="mudar_cor_chk(this)" class="check"/>';
                          //form_input_hidden($res['chave'],($valor_credito - $res['valor_debito']));   
                          addCHKB = true;
                          txtSituacao = 1;
                          element.pagoSituacao = 'N';
                          checkExist++;
                      }
                  }
            }else{
                // echo 'PAGO';
                 totalPago += element.valor_credito - parseFloat(element.valor_debito);
                txtSituacao = 'PAGO';
            }
            element.txtSituacao = txtSituacao; 

            element.CHKTRUE = false;
            // console.log(element.txtSituacao);
            // console.log(addCHKB);
            // console.log(element.dtfinalizacao );/****2 */
            element.dtfinalizacaoSHW = this.AllService.DatMysqForDatBr(element.dtfinalizacao);
            // console.log(element.dt_baixa );



          element.preferencia = element.boleto == 'S' ? "Nota Promissória" : "Cheque / Cartão";
          historico = "<strong>Pac.: </strong>"+element.nm_paciente+" "+element.sobrenome+"<br>"+
                        "<strong>Preferencia Pac.: </strong>"+element.preferencia+" <br>"+
                        "<strong>Trat.: </strong>"+element.tratamento+"<br>"+
                        "<strong>Inter.: </strong>"+element.nm_intervencao+ "("+element.regiao+")<br>"+
                        "<strong>Histórico: </strong>"+element.historico;
          element.historicoShow = historico;
          // console.log(element.historicoShow );
          element.tipo_comissaoShow = element.tipo_comissao == 'P' || element.boleto == 'S' || element.tipo_convenio == 'C' ? 'Parcelado '+ element.num_parcela  : 'Intervenção';
          // console.log(tipo_comissao );

          // console.log(element.vlintervencao );
          // console.log(element.abatimentos );
          // console.log(element.taxa_forma_pagamento_valor );
          // console.log(element.comissao );
          // console.log(element.valor_parcela );
          // console.log(element.valor_credito );


          total_indicacao = element.tcomissao == 'I' /*&& $res['efetivado'] != 'S'*/ ? total_indicacao + parseFloat(element.valor_credito) : total_indicacao;
          total_repeticao = element.tcomissao == 'R' /*&& $res['efetivado'] != 'S'*/ ? total_repeticao + parseFloat(element.valor_credito) : total_repeticao;
          
 

          

          somapro = somapro - parseFloat(element.valor_parcela); + parseFloat(element.valor_credito);
          if(element.tipo_tratamento == 'L00000020110727232127'){
              somacg = somacg - parseFloat(element.valor_parcela) + parseFloat(element.valor_credito);
          }else if(element.tipo_tratamento == 'L00000020110727232144'){
              somaorto = somaorto - parseFloat(element.valor_parcela) + parseFloat(element.valor_credito);
          }else if(element.tipo_tratamento == 'L00000020110727232200'){
              somaimplante = somaimplante - parseFloat(element.valor_parcela) + parseFloat(element.valor_credito);
          }else if(element.tipo_tratamento == 'L00000020110727232214'){
              somaprotese = somaprotese - parseFloat(element.valor_parcela) + parseFloat(element.valor_credito);
          }
          
        
          // console.log('------------------------------------------------------');
          // console.log(somapro);
          // console.log(somacg);
          // console.log(somaorto);
          // console.log(somaimplante);
          // console.log(somaprotese);
          // console.log('------------------------------------------------------');
        
        }

        if(checkExist>0){
          this.ExibirChkAll = true;
        }
        


      });


      this.ListFinancGrid=OBJ;
      
      this.TotalDebito = valor_debito;
      this.total_indicacao = total_indicacao;
      this.total_repeticao = total_repeticao;


      this.TotalValCg  = somacg;
      this.TotalValImp = somaimplante;
      this.TotalValOrt = somaorto;
      this.TotalValPrt = somaprotese;
      this.TotalPago   = totalPago;


      this.DivProssec = false;

      // this.TotalEntrada   = somaValor_credito;
      // this.TotalSaida     = somaValor_parcela;
      // this.TotalSaldo     = somaValor_credito - somaValor_parcela;
      // console.log(valor_debito);
      // console.log(this.TotalDebito);
      // console.log(this.total_indicacao);
      // console.log(this.total_repeticao);
      // console.log(soma_valor_credito);
      

      this.TotalSaldFim = soma_valor_credito + this.total_indicacao +  this.total_repeticao -  valor_debito;
      // console.log(this.TotalSaldFim,'TotalSaldFim');




  }


  pagarParcelaAdd(i){
    // console.log('pagarParcelaAdd');
    // console.log(i);


    if(!this.FinanPagar.includes(i)){
      // console.log("add");
      this.FinanPagar.push(i);
    }else{
      let index = this.FinanPagar.indexOf(i, 0);
      if(index > -1) {
        this.FinanPagar.splice(index, 1);
      }
    }

    // console.log(this.FinanPagar);



  }

  pagarAllCH(){
    // console.log('pagarAllCH');
    // console.log(this.pagaAllCH);
    // if(this.pagaAllCH)
    this.FinanPagar = [];

    let index = 0;
    this.ListFinancGrid.forEach(element => {
        
        if(element.txtSituacao == 1){
          // console.log(element);
          this.ListFinancGrid[index].CHKTRUE = this.pagaAllCH;
          if(this.pagaAllCH){
            this.FinanPagar.push(this.ListFinancGrid[index].chave);
          }
          
        }

        index++;
    });

   
    // console.log(this.FinanPagar);
  }


  addShwDthl(i){
    // console.log("addShwDthl",i);
    // console.log(this.LinhasDthShow);
    if(!this.LinhasDthShow.includes(i)){
      // console.log("add");
      this.LinhasDthShow.push(i);
    }else{
      let index = this.LinhasDthShow.indexOf(i, 0);
      if(index > -1) {
        this.LinhasDthShow.splice(index, 1);
      }
    }
  }

  ShwDthl(i){
    // console.log("ShwDthl",i);
    // console.log(!this.LinhasDthShow.includes(i));
    return !this.LinhasDthShow.includes(i);
  }



  onPrestadoUnidad(i){

    // console.log("onSelectUnidade");
    // console.log(i);

    this.SelectPrestadoKey    = i.value;
    this.SelectPrestadoNome   = i.label;

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'acaoBD'                  : 'v',
      'tipo_tratamento'         : this.SelectTratameno,
      'medico'                  : this.SelectPrestadoKey,
      'filial'                  : this.SelectClinicaDados.cd_unidade_atendimento
    }

    // console.log(dados);
    this.ListTatamentoMed = [];
    this.AllService.PostUrl(dados,'TratamentosMedicoAll')
    .subscribe(res => { this.ListTatamentoMed=res;   },
    err =>  this.erroTratamentosMed() );
  }
  erroTratamentosMed(){
    let msg = 'Aconteceu um erro codigo: ccppc561';
    this.ListTatamentoMed = [];
    this.AllService.AlertError(msg);
  }

  onSelectUnidade(item){
    // console.log("onSelectUnidade");
    // console.log(item);

    this.SelectClinicaDados.chave = item.value;
    this.SelectClinicaDados.unidade = item.value;
    this.SelectClinicaDados.nm_unidade_atendimento = item.label;
    this.SelectClinicaDados.cd_unidade_atendimento = item.cd_unidade_atendimento;
    

    this.ngOnInit();
  }
  
  onTratamentoUnidad(i){
    // console.log("onTratamentoUnidad");
    // console.log(i);
    // console.log(this.GrupTratUnidade);

    this.SelectTratameno = i.value;

  }


  CloseTratamentoUnidad(){
    this.SelectTratameno = null;
  }



  onSelectFormPag(i){
    // console.log("onSelectFormPag");
    // console.log(i);


    this.SelectFormPag = i.value;

  }


  



  detalhesFinac(MODAL,OBJ){
    // console.log('detalhesFinac');
    // console.log(OBJ);
    console.log('chave', OBJ.chave);
    console.log('chave_tratamento', OBJ.chave_tratamento);
    console.log('chave_financeiro_convenio',OBJ.chave_financeiro_convenio);


    this.ListDTH_valor_total = 0;
    this.ListDTH_valor_pago = 0;
    this.ListDTH_valor_a_pagar = 0;
    this.ListDTH_taxa_forma_pag = 0;
    this.ListDTH_tot_protetico = 0;
    this.ListDTH_tot_protetico_pg = 0;
    this.ListDTH_tot_protetico_apg = 0 ;

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'Select'                  : OBJ,
      'chave'                   : OBJ.chave,
      'acaoBD'                  : 'v'
    };

    this.SelectItemTrat = OBJ;

    this.AllService.PostUrl(dados,'FinacPrestDTHParc').subscribe(  res=> { this.ObjTblDthFinac=res; this.GeraTblFinacDTH();  }, err =>  this.erroFinacPrestDTHParc() );
    this.showTBL = false;
    this.openModal(MODAL);
    // this.Prototypeextenso();
  }
  erroFinacPrestDTHParc(){
    let msg = 'Aconteceu um erro codigo: ccppc633';
    this.ObjTblDthFinac = {};
    this.AllService.AlertError(msg);
  }
  

  GeraTblFinacDTH(){
    // console.log('GeraTblFinacDTH');
    // console.log(this.ObjTblDthFinac);
    this.ListDTHA = [];
    this.ListDTHB = [];
    this.showTBL = false;
    /*** PRIMEIRA TBL */
    let tabl1 = this.ObjTblDthFinac.SQ2;
    let tabl2 = this.ObjTblDthFinac.SQPT;
    this.op = this.ObjTblDthFinac.op;
    let chavsVals = this.ObjTblDthFinac.SQPTVal;
    let valor_total = 0, valor_a_pagar = 0, valor_pago = 0, tot_protetico = 0, tot_protetico_pg = 0;

    

    

    


    // console.log(this.op);
    // console.log(tabl1);
    tabl1.forEach(element => {
      // console.log(element.efetivado );
      element.efetivadoShow = element.efetivado == 'S' ? 'Sim' : 'Não';
      element.valor_base  = 0;
      element.vlprotetico = 0;
      tot_protetico = tot_protetico + parseFloat(element.valor_protetico);
      element.taxa_cartao = (parseFloat(element.receber_paciente) - parseFloat(element.valor_protetico)) * parseFloat(element.taxa_forma_pagamento_valor)  / 100;
    });


    tabl2.forEach(element => {
      // console.log(element);
      // element.cor = element.debito_efetivado != 'S' ? true : false;
      // element.debito_efetivadoShow = element.debito_efetivado == 'S' ? 'Sim' : 'Não';

      //calcula valor total tratamento
      valor_total = valor_total + parseFloat(element.valor_parcela);

      if(element.debito_efetivado == 'S'){
          valor_pago = valor_pago + parseFloat(element.valor_parcela);
          element.cor = false;
          element.debito_efetivadoShow =  'Sim' ;
      }
      //calcula valor a pagar
      if(element.debito_efetivado == 'N'){
          valor_a_pagar = valor_a_pagar + parseFloat(element.valor_parcela);
          element.cor =  true ;
          element.debito_efetivadoShow =   'Não';
      }

      if(this.op){
        chavsVals.forEach(elementVal => {
          if(element.chave_parcela_financeiro == elementVal.cd_parcela_financeiro  ){

            element.valor_base  = parseFloat(elementVal.valor_base);
            element.vlprotetico  = parseFloat(elementVal.vlprotetico);

            if(element.debito_efetivado == 'S'){
              tot_protetico_pg = tot_protetico_pg + parseFloat(elementVal.vlprotetico);
            }
          }
        });
      }
    });


    this.ListDTHA = tabl1;
    this.ListDTHB = tabl2;

 
    this.ListDTH_valor_total = valor_total;
    this.ListDTH_valor_pago = valor_pago;
    this.ListDTH_valor_a_pagar = valor_a_pagar;
    // console.log(this.ListDTH_valor_total);
    // console.log(this.ListDTH_valor_pago);
    // console.log(this.ListDTH_valor_a_pagar);
    

    this.ListDTH_taxa_forma_pag = parseFloat(this.ObjTblDthFinac.SQ.taxa_forma_pagamento);
    // console.log(this.ListDTH_taxa_forma_pag);

    
    //  $tot_protetico 
    this.ListDTH_tot_protetico = tot_protetico;
    //  $tot_protetico_pg
    this.ListDTH_tot_protetico_pg = tot_protetico_pg;
    // Total protético a pagar
    this.ListDTH_tot_protetico_apg = tot_protetico - tot_protetico_pg ;
    // console.log(this.ListDTH_tot_protetico);
    // console.log(this.ListDTH_tot_protetico_pg);
    // console.log(this.ListDTH_tot_protetico_apg);
    
    

    // console.log(tabl1);
    // console.log(tabl2);
    this.showTBL = true;
  }


  GetDTHLCorSt(i){
    // console.log(i.situacao);
    let r = {};
    r = { 'corR' : true };

    if(i.situacao == 'R'){
      r = { 'corR' : true }
    }else if(i.situacao == 'P'){
      r = { 'corP': true }
    }else if(i.situacao == 'O'){
      r = { 'corO': true }
    }

    return  r;
  }


  OpenSegundoModal(OBJ,MODAL,i){
    // console.log('OpenSegundoModal');
    // console.log(OBJ);
    // console.log(this.op);
    // console.log(i);
    if( i == false ){
      if( this.op != true ){
          return false;
      }
    } 

    this.showTBL2 = false;
    this.openModal2(MODAL, 'modal-lg');
    this.MDDTHB = {};
    this.MDDTHB = OBJ;
    this.ListDTHC = [];
    // this.MDDTHB.titulo =  OBJ.nm_intervencao;


    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'Select'                  : OBJ,
      'chave'                   : OBJ.chave_int,
      'acaoBD'                  : 'v'
    };


    if(i){
      dados.chave = OBJ.chave_int;
      this.AllService.PostUrl(dados,'FinacDTHParComi').subscribe(  res=> {    this.ListDTHC = res; this.GeraListaDhComii(res);    }, err =>  this.erroFinacDTHParComi() );
    }else{
      dados.chave = OBJ.chave_parcela_financeiro; 
      this.AllService.PostUrl(dados,'FinacDTHParP').subscribe(  res=> {    this.ListDTHC = res; this.GeraListaDhParc(res);    }, err =>  this.erroFinacDTHParP() );
    }
    
 
  }
  erroFinacDTHParComi(){
    let msg = 'Aconteceu um erro codigo: ccppc745';
    this.hiderModal2();
    this.ListDTHC = [];
    this.AllService.AlertError(msg);
  }


  erroFinacDTHParP(){
    let msg = 'Aconteceu um erro codigo: ccppc753';
    this.hiderModal2();
    this.ListDTHC = [];
    this.AllService.AlertError(msg);
  }
  



  GeraListaDhComii(OBJ){

    this.MDDTHB.tot_comissao = 0;
    this.MDDTHB.tot_vl_base = 0;
    this.MDDTHB.tot_protetico = 0;
    
    

    OBJ.forEach(element => {
      let com =  element.comissao == null ? 0 : element.comissao ;
      let vcom =  element.valor_comissao == null ? 0 : parseFloat(element.valor_comissao) ;
      let tpcom =  element.tot_protetico == null ? 0 : parseFloat(element.tot_protetico) ;
      // console.log(com);
      // console.log(vcom);

      this.MDDTHB.tot_comissao =  this.MDDTHB.tot_comissao + vcom ;
      this.MDDTHB.tot_vl_base  =  this.MDDTHB.tot_vl_base  +  parseFloat(element.valor_base);
      this.MDDTHB.tot_protetico = this.MDDTHB.tot_protetico + tpcom;

      this.MDDTHB.comissaoT = com;
    });

    this.showTBL2 = true;

    // this.MDDTHB.comissaoT = (this.MDDTHB.tot_comissao / this.MDDTHB.tot_vl_base) * 100; 

  }

  
  GeraListaDhParc(OBJ){
    // console.log("GeraListaDhParc");
    this.MDDTHB.tot_comissao = 0;
    this.MDDTHB.tot_vl_base = 0;
    this.MDDTHB.tot_protetico = 0;

    

    OBJ.forEach(element => {
      let com =  element.comissao == null ? 0 : element.comissao ;
      let vcom =  element.valor_comissao == null ? 0 : parseFloat(element.valor_comissao) ;
      let vprot =  element.vlprotetico == null ? 0 : parseFloat(element.vlprotetico) ;
      // console.log(com);
      // console.log(vprot);

      this.MDDTHB.tot_comissao =  this.MDDTHB.tot_comissao + vcom ;
      this.MDDTHB.tot_vl_base  =  this.MDDTHB.tot_vl_base  +  parseFloat(element.valor_base);
      this.MDDTHB.tot_protetico = this.MDDTHB.tot_protetico + vprot;
      // console.log(this.MDDTHB.tot_protetico);

      // this.MDDTHB.comissaoT = com;
    });

    this.MDDTHB.comissaoT =  (this.MDDTHB.tot_comissao / this.MDDTHB.tot_vl_base) * 100 ;
    this.MDDTHB.comissaoT = parseFloat (this.MDDTHB.comissaoT).toFixed(2);


    this.showTBL2 = true;

    // console.log("------------------------");
    // console.log(this.MDDTHB);
  }


  ReciboFinac(MODAL,OBJ){

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'Select'                  : OBJ,
      'acaoBD'                  : 'v'
    };
    this.AllService.PostUrl(dados,'FinacPrestDTHRecibo').subscribe(res => { this.ListFinancGridR=res; this.RangerDataBuasca(res);   });
                                                        
    this.MD = {};
    this.MD.valor_credito = OBJ.valor_credito;
    this.MD.Stringextenso = this.Stringextenso(OBJ.valor_credito);
    

    this.openModal(MODAL,'modal-lg');
    this.Prototypeextenso();


  }

  RangerDataBuasca(obj){
    // console.log('RangerDataBuasca');
    // console.log(obj);

    let ReciboDTFim = '';
    let ReciboDTIni = '';
    obj.forEach(element => {

      if( ReciboDTIni == ''){
        ReciboDTIni = element.dt_realizacao;
      }

      ReciboDTFim = element.dt_realizacao;
    });

    this.MD.ReciboDTFim  = ReciboDTFim;       
    this.MD.ReciboDTIni  = ReciboDTIni;


  }



  Pagar(MODAL){
    // console.log("Pagar");
    this.openModal(MODAL,'modal-lg');
    // console.log(this.FinanPagar);
    this.TotalSelecPagar = 0;
    this.TotalSelecPagarIn  = 0;
    this.TotalSelecPagarRe = 0;
    this.TotalSelecPagaDebt = 0;
    let index = 0; let somaCredito = 0, total_indicacao = 0, total_repeticao = 0, totalDebts = 0; 
    this.ListFinancGrid.forEach(element => {
        
      if(this.FinanPagar.includes(element.chave)){
        // console.log(this.ListFinancGrid[index].chave);
        somaCredito = somaCredito + parseFloat(this.ListFinancGrid[index].valor_credito);
        total_indicacao = this.ListFinancGrid[index].tcomissao == 'I' /*&& $res['efetivado'] != 'S'*/ ? total_indicacao + parseFloat(this.ListFinancGrid[index].valor_credito) : total_indicacao;
        total_repeticao = this.ListFinancGrid[index].tcomissao == 'R' /*&& $res['efetivado'] != 'S'*/ ? total_repeticao + parseFloat(this.ListFinancGrid[index].valor_credito) : total_repeticao;
        totalDebts = totalDebts + parseFloat(this.ListFinancGrid[index].valor_debito);
      }
      
      index++;
    });

    this.TotalSelecPagar = somaCredito;
    this.TotalSelecPagarIn  = total_indicacao;
    this.TotalSelecPagarRe = total_repeticao;
    this.TotalSelecPagaDebt = totalDebts;
    // console.log(somaCredito);
    // console.log(total_indicacao);
    // console.log(total_repeticao);


  }

  PagaExe(){
    // console.log('PagaExe');
 
    this.hiderModal(); // esconde modal });


    // console.log(this.SelectFormPag);
    // console.log(this.FinanPagar);
    // console.log(this.FinanPagar.length);
    // console.log(this.FinanPagar.length < 0 );


    if( this.SelectFormPag == null || this.SelectFormPag == '' ){
        alert("Selecione a forma de pagamento!");

      return false;
    }

    if( this.FinanPagar.length <= 0 || this.FinanPagar == null ){
        alert("Selecione a parcela para confirmar pagamento!");

      return false;
    }
 

    let index = 0;  let pagarArray = [];
    this.ListFinancGrid.forEach(element => {
        
      if(this.FinanPagar.includes(element.chave)){
        // console.log(this.ListFinancGrid[index].chave);
        pagarArray.push(this.ListFinancGrid[index]);
      }
      
      index++;
    });


    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'GrupTratUnidade'         : this.GrupTratUnidade.cd_grupo_tratamento,
      'tipo_tratamento'         : this.SelectTratameno, 
      'acaoBD'                  : 'v',
      'pagar'                   : pagarArray,
      'tipo_pagamento'          : this.SelectFormPag,
    };

    // console.log(dados);
    
    this.AllService.PostUrl(dados,'FinacPrestPag').subscribe(res => { this.BuscarFinaceiro();  }, err =>  this.erroFinacPrestPag() );

  }
  erroFinacPrestPag(){
    let msg = 'Aconteceu um erro codigo: ccppc958';
    // this.a  = [];
    this.AllService.AlertError(msg);
 
  }

  CancelarBaixaCinfirma(OBJ,MODAL,i){
    // console.log('CancelarBaixa');
    // console.log(OBJ);
    this.MD  = {};
    this.MD = OBJ;
    this.MD.i = i;
    this.openModal(MODAL,'modal-lg');
  }
  
  CancelarBaixa(OBJ){
    // console.log('CancelarBaixa');
    // console.log(OBJ);
    
    this.DivProssec = true;

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'GrupTratUnidade'         : this.GrupTratUnidade.cd_grupo_tratamento,
      'tipo_tratamento'         : this.SelectTratameno, 
      'acaoBD'                  : 'v',
      'ChaveSelect'             : OBJ.chave
 
    };

    // console.log(dados);
    
    this.AllService.PostUrl(dados,'FinacPrestCalBX').subscribe(res => { this.BuscarFinaceiro(); }, err =>  this.erroFinacPrestCalBX()  );

  } 
  erroFinacPrestCalBX(){
    let msg = 'Aconteceu um erro codigo: ccppc999';
    this.DivProssec = false;
    // this.a  = [];
    this.AllService.AlertError(msg);

  }



  /** converte valor em string */
  RemocePontoStr(str){

      let l = str+"";
      let k = '';
    for(let i=0;i<l.length;i++){
      // console.log(l[i], i, l.length);
      // l[i] = l[i] == express ? "" : l[i]; 
      if(l[i] != '.'){
        k=k+""+l[i];
      }
    }
    // console.log(k);
    return k;
  }



  
Stringextenso(c){
  // console.log('Stringextenso');
  // console.log(c);
  // c = c.toString().replace('.', '' );


  // console.log(c);
  // console.log(this.RemocePontoStr(c));
  // console.log(this.Prototypeextenso('201210'));
  // return this.Prototypeextenso(c);
  this.Prototypeextenso();
};
      


  Imprimir(){
    // console.log("Imprimir");

    this.hiderModal(); 


    sessionStorage.removeItem('BoletoPrestador');

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'OBJ'                     : this.ListFinancGridR,
      'OBJ2'                    : this.ListFinancGrid,
      'valor_credito'           : this.MD.valor_credito,
      'valor_Extenso'           : this.ValorAExtenso,
      'data_Ini_Ex'             : this.MD.ReciboDTIni,
      'data_Fim_Ex'             : this.MD.ReciboDTFim,
      'nmPestador'              : this.SelectPrestadoNome,
    };

    sessionStorage.setItem('BoletoPrestador' , JSON.stringify(dados));



    this.router.navigate(['/financPrestadorImp']);
  }

  Prototypeextenso(){
    /**** buscar valor rota php AAAAAAAAAAAAAAAAAAAA */

    this.ValorAExtenso    =  '.........';

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'OBJ'                     : this.ListFinancGridR,
      'OBJ2'                    : this.ListFinancGrid,
      'valor_credito'           : this.MD.valor_credito,
    };

    this.AllService.PostUrl(dados,'FinacPrestReciboExt').subscribe(res=>this.ValorAExtenso=res);

    
  };


  show(OBJ){
    // console.log(OBJ);
  }


}
