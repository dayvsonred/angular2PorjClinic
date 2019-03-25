import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { AuthService } from '../../auth/auth.service';
import { AllService } from '../../all.service';


@Component({
  selector: 'app-conta-corrente-prestador',
  templateUrl: './conta-corrente-prestador.component.html',
  styleUrls: ['./conta-corrente-prestador.component.css']
})
export class ContaCorrentePrestadorComponent implements OnInit {

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
  ValorAExtenso             : any;
  TotalEntrada              : any;
  TotalSaida                : any;
  TotalSaldo                : any;
  Process           : boolean = false;
  extenso : string[];
	



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
      console.log("version beta 2.20180814");
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
    
    this.ValorAExtenso    =  null;
    this.TotalEntrada   = 0;
    this.TotalSaida     = 0;
    this.TotalSaldo= 0;
    
    

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

    // console.log(this.model);
    // console.log(this.model1);


  }



  public print = (): void => {
    window.print();
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

    this.AllService.PostUrl(dados,'FinacPrest').subscribe(res => { this.ListFinancGrid=res; this.SomaTotais(res);   });
  }

  SomaTotais(OBJ){
    // console.log('SomaTotais');
    // console.log(OBJ);

      let somaValor_credito = 0;
      let somaValor_parcela = 0;
      this.TotalEntrada   = 0;
      this.TotalSaida     = 0;
      this.TotalSaldo = 0;
      
      OBJ.forEach(element => {

        // console.log(somaValor_credito,somaValor_parcela );
        // console.log(element.valor_credito,element.valor_parcela );

        somaValor_credito = somaValor_credito + parseFloat(element.valor_credito);
        if(element.valor_parcela != null  && element.valor_parcela != '' && element.valor_parcela != ' ' ){
          somaValor_parcela = somaValor_parcela + parseFloat(element.valor_parcela);
        }

      });


      this.TotalEntrada   = somaValor_credito;
      this.TotalSaida     = somaValor_parcela;
      this.TotalSaldo     = somaValor_credito - somaValor_parcela;
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
    this.Prototypeextenso();
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
    console.log('RangerDataBuasca');
    console.log(obj);

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







  /** converte valor em string */

  RemocePontoStr(str){

      let l = str+"";
      let k = '';
    for(let i=0;i<l.length;i++){
      console.log(l[i], i, l.length);
      // l[i] = l[i] == express ? "" : l[i]; 
      if(l[i] != '.'){
        k=k+""+l[i];
      }
    }
    
    console.log(k);

    return k;

  }



  
Stringextenso(c){
  console.log('Stringextenso');
  // console.log(c);
  // c = c.toString().replace('.', '' );


  // console.log(c);
  // console.log(this.RemocePontoStr(c));
  // console.log(this.Prototypeextenso('201210'));
  // return this.Prototypeextenso(c);
  this.Prototypeextenso();
};
      

















  Imprimir(){
    console.log("Imprimir");

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


































}
