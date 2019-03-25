import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { AuthService } from '../../auth/auth.service';
import { AllService } from '../../all.service';


@Component({
  selector: 'app-conta-corrente-prestador-recibo',
  templateUrl: './conta-corrente-prestador-recibo.component.html',
  styleUrls: ['./conta-corrente-prestador-recibo.component.css']
})
export class ContaCorrentePrestadorReciboComponent implements OnInit {

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

  aaa                 : any;
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



  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    todayBtnTxt     : 'Hoje',
    dateFormat      : 'dd/mm/yyyy',
    firstDayOfWeek  : 'su',
    sunHighlight    : true,
    inline          : false,
  };

  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>, classT?:any ) {
    //this.modalRef = this.modalService.show(template);
      if (!classT){  classT =  'md-Full';  }

    this.modalRef = this.modalService.show(template, {class: classT});
  }

  public hiderModal(){
      this.modalRef.hide();
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
    'rotaAcao'               : 'ag2',
    'chaveUsuario'           : null,
    'cd_filial'              : null,
  }; 

  


  constructor(private router: Router,private authService: AuthService,private AllService : AllService,private modalService: BsModalService ) {
      //this.options = new DatePickerOptions();
      console.log("version beta 1.20180814");
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
    this.ListFinancDTHGrid       =  [];
    this.ListFinancGridR       =  [];
    this.MD       = {};
    
    

    this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
    // this.contaCorrenteClinicaService.GetAllTratamentos().subscribe(contasTipo=>this.contasTipo=contasTipo );
    this.AllService.PostUrl(null,'TiposTratamento').subscribe( res => this.contasTipo = res );

    this.UnidadeDados = {};
    this.AllService.PostUrl(this.SelectClinicaDados,'GetUnidadeDados').subscribe(res=>this.UnidadeDados=res[0] );

    let dadosUnid = {
      'chaveUsuario'  : this.SelectClinicaDados.USERID,
    }

    if( typeof this.ListUnidade === 'undefined' ){
      this.AllService.PostUrl(dadosUnid,'GetSelcUnidadeB').subscribe(res=>this.ListUnidade=res);
    }

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


    this.dadosImprimir();

  }


  dadosImprimir(){
    console.log('dadosImprimir');
    let config = JSON.parse(sessionStorage.getItem('BoletoPrestador'));
    console.log(config);
    this.MD =  config;

  }




  BuscarFinaceiro(){

    let dados = {
      'USERID'                  : this.SelectClinicaDados.USERID,
      'PGnome'                  : this.SelectClinicaDados.PGnome, 
      'unidade'                 : this.SelectClinicaDados.unidade,
      'cd_unidade_atendimento'  : this.SelectClinicaDados.cd_unidade_atendimento,
      'prestador'               : this.SelectPrestadoKey,
      'dataINI'                 : this.model,
      'dataFIM'                 : this.model1,
      'acaoBD'                  : 'v'
    };

    this.AllService.PostUrl(dados,'FinacPrest').subscribe(res=>this.ListFinancGrid=res);

  }



  onPrestadoUnidad(i){

    //console.log("onSelectUnidade");
    //console.log(item);

    this.SelectPrestadoKey    = i.value;
    this.SelectPrestadoNome   = i.label;


  }

  onSelectUnidade(item){
    //console.log("onSelectUnidade");
    //console.log(item);

    this.SelectClinicaDados.chave = item.value;
    this.SelectClinicaDados.unidade = item.value;
    this.SelectClinicaDados.nm_unidade_atendimento = item.label;

    this.ngOnInit();
  }



  detalhesFinac(MODAL,OBJ){

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
    this.AllService.PostUrl(dados,'FinacPrestDTH').subscribe(res=>this.ListFinancDTHGrid=res);



    this.openModal(MODAL);
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
    this.AllService.PostUrl(dados,'FinacPrestDTHRecibo').subscribe(res=>this.ListFinancGridR=res);

    this.MD = {};
    this.MD.valor_credito = OBJ.valor_credito;

    this.openModal(MODAL,'modal-lg');



  }


  Imprimir(){
    console.log("Imprimir");

  }

  public print = (): void => {
      window.print();
  }
  



}
