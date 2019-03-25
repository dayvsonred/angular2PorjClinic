import { Component, OnInit, TemplateRef  } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { CreditoService } from '../../financeiro/credito/credito.service';
import { ContaCorrenteClinicaService } from '../../financeiro/conta-corrente-clinica/conta-corrente-clinica.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { AgendaCadeiraRelatorioService } from './agenda-cadeira-relatorio.service';

// import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda-cadeira-relatorio',
  templateUrl: './agenda-cadeira-relatorio.component.html',
  styleUrls: ['./agenda-cadeira-relatorio.component.css']
})
export class AgendaCadeiraRelatorioComponent implements OnInit {

  
  SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
    'chave'                   : '', 
    'unidade'                 : '',  //mudae id nome obj para unidade - melhorar intendimento
    'nm_unidade_atendimento'  : '', 
    'cd_unidade_atendimento'  : '',
    'USERID'                  : '', // - ID solucoes ADM
    'PGnome'                  : 'Cadeiras', // 'Receber Cheque/Cartão', // 'Conta Corrente Clínica', // Nome PG - perfil
    'BaseIndex'               : null,
    'DataHoje'                : null,
    'rotaAcao'                : 'ag2',
    'chaveUsuario'            : null,
    'cd_filial'               : null,
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
      DiasSelect                : any;
      diaFiltra                 : any;



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
    private agendaCadeiraRelatorioService : AgendaCadeiraRelatorioService, 
    private creditoService : CreditoService,     
    private modalService: BsModalService,
    private router: Router) { 

    console.log("version fix 2.20180724.16");

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
    this.PacienteSelec = null;


    this.authService.RESUserValid.dados[0].unidad = this.SelectClinicaDados.chave;
    this.authService.RESUserValid.dados[0].unidade = this.SelectClinicaDados.unidade
    this.authService.RESUserValid.dados[0].nm_unidade_atendimento = this.SelectClinicaDados.nm_unidade_atendimento;
    this.authService.RESUserValid.dados[0].cd_unidade_atendimento = this.SelectClinicaDados.cd_unidade_atendimento;
    this.SelectClinicaDados.nm_unidade_atendimento = this.UnidadeNome;
    
    

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
    this.DiasSelect = [];
    let DiasSemanaAll = {
          'dia'   : 'Todos',
          'value' : 0
      }
    this.DiasSelect.push(DiasSemanaAll);
    for (let index = 1; index < 7; index++) {

        let DiasSemanaAll = {
          'dia'   : this.DiasSemanaComplt[index],
          'value' : index
        } 

        this.DiasSelect.push(DiasSemanaAll);
        // console.log(this.DiasSelect);
    }

    // console.log(this.DiasSelect);
    
  };


  
  onSelectUnidade(obj){
    // console.log('onSelectUnidade');
    // console.log(obj);

    this.SelectClinicaDados.nm_unidade_atendimento =  obj.label;
    this.SelectClinicaDados.chave =  obj.value;
    this.SelectClinicaDados.unidade =   obj.value;
    this.ngOnInit();

  }


  /** SELECIONAR PRESTADOR  */
  SelectPrestador(Modal){
    // console.log("SelectPaciente");
    this.ListPacientes = [];
    this.ObjSelec = {};
    this.PacienteSelec = null;
    // this.openModal(Modal);
    this.openModal(Modal, 'modal-lg');
    // this.FumMovCusorOfEnd(InputFocus);
    this.ListFinancGrid = [];
    this.FincTrselectedRow = null;
    this.FincTrselectedRowObj = {};
    this.Process = false;

  };

  
  GetPrestadorString(item){
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
            'unidade'           : this.SelectClinicaDados.unidade,
            'USERID'            : this.SelectClinicaDados.USERID,
            'PGnome'            : this.SelectClinicaDados.PGnome
      };
        //  console.log(dados);
      if(item.keyCode == 32 || item.keyCode == 13){
          this.agendaCadeiraRelatorioService.PrestadorByString(dados).subscribe(data => {
                  // console.log(data);
                  //  this.addListNomePacientes(data);
                  //  this.ListPacientes.push(Object.assign({}, data ));
                  this.ListPacientes = data.dados ;
                  // console.log(this.ListPacientes);
          });
      }
  };

  PacienteTrSelect(a){
    //  console.log("PacienteTrSelect---------");
    //  console.log(a);
    this.PacienteSelec = a;
    this.ObjSelec.PacienteSelec = a;
    this.ObjSelec.PacienteSelecNome = a.apelido;
    // console.log("modal");
    if(this.modalRef){
      this.hiderModal(); // esconde modal });
    }
    // console.log(this.PacienteSelec);
    this.GeraRelat();
  };

  GeraRelat(){
    // console.log('GeraRelat');
    // console.log(this.ObjSelec);
    // console.log(this.PacienteSelec);

    let prestadorSelect;
    // console.log(this.isNullOrEmpety(this.PacienteSelec));
    // console.log(this.PacienteSelec.chave);
    if( !this.isNullOrEmpety(this.PacienteSelec) ){
      prestadorSelect =  this.ObjSelec.PacienteSelec.chave;
    }
    this.btBuscarPac = this.Process = true;

    // this.caregandoFinc = true;

    let dados = {
      'grupo_unidades'    : this.UnidadeDados.grupo_unidades,
      'unidade'           : this.SelectClinicaDados.unidade,
      'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
      'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
      'USERID'            : this.SelectClinicaDados.USERID,
      'PGTela'            : "Configurações",  
      'acaoBD'            : "a",
      'PGnome'            : this.SelectClinicaDados.PGnome,
      'prestador'         : prestadorSelect,
      'dataIni'           : this.model,
      'dataFim'           : this.model1,
      'DiaFiltra'         : this.diaFiltra
    };


      // console.log("inviar ------------------------------------");
      // console.log(dados);

    this.agendaCadeiraRelatorioService.CadeirasDrPeriodo(dados).subscribe(data => {
      // console.log("CadeirasDrPeriodo");
      // console.log(data);
      this.ListFinancGrid =[];
      this.ListFinancGrid = data.dados;
      // console.log(this.ListFinancGrid);
      this.btBuscarPac = this.Process = false;
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      // this.GeraGridFinac(data);
    });


  };


  AddDiaFiltra(){
    if(this.ListFinancGrid.lengh > 0 ){
      this.GeraRelat();
    }
  }

  

  FincaTrSelect(obj,i){
    // console.log("FincaTrSelect");
    // console.log(obj);
    // console.log(i);

    if(this.FincTrselectedRow == i){
      // console.log("open irrrrrrrrrrrrrrrrrrrrrrrrr");
      this.FincTrselectedRow = i;
      this.FincTrselectedRowObj = obj;
      this.IrParaCadeira();
    }else{
        this.FincTrselectedRow = i;
        this.FincTrselectedRowObj = obj;
    }


    // console.log(this.FincTrselectedRowObj);
  };


  IrParaCadeira(){
    // console.log("IrParaCadeira");
    // console.log(this.FincTrselectedRowObj);
    

    sessionStorage.removeItem('cadeiraForData');
    sessionStorage.setItem('cadeiraForData' , JSON.stringify(this.FincTrselectedRowObj));

    this.router.navigate(['/configuracao_cadeira']);

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

}
