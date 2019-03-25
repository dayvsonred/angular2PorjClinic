import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ContaCorrenteClinicaService } from '../conta-corrente-clinica/conta-corrente-clinica.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { AuthService } from '../../auth/auth.service';
import { CreditoService } from '../credito/credito.service';
import { ContaCorrentePacienteService } from './conta-corrente-paciente.service';
import { Alert } from '../../../../node_modules/@types/selenium-webdriver';
// import { CookieXSRFStrategy } from '@angular/http';
// import { ConsoleReporter } from 'jasmine';



@Component({
  selector: 'app-conta-corrente-paciente',
  templateUrl: './conta-corrente-paciente.component.html',
  styleUrls: ['./conta-corrente-paciente.component.css']
})
export class ContaCorrentePacienteComponent implements OnInit {

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
      
      ListGrupGrid              : any;
      ListFinancGrid            : any;
      FincTrselectedRow         : any;
      FincTrselectedRowObj      : any;
      GruposTratamentoPac       : any;
      GrupoSetShow              : any;
      GrupoSetFicSelct          : any;
      GrupseltRow               : any;
      GrupseltRowObj            : any;
      GrupItenseltRow           : any;
      GrupItenseltRowObj        : any;
      ListIndex                 : any;
      GrupoSetShowFix           : any;
      GetBonusPaciente          : any;
      MD                        : any;
      GrupoSetFicSelctObj       : any;
      DescontoOrto              : any;
      TratamentDesc             : any;
      FormaPagamentoALL         : any;
      ListBancoCheq             : [ {label: '...', value: 0} ];
      ListBandeiraCartao        : any;
      fincDescontAtivo          : boolean = false;
      GrupoSetShowSET           : any;
      autoObjSelect             : any;
      autoItemselect            : any;
      ObjNull                   : any;
      ListParcelas              : any;
      ValNEfetivado             : any;
      IsAdm                     : boolean = false;
      ValsTratamet              = { "tratamento" : 0, "pago" : 0, "desconto" : 0, "juros" : 0, "debtRest" : 0 };
      tratamentosEmDebito       : any;
      TipoShowTratPac           : any;
      TipoShowTratPacVet         : any;
      


      
    /*** OUTRA CLINICA TESTA  */

    // SelectClinicaDados  = {
    //   'chave'                   : 'L00900020150803111929', 
    //   'unidade'                 : 'L00900020150803111929',  //mudae id nome obj para unidade - melhorar intendimento
    //   'nm_unidade_atendimento'  : 'Unidade de Testes', 
    //   'cd_unidade_atendimento'  : '017',
    //   'USERID'                  : 'L01700020170822100837', // - ID IEB ADM dayvson
    //   'PGnome'                  : 'Conta Corrente Clínica', // nome PG
    //   'BaseIndex'               : null,
    //   'DataHoje'                : null,
    // 'DataHojeFormat'         : '',
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
      'DataHojeFormat'         : '',
      'Val1'                   : null,
      'rotaAcao'               : 'ag2',
      'chaveUsuario'           : null,
      'cd_filial'              : null,
    }; 



  constructor(private router: Router,private authService: AuthService, private creditoService : CreditoService, private contaCorrentePacienteService : ContaCorrentePacienteService,   private contaCorrenteClinicaService : ContaCorrenteClinicaService,private modalService: BsModalService ) {
      //this.options = new DatePickerOptions();
      console.log("version 6.20180912");
      // console.log(authService.RESUserValid );
      this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
      this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
      this.SelectClinicaDados.chaveUsuario = this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
      this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
      this.SelectClinicaDados.BaseIndex = this.contaCorrenteClinicaService.URLIndex;
      this.SelectClinicaDados.Val1 = authService.RESVal1;
      //console.log(this.SelectClinicaDados);


     
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
  }

    
    public myDatePickerOptions: IMyDpOptions = {
      // other options...
      todayBtnTxt         : 'Hoje',
      dateFormat          : 'dd/mm/yyyy',
      firstDayOfWeek      : 'su',
      sunHighlight        : true,
      inline              : false,
      editableDateField   : false, 
    };


    // Initialized to specific date (09.10.2018).
    public model: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public model1: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public model2: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public modalRef: BsModalRef;

    public openModal(template: TemplateRef<any>, classT?:any ) {
        if (!classT){  classT =  'md-Full';  }
      this.modalRef = this.modalService.show(template, {class: classT});
    }

    public hiderModal(){
        // console.log("hiderModal");
        this.modalRef.hide();
    }


  ngOnInit() {

    this.autoItemselect = null; this.GrupoSetShowSET = null; this.GetBonusPaciente = null; this.FincTrselectedRow =  null; this.GrupItenseltRow =  null; this.GrupseltRow =  null; this.GrupoSetFicSelct =  null; this.PacienteSelec = null;
    this.ObjNull = {}; this.autoObjSelect  ={}; this.TratamentDesc = {}; this.GrupoSetFicSelctObj = {}; this.MD = {}; this.GrupoSetShowFix = {}; this.GrupItenseltRowObj = {}; this.GrupseltRowObj = {}; this.FincTrselectedRowObj = {}; this.ObjSelec = {};
    this.tratamentosEmDebito = []; this.GrupoSetShow = []; this.GruposTratamentoPac = []; this.ListIndex = []; this.ListGrupGrid = []; this.ListFinancGrid = [];
    this.bxOpenShow  = false; this.bxOpen  = false; this.fincDescontAtivo = false; this.Process = false;
    this.DescontoOrto = 0;
    this.TipoShowTratPacVet = this.contaCorrentePacienteService.TipoPagTratamento();
    this.TipoShowTratPac = 'N';
    this.ValsTratamet =  { "tratamento" : 0, "pago" : 0, "desconto" : 0, "juros" : 0, "debtRest" : 0 } ;
    
    
    // this.caregandoFinc = false;
    // this.pacienteNomes = [];
    // this.usuariosNomes = [];


    let dadosUnid = {
      'chaveUsuario'  : this.SelectClinicaDados.USERID,
    }
    if( typeof this.ListUnidade === 'undefined' ){
      this.contaCorrenteClinicaService.GetSelcUnidadeB(dadosUnid).subscribe(res=>this.ListUnidade=res);
    }


    this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
    /**ZERO VALORES DOS GET do SERVICE ARA NAO DA ERRO DE USAR DAODS DE OUTRA CLINICA  */
    this.contaCorrenteClinicaService.INI();
    this.contaCorrenteClinicaService.GetAllTratamentos().subscribe(contasTipo=>this.contasTipo=contasTipo );
    this.UnidadeDados = {};
    this.contaCorrenteClinicaService.GetUnidadeDados(this.SelectClinicaDados).subscribe(res=>this.UnidadeDados=res[0] );

    //busco os bancos do cheque q clinica aceita
    // this.contaCorrenteClinicaService.GetBancosList().subscribe(data => {  this.ListBancoCheq = data; });
    this.contaCorrenteClinicaService.GetBancosList().subscribe(res=>this.ListBancoCheq=res );

    let dados = {
      'unidade'  : this.SelectClinicaDados.unidade
    }
    this.creditoService.GetBandeirasCartao(dados).subscribe(res=>this.ListBandeiraCartao=res);
  

    let dadosA = {
      'unidade'           : this.SelectClinicaDados.unidade,
      'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
      'USERID'            : this.SelectClinicaDados.USERID,
      'PGnome'            : this.SelectClinicaDados.PGnome,
      'PGTela'            : 'Financeiro',
    }
    this.creditoService.PrestadorIsAdm(dadosA).subscribe(res=>this.IsAdm=res);


    
      /**VERIFICAR SE JA ESXISTE PACIENTE PARA BUSCAR  */
      this.GetPacSelecionado();
    
  }

  
  GetPacSelecionado(){
    // console.log("GetPacSelecionado");
    //if para auto selecionar paciente vindo do angula2
    // if (sessionStorage.getItem("UserSelectCredito")) {
    //   let OBJPacValue = JSON.parse(sessionStorage.getItem("UserSelectCredito"));
    //   localStorage.removeItem('UserSelectCredito'); /*** REMOVE ITEM  */
    //   // console.log("PACIENTE CELECIONADO");
    //   // console.log(OBJPacValue);
    //   this.PacienteTrSelect(OBJPacValue);
    // }

    /*** variavel vinda da tranferencia com o ID do usuario  */
    if(this.SelectClinicaDados.Val1){
      // console.log("existe paciente selecionado ", this.SelectClinicaDados.Val1);
      this.creditoService.GetPaciente(this.SelectClinicaDados.Val1).subscribe(data => {
        // console.log(data);
        data.nome = data.nm_paciente +" "+ data.sobrenome;
        this.PacienteTrSelect(data);

      });

    }
  }


    /** SELECIONAR PACIENTE  */
    SelectPaciente(Modal){
      // console.log("SelectPaciente");
      this.ListPacientes = [];
      this.ObjSelec = {};
      this.PacienteSelec = null;
      this.GrupoSetFicSelctObj = {};
      this.TratamentDesc = {};
      this.DescontoOrto = 0;
      this.autoItemselect = null;
      this.autoObjSelect  ={};
      
      this.GetBonusPaciente = null; this.FincTrselectedRow =  null; this.GrupItenseltRow =  null; this.GrupseltRow =  null; this.GrupoSetFicSelct =  null; this.PacienteSelec = null;
      this.GrupoSetShowFix = {}; this.GrupItenseltRowObj = {}; this.GrupseltRowObj = {}; this.FincTrselectedRowObj = {}; this.ObjSelec = {};
      this.GrupoSetShow = []; this.GruposTratamentoPac = []; this.ListIndex = []; this.ListGrupGrid = []; this.ListFinancGrid = [];
  
      // this.openModal(Modal);
      this.openModal(Modal, 'modal-lg');
      // this.FumMovCusorOfEnd(InputFocus);
      this.ListFinancGrid = [];
      this.tratamentosEmDebito = [];
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      this.Process = false;
      this.accordionOpen = true;
      this.GrupoSetShowSET = null;
      this.bxOpen  = false;
      this.bxOpenShow  = false;
            

    }

    GetPacienteString(item){
      // console.log("GetPacienteString");
      // console.log(item);
      //  console.log("onGetNamePaciente");
      //console.log(item.keyCode);
      //console.log(item.path[0])
      let a = item.path[0];
      //console.log(a.value);
        let dados = {
              'grupo_unidades'    : this.UnidadeDados.grupo_unidades,
              'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
              'BuscarString'      : a.value,
              'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
              'USERID'            : this.SelectClinicaDados.USERID,
              'PGnome'            : this.SelectClinicaDados.PGnome
        };
          //  console.log(dados);
        if(item.keyCode == 32 || item.keyCode == 13){
            this.creditoService.GetListPaciente(dados).subscribe(data => {
                    // console.log(data);
                    //  this.addListNomePacientes(data);
                    //  this.ListPacientes.push(Object.assign({}, data ));
                    this.ListPacientes = data ;
                    // console.log(this.ListPacientes);
            });
        }
    }

    
    PacienteTrSelect(a){
      //  console.log("PacienteTrSelect---------");
      //  console.log(a);
      this.PacienteSelec = a;
      this.ObjSelec.PacienteSelec = a;
      this.ObjSelec.PacienteSelecNome = a.nome;
      // console.log("modal");
      if(this.modalRef){
        this.hiderModal(); // esconde modal });
      }
     
      this.GetFinac();
    }


    AtualizarPross(){

      this.GrupseltRow = null;
      this.GrupoSetShow = [];
      this.ListFinancGrid = [];
      this.GrupoSetShowSET = null;
      this.accordionOpen = true;
      this.Descelec();
      this.DeselectItemRow();
      
      
      this.GetFinac();
    }

   

    //this.GetFinac(true,GrupseltRowObj,GrupseltRow,GrupoSetFicSelctObj,GrupItenseltRow);
    GetFinac(automatic = false, GrupObj = {},GrupRow = null){
    // console.log("1. -- GetFinac",automatic,GrupObj,GrupRow,FinacObj,ItemRow);
      
      if( this.PacienteSelec == null ){
        return false;
      }
      this.Process = true;
      this.caregandoFinc = true;
      this.GrupoSetFicSelct = null
      this.GrupoSetFicSelctObj = {};
      this.TratamentDesc = {};
      this.ValsTratamet = {
        "tratamento" : 0,
        "pago" : 0,
        "desconto" : 0,
        "juros" : 0,
        "debtRest" : 0,
      }

      let dados = {
        'grupo_unidades'    : this.UnidadeDados.grupo_unidades,
        'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'id'                : this.ObjSelec.PacienteSelec.chave,
        'cd_paciente'       : this.ObjSelec.PacienteSelec.chave,
        'dataIni'           : this.model,
        'dataFim'           : this.model1,
        'acaoBD'            : 'v'
      };


      //  console.log("inviar ------------------------------------");
      //  console.log(dados);

      this.contaCorrentePacienteService.GetFinacPaciente(dados).subscribe(data => {
        // console.log("RES GetFinacPaciente");
        // console.log(data); console.log(''); console.log(this.contaCorrentePacienteService.RESGetFinacPaciente.dth);
        this.ListFinancGrid =[]; this.ListGrupGrid =[];
        this.ListGrupGrid = data;
        this.ListFinancGrid =  this.contaCorrentePacienteService.RESGetFinacPaciente.dth;
        this.caregandoFinc = false;
        this.Process = false;
        this.GeraGridFinac(data, automatic, GrupObj,GrupRow);
        this.ExistePacAbertaAll();
      });

      this.contaCorrentePacienteService.GetBonusPaciente(this.ObjSelec.PacienteSelec.chave).subscribe(res=>this.GetBonusPaciente=res[0].bonus_pac );
      
      this.GetOrtBonus();

      

    }


    ExistePacAbertaAll(){
        // console.log('ExistePacAbertaAll'); console.log(' ');console.log(' ');console.log(' ');
        let todosTratamentos = [];this.tratamentosEmDebito = [];
        // let nomesTratamentos = [];
        this.ListGrupGrid.forEach(element => {
            // console.log(element.cd_financeiro, 'TRATAMENTO GRUPO');
          
            this.ListFinancGrid.forEach(val => {
              // console.log(val);
              if( val.cd_financeiro == element.cd_financeiro && val.debito_efetivado == 'N' ){
                // console.log(val);
                todosTratamentos.push(element.cd_financeiro);
                todosTratamentos.push(element.nm_tp_tratamento_all);
                   
              }
              
            });
          
        });


        


        todosTratamentos = todosTratamentos.filter(function(elem, pos, self) {
          return self.indexOf(elem) == pos;
        })
        // console.log(' ');console.log(' ');console.log(' ');console.log(' *******************');
        // console.log(todosTratamentos);
        this.tratamentosEmDebito = todosTratamentos;
    }

    FinacTemDebito(key){
      // console.log('FinacTemDebito');
      // console.log(key);


      // console.log(this.tratamentosEmDebito.includes(key));

      return this.tratamentosEmDebito.includes(key);


    }





    GetOrtBonus(){

      let dados = {
        'grupo_unidades'    : this.UnidadeDados.grupo_unidades,
        'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'id'                : this.ObjSelec.PacienteSelec.chave,
        'cd_paciente'       : this.ObjSelec.PacienteSelec.chave,
        'acaoBD'            : 'v'
      };

      this.contaCorrentePacienteService.BonusDescontoOrt(dados).subscribe(data => {
        // console.log("Res BonusDescontoOrt"); console.log(data);
        this.DescontoOrto = data;

      });
    }

    /**gera tabela com dados finaceiros */
    GeraGridFinac(obj,automatic = false, GrupObj = {},GrupRow = null){
      // console.log("2. -- GeraGridFinac",obj,GrupObj,GrupRow,FinacObj,ItemRow);

      let totalSaldo = 0;
      let todosTratamentos = [];
      this.TratamentDesc = {};
      this.GrupoSetFicSelctObj = {};
      this.GrupoSetShowSET = null;
      Object.keys(obj).map(function (key) {
        // console.log(obj[key].nm_tp_tratamento_all);
        todosTratamentos.push(obj[key].nm_tp_tratamento_all);
      });
      todosTratamentos = todosTratamentos.filter(function(elem, pos, self) {
        return self.indexOf(elem) == pos;
      })
      todosTratamentos.sort();
      this.GruposTratamentoPac = todosTratamentos;

      if(automatic){
        this.GetShowTratamento(GrupObj ,GrupRow, true);
          // this.autoObjSelect  = FinacObj;
          // this.autoItemselect = ItemRow;
      }
    }
    
    GetShowTratamento(set,i, automatic = false){
      // console.log("GetShowTratamento",set,i,automatic);
      this.GrupoSetFicSelctObj = {};
      let grupoSet = [];
      this.ListGrupGrid.forEach(element => {
        // console.log(element);
        if(element.nm_tp_tratamento_all == set){
          grupoSet.push(element);
        }
      });
      this.GrupoSetShow = grupoSet;
      this.GrupoSetShowSET = set;
      this.GrupoSetFicSelct = null;
      
      // console.log(this.GrupoSetShow);
      // if(!automatic){
        this.GrupSelect(set,i,automatic);
      // }
      
    }
    
    GrupSelect(obj,i,automatic = false){
      // console.log("GrupSelect",obj,i);
      // console.log(obj);
      this.GrupseltRow = i;
      this.GrupseltRowObj = obj;
      if(automatic){
        this.ShowDthTratamento(this.autoObjSelect,this.autoItemselect);
      }else{
        this.Descelec();
      }
    };

    ShowDthTratamento(obj,i){
      // console.log("ShowDthTratamento",obj,i);
      this.GrupoSetFicSelctObj = obj;
      this.GrupoSetFicSelct = obj.cd_financeiro;
      this.autoObjSelect  = this.GrupoSetFicSelctObj;
      this.autoItemselect = i;
      this.ListIndex = [];
      this.TratamentDesc = {};
      this.GrupItenelect(obj,i);
      this.TratamentDesconto();
      this.GeraTotalDadosTrat(obj);
      
      
      

    }

    GrupItenelect(obj,i){
      //  console.log("GrupItenelect",obj,i);
      if(i == this.GrupItenseltRow){
          this.CloseColapse(true); /** fecha lista acordian */
      }
      this.GrupItenseltRow = i;
      this.GrupItenseltRowObj = obj;
    }

    TratamentDesconto(){
      // console.log("TratamentDesconto",this.GrupoSetFicSelct);
      
      this.fincDescontAtivo = true;
      this.contaCorrentePacienteService.GetTratamentDesconto(this.GrupoSetFicSelct).subscribe(data => {
        // console.log("Res GetTratamentDesconto");
        // console.log(data);
        this.TratamentDesc = data;

        //  this.addListNomePacientes(data);
        //  this.ListPacientes.push(Object.assign({}, data ));
        // this.ListPacientes = data ;
        // console.log(this.ListPacientes);
        if(this.TratamentDesc != null )  {
          if( (this.TratamentDesc.falta == 'O') || (this.TratamentDesc.falta == 'S') || (this.TratamentDesc.falta == 'F')  || (this.TratamentDesc.tipo_tratamento == 'L00000020110727232144')  ){
            // console.log("OK");
             this.fincDescontAtivo = false;
          }
        }
       
        //REMOVI VALIDAÇÃO SE FOR NOTA PROMISSORIA E DATA VENCIMENTO MAIOR Q HOJE         
        /*
          else if( (this.TratamentDesc.nm_convenio  == 'Nota Promissoria') && (this.DataMaiorHoje(this.MD.vencimentoFormt)) ){
              // e data inferior a tada atual
              this.fincDescontAtivo = false;
          } 
        */

      });
    }

    SelectTratPacel(obj,i,Modal = null){
      // console.log("SelectTratPacel",obj,i);
      // console.log(obj);

      if(this.FincTrselectedRow == i){
        this.ShowParcelaDados(obj,Modal);
      }
      this.FincTrselectedRow = i;
      this.FincTrselectedRowObj = obj;
    }


    GeraTotalDadosTrat(obj){
      // console.log("GeraTotalDadosTrat");
      this.ValsTratamet = {
        "tratamento" : 0,
        "pago" : 0,
        "desconto" : 0,
        "juros" : 0,
        "debtRest" : 0,
      }

      let dados =  {
        'cd_financeiro' : obj.cd_financeiro
      }

      
      this.contaCorrentePacienteService.GetValTratam(dados).subscribe(data => {
        // console.log("RES GetValTratam");
        // console.log(data);
        this.ValsTratamet = data;
        this.ValsTratamet.debtRest = parseFloat(data.tratamento) - parseFloat(data.pago);
      });
      
    }

    ShowParcelaDados(obj,Modal){
      // console.log("ShowParcelaDados exibição ");
      // console.log(obj);

      
      if(this.bxOpen == true){
        return false;
      }

      this.bxOpenShow  = true;
      // console.log("ShowParcelaDados INI");

      this.MD = {}

      this.MD.vencimento    = obj.data2;
      this.MD.venctoFormt   = obj.data;
      this.MD.efetivada   = obj.debito_efetivado == 'S' ? 'Sim' : 'Não';
      this.MD.dt_baixaShow   =  this.isNullOrEmpety(obj.dt_baixa) ? '':  this.FundataShow(obj.dt_baixa);
      this.MD.observacoes     = this.FincTrselectedRowObj.observacoesFpp;
      this.MD.dt_baixa   = obj.dt_baixa;
      this.MD.historico     = obj.historico;
      this.MD.valor_parcela   = obj.valor_parcela;
      this.MD.usarDescOrt     = this.DescontoOrto > 0 ? true : false;
      this.MD.chaveBaixaSelect    = obj.chave;
      this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
      this.creditoService.GetPaciente(this.MD.cd_paciente).subscribe(res => { this.MD.nomePaciente = res.nm_paciente +" "+ res.sobrenome; });
      
      this.MD.juros_cartao        = obj.juros_cartao;     
      this.MD.juros               = obj.juros;
      this.MD.tjuro               = obj.tjuro;
      this.MD.desconto            = obj.desconto;
      this.MD.tdesc               = obj.tdesc;
      this.MD.cd_financeiro       = obj.cd_financeiro;
      this.MD.debito_efetivado    = obj.debito_efetivado;
      this.MD.dt_vencimento       = obj.dt_vencimento;
      this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
      this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
      this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
      this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
      this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
      this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
      this.MD.TratamentDesc       = this.TratamentDesc;
      this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
      this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;
      
      this.MD.nome_quem_baixou  = obj.nome_quem_baixou;
      // if(!this.isNullOrEmpety(this.MD.quem_baixou)){this.creditoService.GetPrestador(this.MD.quem_baixou).subscribe(res=>this.MD.NomeQuem_baixou=res.apelido);} 

      this.openModal(Modal);

    }

    Descelec(){
      this.FincTrselectedRow = null; this.GrupItenseltRow = null;
      this.GrupoSetShowFix = {}; this.FincTrselectedRowObj = {}; this.GrupItenseltRowObj = {};
      this.ListIndex = [];
    }

    DeselectItemRow(){
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
    }

    incoBaixado(obj){
      if( obj.cd_parcela_destino !== null  && obj.cd_parcela_destino !== ''  && obj.debito_efetivado == 'S' ){
          return true
      }
      return false;
    }

    incoBaixaConfir(obj){
      if(obj.debito_efetivado == 'S' && (obj.cd_parcela_destino == null  || obj.cd_parcela_destino == '' ) ){
          return true
      }
      return false;
    }

    baixarParcela2(Modal,Modal2){
      // console.log(this.FincTrselectedRowObj)
      // console.log(this.isEmptyObj(this.FincTrselectedRowObj));
      if( this.isEmptyObj(this.FincTrselectedRowObj) ){
        // console.log("go");
        this.baixarParcela(Modal,this.FincTrselectedRowObj,Modal2);
      }
    }

    baixarParcela(Modal,obj,Modal2){
      // console.log("Parcela");
      console.log(obj);
      // console.log(this.ObjSelec);
      // console.log("this.GrupoSetFicSelct");
      // console.log(this.GrupoSetFicSelct);
      // console.log("this.GrupoSetFicSelctObj");
      // console.log(this.GrupoSetFicSelctObj);
      // console.log("this.SelectClinicaDados");
      // console.log(this.SelectClinicaDados);
      // console.log("this.UnidadeDados");
      // console.log(this.UnidadeDados);
      
      this.Process = true;


      if(this.bxOpenShow == true){
        this.hiderModal();
        this.bxOpen  = true;
        // return false;
      }
      this.bxOpen  = true;

      /** nao deixo da baixa caso nao exista tratamento */
      if(this.TratamentDesc == null){
        alert("Erro ao localizar dados do tratamento!!! - 0201");
        return false;
      }

        // console.log("Parcela INI");
      if(obj.debito_efetivado != "S"){
        // console.log("debito nao efetivado");
        this.Process = false;

        this.MD = {}

        this.MD.vencimento    = obj.data2;
        this.MD.venctoFormt   = obj.data;
        this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
        this.MD.historico     = obj.historico;
        this.MD.valor_parcela   = obj.valor_parcela;
        this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
        this.MD.chaveBaixaSelect    = obj.chave;
        this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
        this.MD.cd_financeiro       = obj.cd_financeiro;
        this.MD.debito_efetivado    = obj.debito_efetivado;
        this.MD.dt_vencimento       = obj.dt_vencimento;
        this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
        this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
        this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
        this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
        this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
        this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
        this.MD.valorPag            = 0;
        this.MD.TratamentDesc       = this.TratamentDesc;
        this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
        this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;
        
        this.MD.acaoBD = 'a';
        this.MD.USERID = this.SelectClinicaDados.USERID;
        this.MD.PGnome = this.SelectClinicaDados.PGnome;
        this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
        this.MD.unidade = this.SelectClinicaDados.unidade;
        this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;
        
        


        //Valor desconto
        this.PacIniConfig();
        this.MD.disableFirmPag = false;
        /** FORMA DE PAGAMENTO  */
        if( this.GrupoSetFicSelctObj.pg_cd_tipo_pagamento != null || this.GrupoSetFicSelctObj.pg_cd_tipo_pagamento != "" ){
          this.MD.PagForm = this.GrupoSetFicSelctObj.pg_cd_tipo_pagamento;
          // SE nota promissoria BLOQUEIA MUDAR TIPO PAGAMENTO  VERIFICAR ???????
          this.MD.disableFirmPag = this.GrupoSetFicSelctObj.pg_cd_tipo_pagamento == 'L00000020100620202852' ?  true : false;
        }
       

        this.contaCorrenteClinicaService.FormaPagamentoALL().subscribe(res=>this.FormaPagamentoALL=res  );

        this.openModal(Modal);

      }


      if((obj.cd_parcela_destino == null  || obj.cd_parcela_destino == '')  && obj.debito_efetivado == 'S' ){
        // console.log("debito nao efetivado & nao pago");
          this.Process = true;

          this.MD = {}

          this.MD.vencimento    = obj.data2;
          this.MD.venctoFormt   = obj.data;
          this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
          this.MD.historico     = obj.historico;
          this.MD.valor_parcela   = obj.valor_parcela;
          this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
          this.MD.chaveBaixaSelect    = obj.chave;
          this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
          this.MD.cd_financeiro       = obj.cd_financeiro;
          this.MD.debito_efetivado    = obj.debito_efetivado;
          this.MD.dt_vencimento       = obj.dt_vencimento;
          this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
          this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
          this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
          this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
          this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
          this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
          this.MD.valorPag            = 0;
          this.MD.TratamentDesc       = this.TratamentDesc;
          this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
          this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;


          this.MD.acaoBD = 'a';
          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.unidade = this.SelectClinicaDados.unidade;
          this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;

          this.Process = false;
          this.openModal(Modal2);
        

      }

      // console.log("fim abrir ");
      // console.log(this.MD);

    }

    baixarParcelaExeValidar(){
      // console.log("baixarParcelaExeValidar");

      /**FORMA DE PAGAMENTO CAMPOS VALIDOS  */
      /** cheque */
      if( (this.MD.PagForm == 'L00000020100620202853') || (this.MD.PagForm == 'L00000020100620202851') || (this.MD.PagForm == 'L00500020161215173051') || (this.MD.PagForm == 'L00500020161205113918' ) ){
        // console.log(this.isNullOrEmpety(this.MD.CheqBanco)); console.log(this.isNullOrEmpety(this.MD.CheqAgen)); console.log(this.isNullOrEmpety(this.MD.CheqCont)); console.log(this.isNullOrEmpety(this.MD.CheqNum));
        if( this.isNullOrEmpety(this.MD.CheqBanco) || this.isNullOrEmpety(this.MD.CheqAgen) || this.isNullOrEmpety(this.MD.CheqCont) || this.isNullOrEmpety(this.MD.CheqNum)){
          this.MsgObrigatorio();
          return false;
        }
      }

      /** CARTAO */
      if( (this.MD.PagForm == 'L20120705222521') || (this.MD.PagForm == 'L00000020100620202855') ) {
        if( this.isNullOrEmpety(this.MD.bandeiraCartao) || this.isNullOrEmpety(this.MD.numerocartao) ){
          this.MsgObrigatorio();
          return false;
        }
      }


      return true;

    }

    MsgObrigatorio(){
      if( (this.MD.PagForm == 'L00000020100620202853') || (this.MD.PagForm == 'L00000020100620202851') || (this.MD.PagForm == 'L00500020161215173051') || (this.MD.PagForm == 'L00500020161205113918' ) ){
        if(this.isNullOrEmpety(this.MD.CheqBanco) ){
          alert("preencha o campo obrigatorio! - cheque Banco");
        }
        if(this.isNullOrEmpety(this.MD.CheqAgen) ){
          alert("preencha o campo obrigatorio! - cheque agência");
        }
        if(this.isNullOrEmpety(this.MD.CheqCont) ){
          alert("preencha o campo obrigatorio! - cheque conta");
        }
        if(this.isNullOrEmpety(this.MD.CheqNum) ){
          alert("preencha o campo obrigatorio! - cheque número");
        }
      }
      if( (this.MD.PagForm == 'L20120705222521') || (this.MD.PagForm == 'L00000020100620202855') ) {
        if(this.isNullOrEmpety(this.MD.bandeiraCartao) ){
          alert("preencha o campo obrigatorio! - bandeira cartão");
        }
        if(this.isNullOrEmpety(this.MD.numerocartao) ){
          alert("preencha o campo obrigatorio! - número cartão");
        }
      }
    }

    validarValorPago(){
      // console.log("validarValorPago");
      let valtotal =  parseFloat(this.MD.valor_parcela) + parseFloat(this.MD.valJuros);
      valtotal = valtotal -  parseFloat(this.MD.descontoVal);
      if(this.MD.usarCredito){
          valtotal = valtotal - parseFloat(this.MD.creditoUsar);
      }

      if(this.MD.valorPag >= valtotal){
        // let resto = parseFloat(this.MD.valorPag) - valtotal;
        // console.log('resto', resto);
          // console.log(valtotal);
          
          return true;
        
      }else{
        console.log('valor total', valtotal);
        alert("o valor pago deve ser equivalente ao valor da parcela mais os valores adicionados!!!");

      }
      // console.log(valtotal);
      return false;
    }

    baixarParcelaExe(Modal){
      // console.log("baixarParcelaExe");
      // console.log(this.MD);
      this.hiderModal();
      this.Process = true;

      if(this.baixarParcelaExeValidar() && this.validarValorPago() ){
          // console.log("validado ");
          


          this.MD.acaoBD = 'a';
          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.unidade = this.SelectClinicaDados.unidade;
          this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;

          let GrupseltRow = this.GrupseltRow;
          let GrupoSetShowSET = this.GrupoSetShowSET;

          this.contaCorrentePacienteService.BaixarParcela(this.MD).subscribe(data => {
            console.log("Res BaixarParcela");
            console.log(data);
            
            this.DeselectItemRow();
            this.GetFinac(true,GrupoSetShowSET,GrupseltRow);

          });
      }else{
        this.Process = false;
        this.openModal(Modal);
      }


    }

    ConfirParcelaExe(){
      // console.log("ConfirParcelaExe");
      // console.log(this.MD);
      
      this.Process = true;
      this.hiderModal();

      let GrupseltRow = this.GrupseltRow;
      let GrupoSetShowSET = this.GrupoSetShowSET;
      
      // console.log("enviando  baixa parcela");
      this.contaCorrentePacienteService.ConfirmaParcelaPG(this.MD).subscribe(data => {
        // console.log("Res ConfirmaParcelaPG");
        // console.log(data);
        // this.GetFinac();
        this.Process = true;
        this.DeselectItemRow();
        this.GetFinac(true,GrupoSetShowSET,GrupseltRow);
        

      });

    }

    RemoverParcela(Modal){
      // console.log(this.ObjSelec);
      // console.log("this.GrupoSetFicSelct id tratamento selecionado");
      // console.log(this.GrupoSetFicSelct);
      // console.log("this.GrupoSetFicSelctObj obj tratamento selecionado");
      // console.log(this.GrupoSetFicSelctObj);
      // console.log("this.SelectClinicaDados");
      // console.log(this.SelectClinicaDados);
      // console.log("this.UnidadeDados");
      // console.log(this.UnidadeDados);


      // console.log("---------------------selcionado---------------------------");
      // console.log(this.FincTrselectedRow);
      // console.log(this.FincTrselectedRowObj);


      if(!this.IsAdm){
        alert("Apenas administradores podem executar!!");
        return false;
      }

      if(this.FincTrselectedRow == null ){
        alert("Selecione uma parcela!!");
        return false;
      }
      let obj = this.FincTrselectedRowObj;
      // console.log("RemoverParcela");
      // console.log(obj);


      
      this.Process = true;

      /** nao deixo da baixa caso nao exista tratamento */
      if(this.TratamentDesc == null){
        alert("Erro ao localizar dados do tratamento!!! - 0201");
        return false;
      }

        this.Process = false;

        this.MD = {}

        this.MD.vencimento    = obj.data2;
        this.MD.venctoFormt   = obj.data;
        this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
        this.MD.historico     = obj.historico;
        this.MD.valor_parcela   = obj.valor_parcela;
        this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
        this.MD.chaveBaixaSelect    = obj.chave;
        this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
        this.MD.cd_financeiro       = obj.cd_financeiro;
        this.MD.cd_financeiroGrop   = this.GrupoSetFicSelctObj.cd_financeiro;
        this.MD.debito_efetivado    = obj.debito_efetivado;
        this.MD.dt_vencimento       = obj.dt_vencimento;
        this.MD.dt_baixa            = obj.dt_baixa;
        this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
        this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
        this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
        this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
        this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
        this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
        this.MD.valorPag            = 0;
        this.MD.TratamentDesc       = this.TratamentDesc;
        this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
        this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;

        // console.log(this.MD);
        this.openModal(Modal);

        
    }

    RemoverParcelaExe(){
      // console.log("RemoverParcelaExe");
      this.hiderModal();
      this.Process = true;
      this.MD.acaoBD = 'e';
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;

      let GrupseltRow = this.GrupseltRow;
      let GrupoSetShowSET = this.GrupoSetShowSET;

      // console.log(this.MD);

      this.contaCorrentePacienteService.DellParcelaPacT(this.MD).subscribe(data => {
        // console.log("Res BaixarParcela",data);
        this.DeselectItemRow();
        // console.log(GrupoSetShowSET,GrupseltRow,GrupoSetFicSelctObj,GrupItenseltRow);
        this.GetFinac(true,GrupoSetShowSET,GrupseltRow);

      });
    }


    CancelBaixa(Modal){

      if(this.FincTrselectedRow == null ){
        alert("Selecione uma parcela!!");
        return false;
        
      }
      let obj = this.FincTrselectedRowObj;
      // console.log("RemoverParcela");
      // console.log(obj);


      
      this.Process = true;

      /** nao deixo da baixa caso nao exista tratamento */
      if(this.TratamentDesc == null){
        alert("Erro ao localizar dados do tratamento!!! - 0201");
        return false;
      }

        this.Process = false;

        this.MD = {}

        this.MD.vencimento    = obj.data2;
        this.MD.venctoFormt   = obj.data;
        this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
        this.MD.historico     = obj.historico;
        this.MD.valor_parcela   = obj.valor_parcela;
        this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
        this.MD.chaveBaixaSelect    = obj.chave;
        this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
        this.MD.cd_financeiro       = obj.cd_financeiro;
        this.MD.cd_financeiroGrop   = this.GrupoSetFicSelctObj.cd_financeiro;
        this.MD.debito_efetivado    = obj.debito_efetivado;
        this.MD.dt_vencimento       = obj.dt_vencimento;
        this.MD.dt_baixa            = obj.dt_baixa;
        this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
        this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
        this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
        this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
        this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
        this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
        this.MD.valorPag            = 0;
        this.MD.TratamentDesc       = this.TratamentDesc;
        this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
        this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;

        if(!(this.MD.debito_efetivado == 'S' || this.MD.debito_efetivado == 's') ){
          alert("Parcela não Baixada!!");
          return false;
          
        }

        // console.log(this.MD);
        this.openModal(Modal);

    }

    CancelBaixaExe(){   
      // console.log("CancelBaixaExe",this.MD);
      this.hiderModal();
      this.Process = true;


      if(!(this.MD.debito_efetivado == 'S' || this.MD.debito_efetivado == 's') ){
        alert("Parcela não Baixada!!");
        this.Process = false;
        return false;
        
      }

      this.MD.acaoBD = 'a';
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;

      let GrupseltRow = this.GrupseltRow;
      let GrupoSetShowSET = this.GrupoSetShowSET;

      this.contaCorrentePacienteService.CancelBaixa(this.MD).subscribe(data => {
        // console.log("Res BaixarParcela",data);
        this.DeselectItemRow();
        // console.log(GrupoSetShowSET,GrupseltRow,GrupoSetFicSelctObj,GrupItenseltRow);
        this.GetFinac(true,GrupoSetShowSET,GrupseltRow);

      });
    }


    Renegociar(Modal){
      // console.log("Renegociar");

      if(this.FincTrselectedRow == null ){
        alert("Selecione uma parcela!!");
        return false;
        
      }
      let obj = this.FincTrselectedRowObj;
      // console.log("RemoverParcela");
      // console.log(obj);


      
      this.Process = true;

      /** nao deixo da baixa caso nao exista tratamento */
      if(this.TratamentDesc == null){
        alert("Erro ao localizar dados do tratamento!!! - 0201");
        return false;
      }

        this.Process = false;

        this.MD = {}
        this.MD.vencimento    = obj.data2;
        this.MD.venctoFormt   = obj.data;
        this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
        this.MD.historico     = obj.historico;
        this.MD.valor_parcela   = obj.valor_parcela;
        this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
        this.MD.chaveBaixaSelect    = obj.chave;
        this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
        this.MD.cd_financeiro       = obj.cd_financeiro;
        this.MD.cd_financeiroGrop   = this.GrupoSetFicSelctObj.cd_financeiro;
        this.MD.debito_efetivado    = obj.debito_efetivado;
        this.MD.dt_vencimento       = obj.dt_vencimento;
        this.MD.dt_baixa            = obj.dt_baixa;
        this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
        this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
        this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
        this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
        this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
        this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
        this.MD.valorPag            = 0;
        this.MD.TratamentDesc       = this.TratamentDesc;
        this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
        this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;
        
        if( (this.MD.debito_efetivado == 'S' || this.MD.debito_efetivado == 's') ){
            alert("Parcela já Baixada, selecione um pagamento não efetivado!!");
            return false;
        }
        
      this.MD.numParcelar = 1;
      this.MD.ValNEfetivado =  this.ValNEfetivado = 0;
      this.MD.valor_parcelaRenegoc  = 0;
      this.ListpacCriar(99);
     
      

        
        // console.log(this.MD);
        this.openModal(Modal);
        this.contaCorrentePacienteService.ValorNaEfetiv(this.MD).subscribe(res => { this.ValNEfetivado = res; this.RenegociarParcNum(); });

    }

    RenegociarParcNum(){
      // console.log("RenegociarParcNum");
      // console.log(this.MD);
      // console.log(this.ValNEfetivado);
      this.MD.ValNEfetivado = parseFloat(this.ValNEfetivado);
      this.MD.valor_parcelaRenegoc = parseFloat(this.MD.ValNEfetivado) / this.MD.numParcelar ;
    }

    RenegociarExe(){
      // console.log("RenegociarExe");

      this.hiderModal();
      this.Process = true;

      this.MD.acaoBD = 'a';
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;

      let GrupseltRow = this.GrupseltRow;
      let GrupoSetShowSET = this.GrupoSetShowSET;

      this.contaCorrentePacienteService.RenegociaPacelas(this.MD).subscribe(data => {
        // console.log("Res RenegociaPacelas",data);


        this.DeselectItemRow();
        // console.log(GrupoSetShowSET,GrupseltRow,GrupoSetFicSelctObj,GrupItenseltRow);
        this.GetFinac(true,GrupoSetShowSET,GrupseltRow);

      });


    }

    /*** permitir renegociar a parcela com uma entrada e dividir o restante em x vezes  */
    RenegociarParcela(Modal){
      // console.log("RenegociarParcela");

      if(this.FincTrselectedRow == null ){
        alert("Selecione uma parcela!!");
        return false;
        
      }
      let obj = this.FincTrselectedRowObj;
      // console.log("RenegociarParcela");
      // console.log(obj);


      
      this.Process = true;

      /** nao deixo da baixa caso nao exista tratamento */
      if(this.TratamentDesc == null){
        alert("Erro ao localizar dados do tratamento!!! - 0201");
        return false;
      }

        this.Process = false;

        this.MD = {}
        this.MD.vencimento    = obj.data2;
        this.MD.venctoFormt   = obj.data;
        this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
        this.MD.historico     = obj.historico;
        this.MD.valor_parcela   = obj.valor_parcela;
        this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
        this.MD.chaveBaixaSelect    = obj.chave;
        this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
        this.MD.cd_financeiro       = obj.cd_financeiro;
        this.MD.cd_financeiroGrop   = this.GrupoSetFicSelctObj.cd_financeiro;
        this.MD.debito_efetivado    = obj.debito_efetivado;
        this.MD.dt_vencimento       = obj.dt_vencimento;
        this.MD.dt_baixa            = obj.dt_baixa;
        this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
        this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
        this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
        this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
        this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
        this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
        this.MD.valorPag            = 0;
        this.MD.TratamentDesc       = this.TratamentDesc;
        this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
        this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;
        this.MD.valor_entrada       = 0;
        
        
        if( (this.MD.debito_efetivado == 'S' || this.MD.debito_efetivado == 's') ){
            alert("Parcela já Baixada, selecione um pagamento não efetivado!!");
            return false;
        }

        this.MD.numParcelar = 1;
        this.MD.ValNEfetivado =  this.ValNEfetivado = 0;
        this.MD.valor_parcelaRenegoc  = this.MD.valor_parcela ;
        this.ListpacCriar(99);
      
        

        
        // console.log(this.MD);
        this.openModal(Modal);

    }

    RenegociarParcelaExe(){
      // console.log("RenegociarParcelaExe");

      this.hiderModal();
      this.Process = true;


      this.MD.acaoBD = 'a';
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;

      let GrupseltRow = this.GrupseltRow;
      let GrupoSetShowSET = this.GrupoSetShowSET;

      // console.log(this.MD);

      this.contaCorrentePacienteService.RenegociaUmaPacela(this.MD).subscribe(data => {
        // console.log("Res RenegociaUmaPacela",data);


        this.DeselectItemRow();
        // console.log(GrupoSetShowSET,GrupseltRow,GrupoSetFicSelctObj,GrupItenseltRow);
        this.GetFinac(true,GrupoSetShowSET,GrupseltRow);

      });


    }

    RenegociarPar2cNum(obj){
      // console.log(obj);

      if(parseFloat(obj.valor_entrada) >= parseFloat(this.MD.valor_parcela) ){
        alert("Valor de entrada não pode ser maior que a parcela");
        this.MD.valor_entrada = 0;
        return true;
      }

      this.MD.valor_parcelaRenegoc = (parseFloat(this.MD.valor_parcela) -  parseFloat(obj.valor_entrada))   / this.MD.numParcelar ;
    }

    /*** verifdicar se pode alterar */
    ValidaAlterar(){
      

      if(this.FincTrselectedRowObj.debito_efetivado == "S"){
        alert("Não pérmitida alteração na parcela!");
        return false;
      }

      return true
    }

    Alterar(Modal){
      // console.log("alterar");
      
      /** se vasio */
      if(!this.isEmptyObj(this.FincTrselectedRowObj) ){ return false;  }
      /** pode altarar ? */
      if(!this.ValidaAlterar()){ return false; }
      this.Process = false;


      // console.log("this.FincTrselectedRowObj");
      // console.log(this.FincTrselectedRowObj);
      // console.log(this.ObjSelec);
      // console.log("this.GrupoSetFicSelct id tratamento selecionado");
      // console.log(this.GrupoSetFicSelct);
      // console.log("this.GrupoSetFicSelctObj obj tratamento selecionado");
      // console.log(this.GrupoSetFicSelctObj);
      // console.log("this.SelectClinicaDados");
      // console.log(this.SelectClinicaDados);
      // console.log("this.UnidadeDados");
      // console.log(this.UnidadeDados);

      
      this.MD = {}
      this.MD.vencimento    = this.FincTrselectedRowObj.data;
      this.MD.venctoFormt   = this.FincTrselectedRowObj.data2;
      this.MD.historico     = this.FincTrselectedRowObj.historico;
      this.MD.observacoes     = this.FincTrselectedRowObj.observacoesFpp;
      this.MD.valor_parcela   = this.FincTrselectedRowObj.valor_parcela;
      this.MD.chaveBaixaSelect = this.FincTrselectedRowObj.chave;

      let diaEscolhido = this.FincTrselectedRowObj.data2.split("/");
      // this.MD.DiaEscolhidoSQL = diaEscolhido[2]+"-"+diaEscolhido[1]+"-"+diaEscolhido[0];
      // console.log("*******************************************************");
      // console.log(diaEscolhido);
      // this.modelfix = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) } };

      
      this.model2 = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) },
                          formatted : diaEscolhido[0]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[2],
                          jsdate : new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0])
                        };

      // this.MD.dataBaixado   = this.SelectClinicaDados.DataHojeFormat;
      // this.MD.valor_parcela   = obj.valor_parcela;
      // this.MD.usarDescOrt   = this.DescontoOrto > 0 ? true : false;
      // this.MD.chaveBaixaSelect    = obj.chave;
      // this.MD.cd_paciente         = this.GrupoSetFicSelctObj.cd_paciente; 
      // this.MD.cd_financeiro       = obj.cd_financeiro;
      // this.MD.debito_efetivado    = obj.debito_efetivado;
      // this.MD.dt_vencimento       = obj.dt_vencimento;
      // this.MD.pg_responsavel_cpf  = obj.pg_responsavel_cpf;
      // this.MD.pg_responsavel_nome = obj.pg_responsavel_nome;
      // this.MD.pg_cd_tipo_pagamento = obj.pg_cd_tipo_pagamento;
      // this.MD.cd_parcela_destino  = obj.cd_parcela_destino;
      // this.MD.tipo_tratamento     = this.GrupoSetFicSelctObj.tipo_tratamento;
      // this.MD.cd_tratamento       = this.GrupoSetFicSelctObj.cd_tratamento;
      // this.MD.valorPag            = 0;
      // this.MD.TratamentDesc       = this.TratamentDesc;
      // this.MD.dt                  = this.GrupoSetFicSelctObj.dt;
      // this.MD.manutencao          = this.GrupoSetFicSelctObj.manutencao;
      
      
      // console.log(this.MD);
      this.openModal(Modal);


    }

    AlterarExe(){
      this.hiderModal();
      this.Process = true;
      this.MD.acaoBD = 'a';
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.cd_filial =  this.MD.cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.cd_paciente = this.GrupoSetFicSelctObj.cd_paciente;
      this.MD.DataNew = this.model2;

      let GrupseltRow = this.GrupseltRow;
      let GrupoSetShowSET = this.GrupoSetShowSET;

      this.contaCorrentePacienteService.AlterParcelaCCP(this.MD).subscribe(data => {
        // console.log("Res AlterParcelaCCP",data);
        this.DeselectItemRow();
        // console.log(GrupoSetShowSET,GrupseltRow,GrupoSetFicSelctObj,GrupItenseltRow);
        this.GetFinac(true,GrupoSetShowSET,GrupseltRow);

      });
    }


    RecibosOld(){
       let dados = {
        'Idclinica'         : this.SelectClinicaDados.unidade,
        'Idclinicselct'     : this.SelectClinicaDados.cd_unidade_atendimento,
        'cd_user'           : this.SelectClinicaDados.USERID,
        'cd_paciente'       : this.ObjSelec.PacienteSelec.chave,
        'link'              : 'txt',
        'urlVal'            : 'sistema_documentos_pdf.php?RECIBO&'
      }; 

      window.open("http://localhost:2020/indexIntegracaoAngular.php?IdPhp=lost&Idclinica="+this.SelectClinicaDados.unidade+"&Idclinicselct="+this.SelectClinicaDados.cd_unidade_atendimento+"&cd_user="+this.SelectClinicaDados.USERID+"&cd_paciente="+this.ObjSelec.PacienteSelec.chave+"&ReciboNum="+this.MD.chaveBaixaSelect+"&link="+dados.link, "_blank");
    }

    RecibosOldPDF(){
      let dados = {
        'Idclinica'         : this.SelectClinicaDados.unidade,
        'Idclinicselct'     : this.SelectClinicaDados.cd_unidade_atendimento,
        'cd_user'           : this.SelectClinicaDados.USERID,
        'cd_paciente'       : this.ObjSelec.PacienteSelec.chave,
        'link'              : 'pdf',
        'urlVal'            : 'sistema_documentos_pdf.php?RECIBO&'
      };

      window.open("http://localhost:2020/indexIntegracaoAngular.php?IdPhp=lost&Idclinica="+this.SelectClinicaDados.unidade+"&Idclinicselct="+this.SelectClinicaDados.cd_unidade_atendimento+"&cd_user="+this.SelectClinicaDados.USERID+"&cd_paciente="+this.ObjSelec.PacienteSelec.chave+"&ReciboNum="+this.MD.chaveBaixaSelect+"&link="+dados.link, "_blank");
    }


    ChagTpDesconto(){ 
      if(this.MD.TpDesconto == '%'){
            this.MD.descontoPec = 0;
      }else{
          if( this.GetBonusPaciente >= this.MD.valor_parcela && this.MD.usarCredito){
            this.MD.desconto = this.MD.valor_parcela;
          }
      }
    }

    ChagTpJuros(){
      if(this.MD.TpJuros == '%'){
            this.MD.jurosPec = 0;
      }else{
        this.MD.juros = 0;
      }
    }

    /** Usar ou nao usar bonus  */
    ChagUsarBonus(){

      let maxValDesc = parseFloat(this.MD.valor_parcela) + parseFloat(this.MD.valJuros);

      if(this.MD.usarCredito){
        if( this.GetBonusPaciente >= this.MD.valor_parcela){
                this.MD.creditoUsar = this.MD.valor_parcela;

        }
      }else{
        this.MD.creditoUsar = 0;
      }

      this.valApagarTotal();
    }

    ChagValUsarBonus(){
      // console.log("ChagValUsarBonus");
      let maxValDesc = parseFloat(this.MD.valor_parcela) + parseFloat(this.MD.valJuros);

      if( this.MD.creditoUsar > this.GetBonusPaciente || this.MD.creditoUsar > maxValDesc  || this.MD.creditoUsar < 0 ){
        this.MD.creditoUsar = 0;
      }
     
      this.valApagarTotal();

    }

    ChagValDesconto(val = true){
      // console.log("ChagValDesconto");
      if(this.MD.TpDesconto == '$'){
            this.MD.desconto = parseFloat(this.MD.desconto);
            let maxValDesc = parseFloat(this.MD.valor_parcela) + parseFloat(this.MD.valJuros);
            
            if( this.MD.desconto > this.GetBonusPaciente || this.MD.desconto > maxValDesc  || this.MD.desconto < 0  ){
              this.MD.desconto = 0;
            }
            // if(  ( ( (parseFloat(this.MD.valor_parcela) + parseFloat(this.MD.valJuros) ) - parseFloat(this.MD.desconto) ) - parseFloat(this.MD.creditoUsar) ) < 0){
            //       this.MD.desconto = 0;
            //       this.MD.valJuros = 0;
            // }
              this.MD.descontoVal =  parseFloat(this.MD.desconto) ;

      }else{
            this.MD.descontoPec = parseFloat(this.MD.descontoPec);
          if( this.MD.descontoPec < 0 ){
              this.MD.descontoPec = 0;
          }
          this.MD.descontoVal  =  parseFloat(this.MD.valor_parcela) * (parseFloat(this.MD.descontoPec)/100);
      }


      this.valApagarTotal();


      // console.log( this.MD );
      // console.log( this.MD.valorPag );
    }

    ChagValJuros(val = true){
      // console.log("ChagValJuros");
      let a = this.MD;
      if(this.MD.TpJuros == '$'){
          this.MD.juros = parseFloat(this.MD.juros);
          if(this.MD.juros < 0 ){ this.MD.juros = 0; }
          this.MD.valJuros =   this.MD.juros;
      }else{
        this.MD.jurosPec = parseFloat(this.MD.jurosPec);
        if(this.MD.jurosPec < 0 ){ this.MD.jurosPec = 0; }
        this.MD.valJuros = this.MD.valor_parcela * (this.MD.jurosPec/100) ;
      }

      if(val){
        this.valApagarTotal();
      }
    }

    ChagUsarDescOrt(){
      // console.log('ChagUsarDescOrt');
      // console.log(this.UnidadeDados.bonus_orto_perc);
      let desVal = 0;

      if( this.MD.usarDescOrt ){
          if( this.MD.TpDesconto == "$"){
              desVal = (parseFloat(this.UnidadeDados.bonus_orto_perc) /100) * this.MD.valor_parcela;
              this.MD.desconto = desVal;
          }else{
            desVal = parseFloat(this.UnidadeDados.bonus_orto_perc);
            this.MD.descontoPec = desVal; 
          }
      }
    }

    valApagarTotal(){
          let total = ( parseFloat(this.MD.valor_parcela)  + parseFloat(this.MD.valJuros) ) - parseFloat(this.MD.creditoUsar) ;
         
          if( this.MD.descontoVal > total  ){

            this.PacIniConfig();
            let total = ( parseFloat(this.MD.valor_parcela)  + parseFloat(this.MD.valJuros) ) - parseFloat(this.MD.creditoUsar) ;
            this.MD.valorPag = total;
            
            return false;
          }
          total = total - parseFloat(this.MD.descontoVal);

           this.MD.valorPag = total;
    }

    PacIniConfig(){
      this.MD.usarCredito = false;
      this.MD.creditoUsar = 0;
      this.MD.TpDesconto  = "$";
      this.MD.TpJuros   = "$";
      this.MD.valJuros  = 0;
      this.MD.juros  = 0;
      this.MD.descontoVal  = 0;
      this.MD.desconto  = 0;
      this.MD.jurosPec  = 0;
      this.MD.descontoPec  = 0;
        /** valor credito disponivel */
        // console.log(this.GetBonusPaciente); console.log(this.MD.valor_parcela);
      if( parseFloat(this.GetBonusPaciente) >= parseFloat(this.MD.valor_parcela) ){
          this.MD.creditoUsar = parseFloat(this.MD.valor_parcela);
          this.MD.usarCredito = true;
      }
      // console.log(this.MD);
    }

    onchagerPagForm(){
      // console.log("onchagerPagForm");
      // console.log(this.MD);
      // console.log(this.MD.PagForm);
    }

    CloseColapse(val){
      // console.log("--------------++++++++++++++CloseColapse");
      
      // console.log(this.accordionOpen);
      // console.log(this.GrupseltRowObj);
      // console.log(this.GrupItenseltRow);
      // console.log(this.GrupItenseltRowObj);
      // console.log(this.isEmptyObj(this.GrupItenseltRowObj));

      if(this.GrupItenseltRow != null &&  this.isEmptyObj(this.GrupItenseltRowObj)){
        this.accordionOpen = !val ;
        this.GrupoSetShowFix = {
          'select'      :   this.GrupItenseltRow+1,
          'dt'          :   this.GrupItenseltRowObj.dt,
          'valor_total' :   this.GrupItenseltRowObj.valor_total,
        }
      }else{
        alert("Selecione um grupo ou tratamento!");
      }
      // console.log(this.GrupoSetShowFix);
    }

    /** MUDAR UNIDADE */
    onSelectUnidade(item){
      //console.log("onSelectUnidade");
      this.SelectClinicaDados.chave = item.value;
      this.SelectClinicaDados.unidade = item.value;
      this.SelectClinicaDados.nm_unidade_atendimento = item.label;
      this.contaCorrenteClinicaService.RESGetSelcUnidadeB.dados.forEach(element => {
          //console.log(element['value']);
          if(this.SelectClinicaDados.unidade == element['value'] ){
              this.SelectClinicaDados.cd_unidade_atendimento = element['cd_unidade_atendimento'];
          }
      });
      //console.log(this.SelectClinicaDados);
      this.ngOnInit();
    }

    /** exiber sequencia de index da lista ordenada */
    listIndexF(i){
        // console.log(i);
        // console.log(this.ListIndex.includes(i));
        let arrayItensIdex  = this.ListIndex;
      if(this.ListIndex.includes(i) == false){
        // console.log('add');
        arrayItensIdex.push(i);

      }
      this.ListIndex = arrayItensIdex;
      // console.log(this.ListIndex);
      return this.ListIndex.indexOf(i) + 1;
    }

     /**
     * verifica se e null ou empety e retorna true caso for 
     * @param val object ou any 
     */
    isNullOrEmpety(val){
      // console.log("isNullOrEmpety");
      if(val == '' || val == null ){
        return true;
      }
      return false;
    }

    /*** VERIFIVCAR SE OBJETO E empety */
    isEmptyObj(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return true;
      }
      return JSON.stringify(obj) === JSON.stringify(this.ObjNull) ? false : true;
    }

    /***teste  */
    showVar(){
      console.log(this.IsAdm);
    }

    FundataShow(data){
      //console.log("FundataShow" , data);
      //var data = this.value;
      let arr = data.split("-");
      //console.log(arr);

      return arr[2] +'/'+ arr[1] +'/'+ arr[0];
      //alert(dia);
    };

   /** Gera array com x intens */
   ListpacCriar(max){
    let array = [];
    for (let index = 1; index <= max; index++) {
        let iten = {
          'num' : index
        }
      array.push(iten);
      
    }
    this.ListParcelas = array;
  }


  public print = (): void => {
    window.print();
  }




}
