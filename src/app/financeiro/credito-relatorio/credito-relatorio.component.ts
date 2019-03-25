import { Component, OnInit, TemplateRef  } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { CreditoService } from '../credito/credito.service';
import { CreditoRelatorioService } from './credito-relatorio.service';
import { ContaCorrenteClinicaService } from '.././conta-corrente-clinica/conta-corrente-clinica.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
// import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credito-relatorio',
  templateUrl: './credito-relatorio.component.html',
  styleUrls: ['./credito-relatorio.component.css']
})
export class CreditoRelatorioComponent implements OnInit {

  SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
    'chave'                   : '', 
    'unidade'                 : '',  //mudae id nome obj para unidade - melhorar intendimento
    'nm_unidade_atendimento'  : '', 
    'cd_unidade_atendimento'  : '',
    'USERID'                  : '', // - ID solucoes ADM
    'PGnome'                  : 'Conta Corrente Paciente - Bonus', // 'Receber Cheque/Cartão', // 'Conta Corrente Clínica', // Nome PG - perfil
    'BaseIndex'               : null,
    'DataHoje'                : null,
    'rotaAcao'                : 'ag2',
    'chaveUsuario'            : null,
    'cd_filial'              : null,
  }; 

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


  DiasSemanaNum = [ 1, 2, 3, 4, 5, 6, 7];
  DiasSemana = [null, 'Dom', 'Seg','Ter','Qua','Qui','Sex','Sab'];
  DiasSemanaComplt = [null, 'Domingo', 'Segunda','Terça','Quarta','Quinta','Sexta','Sabado'];

      //** default locale for example br  IMyDpOptions mydatepicker */
      locale: string = 'pt-br';
      
      /*** select 2 */
      multiple0                 : boolean = false;
      multiple1                 : boolean = true;
      options0                  : Array<any> = [];
      selection                 : Array<string>;
      UnidadeNome               : any;
      ListUnidade               : any;
      ListPacientes             : any;
      UnidadeDados              : any;
      PacienteSelec             : any;
      ObjSelec                  : any;
      ListFinancGrid            : any;
      FincTrselectedRow         : any;
      FincTrselectedRowObj      : any;
      FinancDTHL                : any;
      MD                        : any;
      Process                   : any;
      btBuscarPac               : any;
      TotalPeriod               : any;



    // Initialized to specific date (09.10.2018).
    public model: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public model1: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    
    

    public myDatePickerOptions: IMyDpOptions = {
      // other options...
    todayBtnTxt         : 'Hoje',
    dateFormat          : 'dd/mm/yyyy',
    firstDayOfWeek      : 'su',
    sunHighlight        : true,
    inline              : false,
    editableDateField   : false, 
    selectorHeight      : '200px',
    selectorWidth       : '220px',

    };  

    
    
    public modalRef: BsModalRef;

    public openModal(template: TemplateRef<any>, classT?:any ) {
        if (!classT){  classT =  'md-Full';  }
      this.modalRef = this.modalService.show(template, {class: classT});
    }
    
    public hiderModal(){
        this.modalRef.hide();
    }


  constructor(private authService: AuthService,   
    private contaCorrenteClinicaService : ContaCorrenteClinicaService,   
    private creditoRelatorioService : CreditoRelatorioService,    
    private creditoService : CreditoService,     
    private modalService: BsModalService,
    private router: Router) { 

    console.log("version fix 4.20180503.10");

    this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
    this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
    this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
    this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
    this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
    this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
    this.SelectClinicaDados.BaseIndex = this.creditoService.URLIndex;
    console.log(this.SelectClinicaDados);



  }

  ngOnInit() {
      this.ObjSelec = {};
      this.ListFinancGrid = [];
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      this.TotalPeriod = 0;
      

      let dadosUnid = {
        'chaveUsuario'  : this.SelectClinicaDados.USERID,
      }
      if( typeof this.ListUnidade === 'undefined' ){
        this.contaCorrenteClinicaService.GetSelcUnidadeB(dadosUnid).subscribe(res=>this.ListUnidade=res);
      }

      this.UnidadeDados = {};
      this.contaCorrenteClinicaService.GetUnidadeDados(this.SelectClinicaDados).subscribe(res=>this.UnidadeDados=res[0] );

      this.Process = false;
      this.btBuscarPac = false;
      

  }

  BuscarPacientes(){
    // console.log("BuscarPacientes");
    this.btBuscarPac = true;

    let dados = {
      'grupo_unidades'    : this.UnidadeDados.grupo_unidades,
      'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
      'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
      'unidade'           : this.SelectClinicaDados.unidade,
      'USERID'            : this.SelectClinicaDados.USERID,
      'PGnome'            : this.SelectClinicaDados.PGnome,
      'dataIni'           : this.model,
      'dataFim'           : this.model1
    };


    //  console.log("inviar ------------------------------------");
    //  console.log(dados);

    this.creditoRelatorioService.GetUnitPacientBonus(dados).subscribe(data => {
      // console.log(data);
      this.ListFinancGrid =[];
      this.ListFinancGrid = data;
      this.btBuscarPac = false;
      this.GeraGridFinac(data)

    });
  }

  /** Soma e exibe o tatal do bonus  */
  GeraGridFinac(obj){
    // console.log("GeraGridFinac");
    // console.log(obj);
    let totalSaldo = 0;

    Object.keys(obj).map(function (key) {
      totalSaldo = totalSaldo + parseFloat(obj[key].ValorBonus);

    });

    this.TotalPeriod = totalSaldo;


  }

  




    /** MUDAR UNIDADE */
    onSelectUnidade(item){
      //console.log("onSelectUnidade");
      this.btBuscarPac = true;
      this.SelectClinicaDados.chave = item.value;
      this.SelectClinicaDados.unidade = item.value;
      this.SelectClinicaDados.nm_unidade_atendimento = item.label;
      this.contaCorrenteClinicaService.RESGetSelcUnidadeB.dados.forEach(element => {
          //console.log(element['value']);
          if(this.SelectClinicaDados.unidade == element['value'] ){
              this.SelectClinicaDados.cd_unidade_atendimento = element['cd_unidade_atendimento'];
          }
      });

      /****TENHO Q MODIFICAR A UNIDADE Q INICIOU A SESSAO - PARA NAO DA ERRO DE DADOS  */
      this.authService.RESUserValid.dados[0].unidade = this.SelectClinicaDados.unidade
      this.authService.RESUserValid.dados[0].nm_unidade_atendimento = item.label;
      this.authService.RESUserValid.dados[0].cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;

      //console.log(this.SelectClinicaDados);
      this.ngOnInit();
    }



    FincaTrSelect(obj,i,Modal){
      // console.log("FincaTrSelect");
      // console.log(obj);
      this.FincTrselectedRow = i;
      this.FincTrselectedRowObj = obj;
      //console.log(this.FincTrselectedRowObj);

      // console.log("abrir modal ");

      this.openModal(Modal, 'modal-lg');

    };


    AbrirPacienteCredito(){
      // console.log("AbrirPacienteCredito");
      // console.log(this.FincTrselectedRowObj);
      // console.log(this.SelectClinicaDados);

       let OldOB =   Object.assign([], this.FincTrselectedRowObj); 
       this.FincTrselectedRowObj.chaveOB =  OldOB.chave;
       this.FincTrselectedRowObj.chave = OldOB.cd_paciente;

      sessionStorage.setItem( 'UserSelectCredito' , JSON.stringify(this.FincTrselectedRowObj));

      this.hiderModal(); 

      this.gotoCredito();
    }


    gotoCredito() {
      this.router.navigate(['/financDetalheCredt']);
    }


}
