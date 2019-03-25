import { Component, OnInit, TemplateRef  } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreditoService } from './credito.service';
import { ContaCorrenteClinicaService } from '.././conta-corrente-clinica/conta-corrente-clinica.service';
import { IMyDpOptions } from 'mydatepicker';
import { flatten } from '@angular/compiler';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
//import { empty } from 'rxjs/Observer';


//import { GlobalVariable } from './../../app.varsprod';
//import { element } from 'protractor';
//import { combineAll } from 'rxjs/operator/combineAll';
//import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent implements OnInit {


    SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
      'chave'                   : '', 
      'unidade'                 : '',  //mudae id nome obj para unidade - melhorar intendimento
      'nm_unidade_atendimento'  : '', 
      'cd_unidade_atendimento'  : '',
      'USERID'                  : '', // - ID solucoes ADM
      'PGnome'                  : 'Conta Corrente Paciente - Bonus',  //'Receber Cheque/Cartão', // 'Conta Corrente Clínica', // Nome PG - perfil
      'BaseIndex'               : null,
      'DataHoje'                : null,
      'Val1'                    : null,
      'rotaAcao'                : 'ag2',
      'chaveUsuario'            : null,
      'cd_filial'               : null,
    }; 


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
    startDateDia              : any;
    startDateMes              : any;
    startDateAno              : any;
    startDate                 : any;
    valorAtualCredBonus       : any;
    ListTratamentos           : any;
    Process                   : any;
    ListTipoParcela           : any;
    TotalSaldo                : any;
    TotalTranzacao            : any;
    ListParcelas              : any;
    ListBandeiraCartao        : any;
    ListFormaPG               : any;
    ListPlanoConta            : any;
    FinancDTHLFCP             : any;
    FinancDTHLTRTU            : any;
    FinancDTHLTRTG            : any;
    FinancDTHLFGU             : any;
    FinancDTHLFGG             : any;
    TpPagAlt                  : any;
    caregandoFinc             : any;
    caregandoDthlFCP          : any;
    ListBancoCheq             : [ {label: '...', value: 0} ];
    ListPacientesTransf       : any;
    CredTranfPacient          : any;
    pacienteNomes             : any;
    usuariosNomes             : any;
    IsAdm                     : boolean = false;
    

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


     

    constructor(private authService: AuthService,      private creditoService : CreditoService,      private contaCorrenteClinicaService : ContaCorrenteClinicaService,      private modalService: BsModalService) {

      console.log("version fix 12.20180517.16");
      //console.log(authService.RESUserValid );
      this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
      this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
      this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
      this.SelectClinicaDados.chaveUsuario = this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
      this.UnidadeNome  = this.SelectClinicaDados.nm_unidade_atendimento;
      this.SelectClinicaDados.BaseIndex = this.creditoService.URLIndex;
      this.SelectClinicaDados.Val1 = authService.RESVal1;
      console.log(this.SelectClinicaDados);


      //DATA ATUAL
      this.startDate = new Date;
      this.startDateDia = this.startDate.getDate() < 10 ? '0' + this.startDate.getDate() : this.startDate.getDate();
      this.startDateMes = (parseInt(this.startDate.getMonth())+1) < 10 ? '0' + (parseInt(this.startDate.getMonth())+1)  : (parseInt(this.startDate.getMonth())+1);
      this.startDateAno = this.startDate.getFullYear();
      //console.log("Hoje é " + this.startDate.getDay() + ", " + this.startDate.getDate() + " de " + (parseInt(this.startDate.getMonth()) + 1) + " de " + this.startDate.getFullYear() );
      this.SelectClinicaDados.DataHoje =  this.startDateAno +'-'+ this.startDateMes +'-'+ this.startDateDia; // data hoje
      

       

    }


    ngOnInit(){

    
      this.creditoService.GetPlanoContBnus().subscribe(res=>this.ListPlanoConta=res);

      this.PacienteSelec = null;
      this.ObjSelec = {};
      this.ListFinancGrid = [];
      this.FincTrselectedRow = null;
      this.FincTrselectedRowObj = {};
      this.Process = false;
      this.caregandoFinc = false;
      this.pacienteNomes = [];
      this.usuariosNomes = [];
      
      

      let dadosUnid = {
        'chaveUsuario'  : this.SelectClinicaDados.USERID,
      }
      if( typeof this.ListUnidade === 'undefined' ){
        this.contaCorrenteClinicaService.GetSelcUnidadeB(dadosUnid).subscribe(res=>this.ListUnidade=res);
      }

      this.UnidadeDados = {};
      this.contaCorrenteClinicaService.GetUnidadeDados(this.SelectClinicaDados).subscribe(res=>this.UnidadeDados=res[0] );

      let dados = {
        'unidade'  : this.SelectClinicaDados.unidade
      }
      this.creditoService.GetSelcTratamento(dados).subscribe(res=>this.ListTratamentos=res);
      // this.creditoService.GetSelcTratamento(dados).subscribe(data => {  this.ListTratamentos = data; this.IniGet(dados)  });
      this.ListTipoParcela = this.creditoService.ObjTipoParcela();
      
      this.creditoService.GetBandeirasCartao(dados).subscribe(res=>this.ListBandeiraCartao=res);

      this.creditoService.GetTiposPagamentoS().subscribe(res=>this.ListFormaPG=res);
      //this.creditoService.GetTiposPagamento().subscribe(data => {  this.ListFormaPG = data;   });

      this.creditoService.GetPlanoContBnus().subscribe(res=>this.ListPlanoConta=res);
      // this.creditoService.GetPlanoContBnus().subscribe(data => {  this.ListPlanoConta = data;   });

      // this.ListpacCriar();


      /**VERIFICAR SE JA ESXISTE PACIENTE PARA BUSCAR  */
      this.GetPacSelecionado();


      this.contaCorrenteClinicaService.GetBancosList().subscribe(data => { //busco os bancos do cheque q clinica aceita
          // console.log("retorno GetBancosList"); console.log(data);
          this.ListBancoCheq = data;
      });

      let dadosA = {
        'unidade'           : this.SelectClinicaDados.unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'PGTela'            : 'Financeiro',
      }
      this.creditoService.PrestadorIsAdm(dadosA).subscribe(res=>this.IsAdm=res);


    }

    GetPacSelecionado(){
      // console.log("GetPacSelecionado");
      if (sessionStorage.getItem("UserSelectCredito")) {
        let OBJPacValue = JSON.parse(sessionStorage.getItem("UserSelectCredito"));
        localStorage.removeItem('UserSelectCredito'); /*** REMOVE ITEM  */
        // console.log("PACIENTE CELECIONADO");
        // console.log(OBJPacValue);
        this.PacienteTrSelect(OBJPacValue);
      }

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
    
     

    /** SELECIONAR PACIENTE  */
    SelectPaciente(Modal){
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

    /** ESta função une os Arrays sem dupliucar os dados - serve para o select com filtro */
    addListNomePacientes(obj){
      // console.log("addListNomePacientes");
      // console.log(obj);
      let arrayNome = [];
      //console.log(this.ListNomePacientes);
        Object.keys(obj).map(function (key) {
          //console.log(obj[key].nome);
          let i = {label: obj[key].nome  , value: obj[key].chave, CPF: obj[key].cpf, unidade: obj[key].nm_unidade_atendimento } ;
          arrayNome.push(i);
          //this.ListNomePacientes.push(i)
        });
      //arrayNome.push(Object.assign({},   );
      for (var key in this.ListPacientes) {
        if (this.ListPacientes.hasOwnProperty(key)) {
          //console.log(this.ListNomePacientes[key]);
          //var element = this.ListNomePacientes[key];
          arrayNome.push(this.ListPacientes[key]);   
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
      this.ListPacientes = arrayNome;
      // console.log("++++++++++++++++++++++++++++++++++++");
      // console.log(this.ListPacientes);
    }

    GetFinac(){
      // console.log("GetFinac---------------------------------");
      // console.log(this.ObjSelec.PacienteSelec);
      // console.log(this.model);
      // console.log(this.model1);
      if( this.PacienteSelec == null ){
            return false;
      }
      this.Process = true;

      this.caregandoFinc = true;

      let dados = {
        'grupo_unidades'    : this.UnidadeDados.grupo_unidades,
        'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'id'                : this.ObjSelec.PacienteSelec.chave,
        'dataIni'           : this.model,
        'dataFim'           : this.model1
      };


      //  console.log("inviar ------------------------------------");
      //  console.log(dados);

      this.creditoService.GetCreditoBonusPac(dados).subscribe(data => {
        // console.log("tertototoototo");
        // console.log(data);
        // this.ListFinancGrid =[];
        this.ListFinancGrid = data;
        this.caregandoFinc = false;
        this.GeraGridFinac(data);
      });

    }

    /**gera tabela com dados finaceiros */
    GeraGridFinac(obj){
      // console.log("GeraGridFinac");
      // console.log(this.ListFinancGrid);

      let totalSaldo = 0;
      let totalTranzacao = 0;
      Object.keys(this.ListFinancGrid).map(function (key) {
        //  console.log(obj[key]);
        // this.ListFinancGrid[key].valor_credito = parseFloat(this.ListFinancGrid[key].valor_credito == null ? 0 : this.ListFinancGrid[key].valor_credito);
        // this.ListFinancGrid[key].valor_parcela = parseFloat(this.ListFinancGrid[key].valor_parcela == null ? 0 : this.ListFinancGrid[key].valor_parcela);
        // obj[key].detalhes 
        let msg = '';

          if( obj[key].explicacao != null ){
               msg = obj[key].explicacao ;
          }else{
                if(obj[key].transacao == 'D' ){
                  msg = 'Débito ' ; 
                }
                if(obj[key].transacao == 'C' ){
                  msg = 'Crédito ' ; 
                }

                if(obj[key].cd_financeiro_gerou != null && obj[key].cd_financeiro_gerou != ''  ){
                  msg = 'Gerou Financeiro' 
                }
                if(obj[key].cd_financeiro_usou != null && obj[key].cd_financeiro_usou != ''  ){
                  msg = 'Usou Financeiro' ; 
                }

                if(obj[key].cd_parcela_gerou != null && obj[key].cd_parcela_gerou != ''  ){
                  msg = 'Gerou na Parcela' ; 
                }
                if(obj[key].cd_parcela_usou != null && obj[key].cd_parcela_usou != ''  ){
                  msg = 'Usou Parcela' ; 
                }

                if(obj[key].cd_tratamento_gerou != null && obj[key].cd_tratamento_gerou != ''  ){
                  msg = 'Gerou no Tratamento' ; 
                }
                if(obj[key].cd_tratamento_usou != null && obj[key].cd_tratamento_usou != ''  ){
                  msg = 'Usou no Tratamento' ; 
                }

                if(obj[key].nota_promissoria != 'N' ){
                  msg = 'Usou Nota promissoria ' ; 
                }
          }




      
        // console.log("-------------------------------");
        // console.log(obj[key].transacao);
        // console.log(obj[key].valor_bonus);
        // console.log(obj[key].valor_total);
        

        if(obj[key].transacao == 'C'){
          // console.log("SOMA C");
          totalTranzacao = totalTranzacao + parseFloat(obj[key].valor_bonus);
          ///totalSaldo = totalSaldo + parseFloat(obj[key].valor_total);
        }else{
          // console.log("TIRA D");
          totalTranzacao = totalTranzacao - parseFloat(obj[key].valor_bonus);
          //totalSaldo = totalSaldo - parseFloat(obj[key].valor_total);
        }

        // console.log(totalTranzacao);
        //console.log(totalSaldo);

        
        
        // valor_bonus
        // valor_total

        obj[key].MSG = msg;

      });

      this.ListFinancGrid = obj;
      this.TotalTranzacao = totalTranzacao ;
      

      let dados = {
        'id'                : this.ObjSelec.PacienteSelec.chave,
        'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
      };

      this.creditoService.BonusCreditAtual(dados).subscribe(res=>this.TotalSaldo=res.valor_total);

        this.addNomeTrafrencias(obj);

        this.Process = false;
    }


    addNomeTrafrencias(obj){
        // console.log("addNomeTrafrencias");
        let pacientesCods = []; let usersCods = [];
        Object.keys(obj).map(function (key) {
            //console.log(obj[key].flag);
            if(obj[key].flag == 'DT'|| obj[key].flag == 'CT' ){
                // obj[key].MSG = obj[key].MSG + ' Nome do paciete '  ;
                // console.log(obj[key].cd_paciente_transfere);
                // this.GetPaciente(obj[key].cd_paciente_transfere);
                if(obj[key].cd_paciente_transfere != null){
                  pacientesCods.push(obj[key].cd_paciente_transfere);
                }
                
            }
 
            // if(obj[key].cd_usuario){
            //   // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            //   usersCods.push(obj[key].cd_usuario);
            // }
            





        });
        // console.log("nome pacientes");
        // console.log(pacientesCods);

        let pacienteNomes = [];
        pacientesCods.forEach(element => {
            this.creditoService.GetPaciente(element).subscribe(res=>this.pacienteNomes[element]=res.nm_paciente+' '+res.sobrenome);
        });

        // let usuariosNomes = [];
        // usersCods.forEach(element => {
        //     this.creditoService.GetPrestador(element).subscribe(res=>this.usuariosNomes[element]=res.apelido);
        // });
    }





    FincaTrSelect(obj,i){
      // console.log("FincaTrSelect");
      // console.log(obj);
      this.FincTrselectedRow = i;
      this.FincTrselectedRowObj = obj;

      //console.log(this.FincTrselectedRowObj);
    };



    /** Show Detalhes finaceniro    */
    detalhesFinac(Modal,obj){
      // console.log("dethalesFinac");
      //console.log(this.FincTrselectedRow);
      // console.log(this.FincTrselectedRowObj);
      // console.log(obj);
      // this.ListPacientes = [];
      // this.ObjSelec = {};
      // this.openModal(Modal);

      this.caregandoDthlFCP = false;

      /** dependendo dos dados aumento a largura do modal  */
      let parcItens = String(obj.cd_financeiro_gerou).replace("null","") + "" + String(obj.cd_financeiro_usou).replace("null","") + "" + String(obj.cd_parcela_gerou).replace("null","") + "" +  String(obj.cd_parcela_usou).replace("null","") + "" +  String(obj.cd_tratamento_gerou).replace("null","") + "" + String(obj.cd_tratamento_usou).replace("null","") ;
      // console.log(parcItens);
      if(this.isNullOrEmpety(parcItens)){
        this.openModal(Modal, 'md-lgA');
      }else{
        this.openModal(Modal);
      }


      

      let dados = {
        'cd_financeiro_gerou'     :  obj.cd_financeiro_gerou,
        'cd_financeiro_usou'      :  obj.cd_financeiro_usou,
        'cd_parcela_gerou'        :  obj.cd_parcela_gerou,
        'cd_parcela_usou'         :  obj.cd_parcela_usou,
        'cd_tratamento_gerou'     :  obj.cd_tratamento_gerou,
        'cd_tratamento_usou'      :  obj.cd_tratamento_usou,
        'cd_tipo_tratamento'      :  obj.cd_tipo_tratamento,
        'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'ob_chave'       : obj.chave
      };

      // console.log("daados a enviar ");
      // console.log(dados);

      this.FinancDTHL = [];
      this.FinancDTHLFCP = [];
      this.FinancDTHLTRTU = [];
      this.FinancDTHLTRTG = [];
      this.FinancDTHLFGU = [];
      this.FinancDTHLFGG = [];

      
      
      
      this.creditoService.DethCredBonusPac(dados).subscribe(data => {
        // console.log(data);
        // this.ListFinancGrid =[];
         this.FinancDTHL = data.SQLSelect;
         this.FinancDTHLFCP = data.SQLDthFCP;  console.log("financi pciente  FCP",  this.FinancDTHLFCP);
         this.FinancDTHLTRTU = data.SQLDthTRTU;
         this.FinancDTHLTRTG = data.SQLDthTRTG;
         this.FinancDTHLFGU = data.SQLDthFGU;
         this.FinancDTHLFGG = data.SQLDthFGG;  //console.log("financi aprovado",  this.FinancDTHLFGG);
         

         this.caregandoDthlFCP = true;
        // this.GeraGridFinac(data);
      });


    }



    NovoCredito(Modal){
      // console.log("NovoCredito");

      if( this.PacienteSelec == null ){
          return false;
      }

        this.FincaTrSelect(null,null); // deseleciona o iten 

        this.MD = {};
        this.MD.vencimento = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
        this.FormDataPagChanger(this.MD.vencimento);
        this.MD.acaoBD = 'i';
        this.MD.valorNovoDeito = 0;
        this.MD.valor_total = 0; 
        this.MD.TipoParcela = 'L00000020110310134731'; // Dinheiro 
        this.MD.parces = 1;
        this.MD.PlanoConta = this.ListPlanoConta[0].chave;
        this.MD.NomePacienteSelect = this.ObjSelec.PacienteSelecNome;

        
        // console.log(this.ListPlanoConta);
        // console.log(this.ListPlanoConta[0].chave);
        
        
        this.MD.id = this.ObjSelec.PacienteSelec.chave;

        this.GetItemInObj(this.MD.TipoParcela, this.ListFormaPG);
        this.ListpacCriar(this.MD.ItemInObj.maxparcelas);

        // console.log(this.ObjSelec.PacienteSelec);

        let dados = {
          'id'                : this.ObjSelec.PacienteSelec.chave,
          'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
          'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
          'USERID'            : this.SelectClinicaDados.USERID,
          'PGnome'            : this.SelectClinicaDados.PGnome,
        };
        

        this.creditoService.BonusCreditAtual(dados).subscribe(data => {
          // console.log('BonusCreditAtual');
          // console.log(data);
          this.MD.valor_total = data.valor_total;
          // console.log(this.MD);
        });


        this.openModal(Modal, 'modal-lg');

        if( this.ListBancoCheq == undefined){
          this.contaCorrenteClinicaService.GetBancosList().subscribe(data => { //busco os bancos do cheque q clinica aceita
                        // console.log("retorno GetBancosList"); console.log(data);
                          this.ListBancoCheq = data;
                        });
        }
       

        // console.log(this.MD);

    }

    NovoCreditoExeValidar(){
      // console.log("NovoCreditoExeValidar");
      // console.log(this.MD);

      /*** se cheque  chequebanco chequeagencia chequeconta chequenumero  */
      if(this.MD.TipoParcela =='L00000020100620202851' || this.MD.TipoParcela == 'L00000020100620202853'){

        this.MD.numerocartaoINI = this.MD.numerocartao =  this.MD.bandeiraCartao = null;

        if( this.MD.chequebanco == null || this.MD.chequeagencia == null || this.MD.chequeconta == null || this.MD.chequenumero == null|| this.MD.chequenumero == ' ' ){

          if(this.MD.chequebanco == null ){ this.alertMe("Selecione o Banco.");  }
          if(this.MD.chequeagencia == null ){ this.alertMe("Digite o número da agência.");  }
          if(this.MD.chequeconta == null ){ this.alertMe("Digite o número da conta.");  }
          if(this.MD.chequenumero == null ){ this.alertMe("Digite o número do cheque.");  }
         
          return false;
        } 
        return true;
      }

      /** se cartao  */
      if(this.MD.TipoParcela ==  'L00000020100620202855' || this.MD.TipoParcela ==  'L20120705222521'){
        this.MD.chequebanco =  this.MD.chequeagencia = this.MD.chequeconta = this.MD.chequenumero = null ;

        if( this.MD.numerocartao == null || this.MD.bandeiraCartao == null || this.MD.numerocartao == "" || this.MD.numerocartao == " "){

          if(this.MD.numerocartao == null ){ this.alertMe("Preencha o número do cartão.");  }
          if(this.MD.bandeiraCartao == null ){ this.alertMe("Selecione a bandeira do cartão.");  }
          if(this.MD.numerocartao == "" || this.MD.numerocartao == " " ){ this.alertMe("Preencha o número do cartão."); }

            return false;
        }

        return true;
      }

      /** dinheiro nao tem validacao */
      if(this.MD.TipoParcela ==  'L00000020110310134731' || this.MD.TipoParcela ==  'L01300020160725130407'){
        this.MD.numerocartao =  this.MD.bandeiraCartao = this.MD.chequebanco =  this.MD.chequeagencia = this.MD.chequeconta = this.MD.chequenumero = null ;
        return true;
      }

      /** caso queira fixa apenas nessas opççoes de pagamento muda retorno para falso */
      this.alertMe("Forma de pagamento não configurada - contate a administradora do sistema.");
      return false;
    }

    NovoCreditoExe(){
      // console.log("NovocreeditoExe");
      this.Process = true;
      //  console.log(this.MD);
      // console.log(this.MD.chaveTratamento != null);
      // console.log(this.MD.valorNovoDeito > 0);
      // console.log(this.MD.numerocartao);
      if((this.MD.chaveTratamento != null ) && (this.MD.valorNovoDeito > 0 ) && this.NovoCreditoExeValidar()   ){
       

        this.hiderModal(); 

        this.MD.paciente_unidade = this.UnidadeDados.paciente_unidade;
        this.MD.cd_filial = this.SelectClinicaDados.cd_unidade_atendimento;
        this.MD.USERID = this.SelectClinicaDados.USERID;
        this.MD.PGnome = this.SelectClinicaDados.PGnome;
        this.MD.unidade = this.SelectClinicaDados.unidade;
        this.MD.IsAdm = this.IsAdm;
        

        // console.log(this.MD.numerocartaoINI);
        // console.log(this.MD.numerocartao);
        if(typeof(this.MD.numerocartaoINI) !== 'undefined') {
          this.MD.numerocartao = this.MD.numerocartaoINI + '-' + this.MD.numerocartao;
        }
        
        

        //  console.log(this.MD);

        this.creditoService.IsertBonusCredit(this.MD).subscribe(data => {
          // console.log('IsertBonusCredit RET');
          // console.log(data);
          if(this.creditoService.RESIsertBonusCredit.error){
            this.alertMe(this.creditoService.RESIsertBonusCredit.msg);
          }
          this.GetFinac();
          this.Process = false;
          
        });
      }else{
          /*** erros de preenchimento  */
          if(this.MD.chaveTratamento == null ){ this.alertMe("Selecione o tratamento"); }
          if(this.MD.valorNovoDeito <= 0 ){ this.alertMe("Valor deve ser maior que zero."); }

        this.Process = false;
      }


    }

    

    
    onChageValADD(){
      // console.log("onChageValADD");
      // console.log(this.MD);
      // console.log(this.creditoService.BonusAtual);

      this.MD.valor_total =  parseFloat(this.MD.valorNovoDeito) + parseFloat(this.creditoService.BonusAtual.valor_total);

      // console.log(this.MD);
    }


    /*** o Debito nao esta executando esta bloqueado  */
    NovoDebito(Modal){
      // console.log("NovoDebito");

      if( this.PacienteSelec == null ){
        return false;
      }

        this.FincaTrSelect(null,null); // deseleciona o iten 

        this.MD = {};
        this.MD.vencimento = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
        this.FormDataPagChanger(this.MD.vencimento);
        this.MD.acaoBD = 'i';
        this.MD.valorNovoDeito = 0;
        this.MD.valor_total = 0;
        this.MD.id = this.ObjSelec.PacienteSelec.chave;

        // console.log(this.ObjSelec.PacienteSelec);

        let dados = {
          'id'                : this.ObjSelec.PacienteSelec.chave,
          'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
          'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
          'USERID'            : this.SelectClinicaDados.USERID,
          'PGnome'            : this.SelectClinicaDados.PGnome,
        };
        

        this.creditoService.BonusCreditAtual(dados).subscribe(data => {
          // console.log('BonusCreditAtual');
          // console.log(data);
          this.MD.valor_total = data.valor_total;
          // console.log(this.MD);
        });


        this.openModal(Modal, 'modal-lg');
       

        // console.log(this.MD);

    }


    NovoDebitoExe(){
      // console.log("NovoDebitoExe");
      this.Process = true;
      this.hiderModal(); 

      this.MD.paciente_unidade = this.UnidadeDados.paciente_unidade;
      this.MD.cd_filial = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.IsAdm = this.IsAdm;

      // console.log(this.MD);

      this.creditoService.IsertBonusDebito(this.MD).subscribe(data => {
        // console.log('IsertBonusDebito RET');
        // console.log(data);
        this.GetFinac();
        this.Process = false;
        
      });


    }

  
    onChageValDebito(){
      // console.log("onChageValADD");
      // console.log(this.MD);
      // console.log(this.creditoService.BonusAtual);

      this.MD.valor_total =  parseFloat(this.creditoService.BonusAtual.valor_total) - parseFloat(this.MD.valorNovoDeito) ;

      // console.log(this.MD);
    }


    Alterar(Modal){
      // console.log("Alterar");
      // console.log(this.MD);
      // console.log(this.FincTrselectedRow);

      if( this.PacienteSelec == null ){
        return false;
      }

      console.log(this.FincTrselectedRowObj);

     

      // console.log("------------------------------------");

      if( this.isNullOrEmpety(this.FincTrselectedRowObj.cd_financeiro_usou) &&
            this.isNullOrEmpety(this.FincTrselectedRowObj.cd_financeiro_gerou) &&
            this.isNullOrEmpety(this.FincTrselectedRowObj.cd_tratamento_gerou) &&
            this.isNullOrEmpety(this.FincTrselectedRowObj.cd_tratamento_usou) &&
            this.isNullOrEmpety(this.FincTrselectedRowObj.cd_parcela_usou) &&
            this.isNullOrEmpety(this.FincTrselectedRowObj.cd_parcela_gerou) ){

        if( ( typeof this.FincTrselectedRow !== 'undefined' ) && ( this.FincTrselectedRow !== null ) ){

          
          // console.log('cd_financeiro_usou', this.FincTrselectedRowObj.cd_financeiro_usou, this.isNullOrEmpety(this.FincTrselectedRowObj.cd_financeiro_usou)  );
          // console.log('cd_financeiro_gerou',this.FincTrselectedRowObj.cd_financeiro_gerou, this.isNullOrEmpety(this.FincTrselectedRowObj.cd_financeiro_gerou) )
          // console.log('cd_tratamento_gerou',this.FincTrselectedRowObj.cd_tratamento_gerou, this.isNullOrEmpety(this.FincTrselectedRowObj.cd_tratamento_gerou) );
          // console.log('cd_tratamento_usou',this.FincTrselectedRowObj.cd_tratamento_usou, this.isNullOrEmpety(this.FincTrselectedRowObj.cd_tratamento_usou) );
          // console.log('cd_parcela_usou',this.FincTrselectedRowObj.cd_parcela_usou, this.isNullOrEmpety(this.FincTrselectedRowObj.cd_parcela_usou) );
          // console.log('cd_parcela_gerou',this.FincTrselectedRowObj.cd_parcela_gerou, this.isNullOrEmpety(this.FincTrselectedRowObj.cd_parcela_gerou) );
          // console.log("#########################################################------------------------------------");

          /*** apenas alterar credito  */
          if(this.FincTrselectedRowObj.transacao == 'D'){ alert("Erro permissão negada! "); return true; }
          if(this.FincTrselectedRowObj.transacao != 'C'){ alert("Erro permissão negada! "); return true; }
          if(this.FincTrselectedRowObj.transacao == 'C' && ( this.FincTrselectedRowObj.flag == 'CT' || this.FincTrselectedRowObj.flag == 'CT1') ){ alert("Erro permissão negada! Devolução "); return true; }
          this.MD = {};
          this.TpPagAlt = 'L00000020110310134731'; // dinheiro para travar parcelas 
          this.MD.vencimento = this.FincTrselectedRowObj.dt_transacao ;  //this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
          //this.FormDataPagChanger(this.MD.vencimento);
          this.MD.acaoBD = 'a';
          this.MD.valorNovoDeito = this.FincTrselectedRowObj.valor_bonus;
          this.MD.valorFIX = this.FincTrselectedRowObj.valor_bonus;
          this.MD.valorMax = this.FincTrselectedRowObj.valor_bonus;
          this.MD.valor_total = this.FincTrselectedRowObj.valor_bonus;
          this.MD.valor_total_Old = this.FincTrselectedRowObj.valor_total;
          this.MD.id = this.ObjSelec.PacienteSelec.chave;
          //this.FormDataShow(this.FincTrselectedRowObj.dt_transacao);
          this.MD.transacao = this.FincTrselectedRowObj.transacao;
          this.MD.TipoParcela = this.FincTrselectedRowObj.transacao;
          this.MD.chaveTratamento = this.FincTrselectedRowObj.cd_tipo_tratamento;
          this.MD.chave_Ob = this.FincTrselectedRowObj.chave;
          this.MD.dt_transacao = this.FincTrselectedRowObj.dt_transacao;
          this.MD.cd_paciente = this.FincTrselectedRowObj.cd_paciente;
          this.MD.DTHLFCP = [];

          this.openModal(Modal, 'modal-lg');

          //*** busco DTLHS do Bonus  */
          let dadosOB = {
            'ob_chave'     :  this.FincTrselectedRowObj.chave
          }
          this.creditoService.GetDTHLBonusValor(dadosOB).subscribe(data => {
            // console.log('GetDTHLBonusValor RET');
            // console.log(data);
            
            this.MD.DTHLFCP = data;
            this.MD.DTHLFCPFIX = this.creditoService.RESGetDTHLBonusValor.dados; //Object.create(this.MD.DTHLFCPFIX ); //data;
            

            this.TpPagAlt = data[0].cd_tipo_pagamento;
            // console.log("topo pagamento addddddddddddddddddddddddddddd");
            // console.log(this.TpPagAlt);

            if(data[0]){
              this.MD.TipoParcela = data[0].cd_tipo_pagamento;
              this.MD.bandeiraCartao = data[0].bandeiracartao;
              this.MD.numerocartao = this.showNumCartaoIniFim(data[0].numerocartao,1);
              this.MD.numerocartaoINI = this.showNumCartaoIniFim(data[0].numerocartao,0);
              this.MD.Pacelas = data.length;
              this.MD.dt_transacao_fix = data[0].dt_transacao_fix;

              this.MD.chequebanco = data[0].chequebanco;
              this.MD.chequeagencia = data[0].chequeagencia;
              this.MD.chequeconta = data[0].chequeconta;
              this.MD.chequenumero = data[0].chequenumero;

              this.GetItemInObj(this.MD.TipoParcela, this.ListFormaPG);
              this.ListpacCriar(this.MD.ItemInObj.maxparcelas);
              
            }
          /* Object.keys(this.MD.DTHLFCP).map(function (key) {
              console.log(this.MD.DTHLFCP[key].dt_baixa);
              this.MD.DTHLFCP[key].dt_baixa
            });*/
          });

          //busco os bancos do cheque q clinica aceita
          if( this.ListBancoCheq == undefined){
            this.contaCorrenteClinicaService.GetBancosList().subscribe(data => { 
                          // console.log("retorno GetBancosList"); console.log(data);
                            this.ListBancoCheq = data;
                          });
          }
          // console.log("Selecionado Opem ");
          // console.log(this.MD);
        }else{
            alert("Selecione primeiro! ");
        }
      }else{
        alert("Erro permissão negada! ");
      }
    }


   

    AlterarExe(obj,Modal){
      // console.log("AlterarExe");
      // console.log(obj);
      // console.log(this.NovoCreditoExeValidar());

     if(!this.NovoCreditoExeValidar() ){ return true; }

      this.Process = true;
      this.hiderModal(); 

      
      /**o numero de parcelas nao pode ser menos que 1 - usei o return para parar o processo */

      if(obj.Pacelas < 1){  this.alertMe("O número de parcelas não pode ser zero.");  return true; }

      obj.paciente_unidade = this.UnidadeDados.paciente_unidade;
      obj.cd_filial = this.SelectClinicaDados.cd_unidade_atendimento;
      obj.USERID = this.SelectClinicaDados.USERID;
      obj.PGnome = this.SelectClinicaDados.PGnome;
      obj.unidade = this.SelectClinicaDados.unidade;
      obj.IsAdm = this.IsAdm;

      if(typeof(this.MD.numerocartaoINI) !== 'undefined') {
        this.MD.numerocartao = this.MD.numerocartaoINI + '-' + this.MD.numerocartao;
      }
      

      let rotaPacsADD  = false;
      let rotaPacsRemove = false;
      let rotaVal = false;
      let rotaPacs = false;
      let rotaFormPag = false;
      obj.existeBaixa = false;

      obj.altBandeira = false;
      obj.altNumero = false;

      /** VERIFICO OQ FOI ALTERADO PARA MANDAR PARA ROTA ESPECIFICA */
      //alterado numero de parcelas adicionando
      if(obj.DTHLFCP.length > obj.DTHLFCPFIX.length  ){
        // console.log("alterado número de parcelas");
        rotaPacsADD = true;
      }

      //loop para verificar se teve alguam parcela excluida
      Object.keys(obj.DTHLFCP).map(function (key) {
        // console.log(obj.DTHLFCP[key]);
        if(obj.DTHLFCP[key].parcelaFCP == 'Sim'){
          rotaPacsRemove = true;
        }
        //** verifico se existe parcela baixada */
        if(obj.DTHLFCP[key].alterarFCP == null){
          obj.existeBaixa = true;
        }
        // console.log(obj.DTHLFCP[key].cd_tipo_pagamento != obj.TipoParcela, obj.DTHLFCP[key].cd_tipo_pagamento, obj.TipoParcela);
        if(obj.DTHLFCP[key].cd_tipo_pagamento != obj.TipoParcela ){
          rotaFormPag = true;
        }

        /**verifico bandeira e numero cartao  */
        if(obj.DTHLFCP[key].bandeiracartao != obj.bandeiraCartao ){
          obj.altBandeira = true;
        }
        if(obj.DTHLFCP[key].numerocartao != obj.numerocartao ){
          obj.altNumero = true;
        }
        


      });

      // console.log("aaaaaaaaaaaaaaaaaaaa");
      // console.log(rotaFormPag);
      // console.log(obj);

      // valor credito alterado
      if(obj.valorFIX != obj.valorNovoDeito){
        rotaVal = true;
      }

      //  foi adicionado ou removido alguma parcela
      if( (rotaPacsADD) || (rotaPacsRemove) ){
          rotaPacs = true;
      }



      /** alterado forma de pagamento */
      if(rotaFormPag){
        // console.log("alterado forma de pagameto ");
        // console.log(obj);
        /*** verifico se campos estao preenchidos */

          /** nao pode alterar a forma de pagamento se ja existe baixa  */
          if(obj.existeBaixa){
            this.alertMe("Já existe baixa não pode alterar a forma de pagamento !");
            return true;
          }
        
        if(obj.numerocartao == null || obj.bandeiraCartao == null){
          if(obj.numerocartao == null ){ this.alertMe("Preencha o número do cartão."); }
          if(obj.bandeiraCartao == null ){ this.alertMe("Selecione a bandeira do cartão."); }
            this.openModal(Modal, 'modal-lg'); /** exibo o modal */
            this.Process = false;

        }else{
          /*** envia para back  */
          this.creditoService.AltBonusFormPag(obj).subscribe(data => {
                  // console.log('AltBonusFormPag RET');
                  // console.log(data);
                  if(this.creditoService.RESAltBonusFormPag.error){
                    this.alertMe(this.creditoService.RESAltBonusFormPag.msg);
                  }
                  this.FincTrselectedRow = null
                  this.FincTrselectedRowObj = null;
                  this.GetFinac();
                  this.Process = false;
        
          });
        }
      }



      //rota alterado apenas valor 
      if(rotaVal && !rotaPacs && !rotaFormPag){
        // console.log("rota AlteraBonusValor");
        this.creditoService.AlteraBonusValor(obj).subscribe(data => {
          // console.log('AlteraBonusValor RET');
          // console.log(data);
          if(this.creditoService.RESAltBonusFormPag.error){
            this.alertMe(this.creditoService.RESAltBonusFormPag.msg);
          }
          this.FincTrselectedRow = null
          this.FincTrselectedRowObj = null;
          this.GetFinac();
          this.Process = false;
          
        });
      }


      //apenas numero de parcelas alteado
      if(!rotaVal && rotaPacs && !rotaFormPag){
        // console.log("rotas -- alterado o numero de parcelas *apenas");

        /** verifico se foi retirado ou adicionado  */
        if(rotaPacsADD){
          // console.log("rota ADD parcelas ");
         
            this.creditoService.AlteraBonusPacADD(obj).subscribe(data => {
              // console.log('AlteraBonusValor RET');
              // console.log(data);
              if(this.creditoService.RESAltBonusFormPag.error){
                this.alertMe(this.creditoService.RESAltBonusFormPag.msg);
              }
              this.FincTrselectedRow = null
              this.FincTrselectedRowObj = null;
              this.GetFinac();
              this.Process = false;
              
            });


        }else{
          // console.log("rora REMOVER PARCELAS");

            this.creditoService.AltBonusPacRemv(obj).subscribe(data => {
              // console.log('AltBonusPacRemv RET');
              // console.log(data);
              if(this.creditoService.RESAltBonusFormPag.error){
                this.alertMe(this.creditoService.RESAltBonusFormPag.msg);
              }
              this.FincTrselectedRow = null
              this.FincTrselectedRowObj = null;
              this.GetFinac();
              this.Process = false;
              
            });
        }
      }

      /*** se for alterado os rotas e parcelas  */
       if(rotaVal && rotaPacs && !rotaFormPag){
          // console.log("alterado rotas e valor "); 

            obj.rotaPacsADD = rotaPacsADD;
            obj.rotaPacsRemove = rotaPacsRemove;

          this.creditoService.AltBonusPac(obj).subscribe(data => {
            // console.log('AltBonusPac RET');
            // console.log(data);
            if(this.creditoService.RESAltBonusFormPag.error){
              this.alertMe(this.creditoService.RESAltBonusFormPag.msg);
            }
            this.FincTrselectedRow = null
            this.FincTrselectedRowObj = null;
            this.GetFinac();
            this.Process = false;
            
          });
       }


       /***verificar se altero apena numero e bandeira cartao */
      //  obj.altBandeira = false;
      //  obj.altNumero = false;
      if(!rotaVal && !rotaPacs && !rotaFormPag  &&  (obj.altBandeira == true || obj.altNumero == true)){
        // console.log("alterado bandeira cvartao ou numero  "); 
        // console.log(obj);

        this.creditoService.AltCartBandNum(obj).subscribe(data => {
          // console.log('AltCartBandNum RET');
          // console.log(data);
          if(this.creditoService.RESAltBonusFormPag.error){
            this.alertMe(this.creditoService.RESAltBonusFormPag.msg);
          }
          this.FincTrselectedRow = null
          this.FincTrselectedRowObj = null;
          this.GetFinac();
          this.Process = false;
          
        });
      }
    }

    /** ALTERA NUMERO DE PARCELAS
     * @param obj 
     */
    onchagerAltParcela(obj){
      // console.log('onchagerAltParcela');
      // console.log(this.MD);
      // console.log(obj);
      // console.log(this.startDate);
      let erro = false;
      obj.DTHLFCP = Object.assign([], this.MD.DTHLFCPFIX );
      /**verifico se e para add ou remover parcelas */
      // console.log(obj.Pacelas , obj.DTHLFCP.length);
      if(obj.Pacelas != obj.DTHLFCP.length ){

        /**** NAO PODE DEIRA TEM N PARCELAS ERRO BACK LOOP INFINITO  */
        // console.log("max parcelas ");
        // console.log(this.ListFormaPG);
        // console.log(this.MD.ItemInObj.maxparcelas);
        this.GetItemInObj(this.MD.TipoParcela, this.ListFormaPG);
        this.ListpacCriar(this.MD.ItemInObj.maxparcelas);
        // console.log(this.MD);
        if(!this.MD.Pacelas || this.MD.Pacelas > this.MD.ItemInObj.maxparcelas){
            this.hiderModal(); 
        }
        if(obj.Pacelas > 62 ){
          obj.Pacelas = obj.DTHLFCP.length;
          return false;
        }

        // console.log("PACELAS DIFERENTE - ADD OU REMOVER PARCELAS");
        if(obj.Pacelas < obj.DTHLFCP.length){
          // console.log("PAERCELAS REMOVER");
          Object.keys(obj.DTHLFCP).map(function (key) {
              // console.log(obj.DTHLFCP[key]);
              /*** verifico se a data da baixa ainda e futura - ja vem do back */
              if(obj.DTHLFCP[key].alterarFCP == null){
                    erro =  true;
                    // console.log("JA DEU BAIXA NESSA PARCELA ");
              }
          });
          if(erro ==  false){
            // console.log("NAO DEU BAIXA EM NUNHA PODE REMOVER ");
            // console.log('recalcula valor X parcela ' );
            // console.log(obj.valorNovoDeito);
            // console.log(obj.Pacelas);
            let novoVal = parseFloat(obj.valorNovoDeito) /  parseFloat(obj.Pacelas);
            // console.log(novoVal);
            Object.keys(obj.DTHLFCP).map(function (key) {
              // console.log(obj.DTHLFCP[key]);
              // console.log(key);
              obj.DTHLFCP[key].parcelaFCP = 'Não';
              obj.DTHLFCP[key].corFCP = 1;
              if(key < obj.Pacelas){
                obj.DTHLFCP[key].NovoValorFCP = novoVal;
              }else{
                obj.DTHLFCP[key].parcelaFCP = 'Sim';
                obj.DTHLFCP[key].corFCP = 0;
                obj.DTHLFCP[key].NovoValorFCP = 0.00;
              }
              /*** verifico se a data da baixa ainda e futura - ja vem do back */
              if(obj.DTHLFCP[key].alterarFCP == null){
                    erro =  true;
              }
            });
          }else{
            // console.log("JA DEU BAIXA EM ALGUMA PARCELA = VERIFICAR SE EXISTE PARCELAS FUTURAS E VALOR RESTANDO PODE ADD NA PROXIMA ");
            let NumParcelasNaBaixadas = 0;
            let VALORPAGO = 0;
            Object.keys(obj.DTHLFCP).map(function (key) {
              // console.log(obj.DTHLFCP[key]);
              /*** verifico valor ja pago  */
              if( obj.DTHLFCP[key].alterarFCP == null ){
                    VALORPAGO = VALORPAGO +  parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS);
              }
              // console.log(key,obj.Pacelas,obj.DTHLFCP[key].alterarFCP  );
              /*** verifico se a data da baixa ainda e futura - ja vem do back */
              // console.log('loop', key, obj.Pacelas, obj.DTHLFCP[key].alterarFCP );
              if( (key < obj.Pacelas) && (obj.DTHLFCP[key].alterarFCP != null) ){
                // console.log('valid 1');
                // console.log(NumParcelasNaBaixadas);
                NumParcelasNaBaixadas = NumParcelasNaBaixadas +1;
                // console.log(NumParcelasNaBaixadas);
              }
            });
            // console.log("numero de parcelas nao baixadas e dentro da qtd escolhida");
            // console.log(NumParcelasNaBaixadas);
            // console.log("valor pago , novo debito ", VALORPAGO , obj.valorNovoDeito);
            let ParcelasBxMaisUm = NumParcelasNaBaixadas + 1;
            let ValNovoPacs = 0;
            // if(obj.Pacelas > ParcelasBxMaisUm){
              // let NumParcAlterVAl =   NumParcelasNaBaixadas;
              // console.log("numero parcelas alterar ", NumParcelasNaBaixadas, VALORPAGO );
              ValNovoPacs = (obj.valorNovoDeito - VALORPAGO ) / NumParcelasNaBaixadas;
            // }else{
            //   console.log("numero parcelas alterar ", 1);
            //   ValNovoPacs = obj.valorNovoDeito - VALORPAGO;
            // }
            // console.log("valor novo parcelas", ValNovoPacs);
            // console.log("numero de parcelas nao baixadas e dentro da qtd escolhida");
            // console.log(NumParcelasNaBaixadas);
            // console.log("valor pago", VALORPAGO);
            // let NumParcAlterVAl =  obj.Pacelas - NumParcelasNaBaixadas;
            // let ValNovoPacs = (obj.valorNovoDeito - VALORPAGO ) / NumParcAlterVAl;
            // console.log("valor novo parcelas", ValNovoPacs);
            Object.keys(obj.DTHLFCP).map(function (key) {
              // console.log(obj.DTHLFCP[key]);
              // console.log(key);

              obj.DTHLFCP[key].parcelaFCP = 'Não';
              obj.DTHLFCP[key].corFCP = 1;

              if(key < obj.Pacelas &&  obj.DTHLFCP[key].alterarFCP != null){
                obj.DTHLFCP[key].NovoValorFCP = ValNovoPacs;
                obj.DTHLFCP[key].corFCP = 3;
              }else{
                if(obj.DTHLFCP[key].alterarFCP != null ){
                    obj.DTHLFCP[key].parcelaFCP = 'Sim';
                    obj.DTHLFCP[key].corFCP = 0;
                    obj.DTHLFCP[key].NovoValorFCP = 0.00;
                }
              }
              /*** verifico se a data da baixa ainda e futura - ja vem do back */
              if(obj.DTHLFCP[key].alterarFCP == null){
                    erro =  true;
              }
            });
          }
        }else if (obj.Pacelas > obj.DTHLFCP.length)  {
          // console.log("PAERCELAS ADD");
          let NumParcesAdd = obj.Pacelas - obj.DTHLFCPFIX.length
          // console.log("QTD PARCS ADD", NumParcesAdd);
          let valorFixBaixado = 0;

          let numParcNaoBaixdas = 0 ;
          let numParcBaixdas = 0 ;
          Object.keys(obj.DTHLFCP).map(function (key) {
            // console.log(obj.DTHLFCP[key]);
            //console.log(key);
            //console.log(obj.DTHLFCP[key].alterarFCP);
            //console.log( parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS));

            obj.DTHLFCP[key].parcelaFCP = 'Não';
            obj.DTHLFCP[key].corFCP = 1;
            
            if(obj.DTHLFCP[key].alterarFCP == null){
              valorFixBaixado = valorFixBaixado +  parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS);
              erro =  true; numParcBaixdas++;
            }else{
              numParcNaoBaixdas++;
            }
            //console.log(valorFixBaixado);
          });
          // console.log("VALORES REPARCELAR ");
          // console.log(parseFloat(obj.valorNovoDeito));
          // console.log(valorFixBaixado);
          // console.log(parseFloat(obj.valorNovoDeito) >  valorFixBaixado);
          /*** o valor deve se alterado apenas nas parcelas futuras - e o valor deve ser igual ou maior */
          if(parseFloat(obj.valorNovoDeito) >  valorFixBaixado){

            let ValorReparcelar = parseFloat(obj.valorNovoDeito) -  valorFixBaixado;
          
            //let novoVal = parseFloat(obj.valorNovoDeito) /  parseFloat(obj.Pacelas);
            
            /*** SE JA EXISTE BAIXA DIVIDO PELO NUMERO DE PARCELAS FUTURAS */
            let NovoValorParcelas =  0 ;
            if(erro){
              NovoValorParcelas = ValorReparcelar / (parseFloat(obj.Pacelas) - numParcBaixdas);
            }else{
              NovoValorParcelas = ValorReparcelar /  parseFloat(obj.Pacelas);
            }
            // console.log("novo valor e  Repacelado ",erro);
            // console.log(ValorReparcelar);
            // console.log(NovoValorParcelas);
            // console.log(numParcBaixdas, numParcNaoBaixdas, parseFloat(obj.Pacelas), NumParcesAdd, Math.abs(parseFloat(obj.Pacelas) - NumParcesAdd), ValorReparcelar / Math.abs(parseFloat(obj.Pacelas) - NumParcesAdd));
            Object.keys(obj.DTHLFCP).map(function (key) {
              // console.log(obj.DTHLFCP[key]);
              //console.log(key);
              // console.log(obj.DTHLFCP[key].alterarFCP);
              /*** se alterar for true altero o valor da parcela -  isso sisgnigfica q a data da baixa e futura */
              if(obj.DTHLFCP[key].alterarFCP != null ){
                obj.DTHLFCP[key].NovoValorFCP = NovoValorParcelas;
                obj.DTHLFCP[key].valor_ADD_BONUS = NovoValorParcelas;
              }
            });
            /*** CRIO ADD AS NOVAS PARCELAS  */
            // console.log("novas parcelas add ");
            // console.log(obj.DTHLFCP);
            // console.log("QTD PARCS ADD", NumParcesAdd);
            for (let index = 0; index < NumParcesAdd; index++) {

              let itemDTHLFCP = {
                'dt_baixa'            : '2018-00-00',
                'dt_vencimento'       : '2018-00-00',
                'valor_credito'       : '?',
                'valor_ADD_BONUS'     : NovoValorParcelas,
                'NovoValorFCP'        : NovoValorParcelas,
                'alterarFCP'          : true,
                'parcelaFCP'          : 'Não',
                'chave'               : null,
                'corFCP'              : 2
              }
              obj.DTHLFCP.push(itemDTHLFCP);
            }
          }
        }
      }
    }



    /** ALTERA '--VALOR--' R$ DAS PARCELAS  */
    onChageAlterarPAC(obj){
      // console.log("onChageAlterarPAC");
      // console.log(obj);
      /*** VERIFICO SE O VALOR E DIFERENTE DO INICIAL */
      if(obj.valorFIX != obj.valorNovoDeito){
      // console.log(this.creditoService.BonusAtual);
      /**  VERIFICO SE JA TEVE ALGUMA BAIXA *NAO PODE TER APROVADO TRATAMENTO  */
      /*** Pego os valores das parcelas que ja foram baixadas  */
        let valorFixBaixado = 0;
        let ExisteBaixa = false;
        let NumParcelasNaBaixadas = 0;
        Object.keys(obj.DTHLFCP).map(function (key) {
          // console.log(obj.DTHLFCP[key]);
          //  console.log(obj.DTHLFCP[key].alterarFCP);
          // console.log( parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS));
          
          if(obj.DTHLFCP[key].alterarFCP == null){
            valorFixBaixado = valorFixBaixado +  parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS);
            ExisteBaixa = true;
            NumParcelasNaBaixadas = NumParcelasNaBaixadas +1;
          }
          //console.log(NumParcelasNaBaixadas);
        });

        if(ExisteBaixa){
            // console.log("VALOR JA BAIXADO");
            // console.log(valorFixBaixado);
            /** o valor nao pode ser MENOR Q O ANTERIOR - pois a alteração e nas futuras  */
            if(this.MD.valorNovoDeito >  this.MD.valorFIX){
              // console.log("numero de parcelas nao baixadas e dentro da qtd escolhida");
              // console.log(NumParcelasNaBaixadas);
              // console.log("valor pago , novo debito ", valorFixBaixado , obj.valorNovoDeito);
              let ParcelasBxMaisUm = NumParcelasNaBaixadas + 1;
              let ValNovoPacs = 0;
              if(obj.Pacelas > ParcelasBxMaisUm){

                let NumParcAlterVAl =  obj.Pacelas - NumParcelasNaBaixadas;
                // console.log("numero parcelas alterar ", NumParcAlterVAl);
                ValNovoPacs = (obj.valorNovoDeito - valorFixBaixado ) / NumParcAlterVAl;

              }else{

                // console.log("numero parcelas alterar ", 1);
                ValNovoPacs = obj.valorNovoDeito - valorFixBaixado;

              }
              // console.log("valor novo parcelas", ValNovoPacs);


              Object.keys(obj.DTHLFCP).map(function (key) {
                // console.log(obj.DTHLFCP[key]);
                // console.log(obj.DTHLFCP[key].alterarFCP);
                // console.log( parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS));
                if(obj.DTHLFCP[key].alterarFCP != null){
                  obj.DTHLFCP[key].valor_ADD_BONUS = ValNovoPacs;
                  obj.DTHLFCP[key].NovoValorFCP = ValNovoPacs;
                }
              });
            }else{
              // console.log("valor menor q o anterior -  nao pode fazer alterações assim!");
              //this.MD.valorNovoDeito = this.MD.valorFIX;
            }

        }else{
          // console.log("NAO EXISTE BAIXA  * APENAS MUDAR VALOR");
          // console.log('recalcula valor X parcela ' );
          // console.log(obj.valorNovoDeito);
          // console.log(obj.Pacelas);
          let novoVal = parseFloat(obj.valorNovoDeito) /  parseFloat(obj.Pacelas);
          // console.log(novoVal);
          Object.keys(obj.DTHLFCP).map(function (key) {
            // console.log(obj.DTHLFCP[key]);
            // console.log(obj.DTHLFCP[key].alterarFCP);
            // console.log( parseFloat(obj.DTHLFCP[key].valor_ADD_BONUS));
            obj.DTHLFCP[key].valor_ADD_BONUS = novoVal;
            obj.DTHLFCP[key].NovoValorFCP = novoVal;
            //obj.DTHLFCP[key].corFCP = 3;
            //console.log(valorFixBaixado);
          });
        }
      }else{
        // console.log("valor inicial nao alterado");
      }
    }

     
    onChageAlterar(){
      //  console.log("onChageValADD");
      //  console.log(this.MD);
      

      if(this.MD.valorNovoDeito < 0 ){
        // console.log("valid 1");
        this.MD.valorNovoDeito = 0;
      }

      if(this.MD.valorNovoDeito > this.MD.valorMax && this.MD.TipoParcela == 'D' ){
        // console.log("valid 2");
        this.MD.valorNovoDeito = 0;
      }

          this.MD.valor_total = this.MD.valorNovoDeito;
     

      // console.log(this.MD);
    }

    onChageAlterar2(){
      //  console.log("onChageValADD");
      //  console.log(this.MD);
      

      if(this.MD.valorNovoDeito < 0 ){
        //  console.log("valid 1");
        this.MD.valorNovoDeito = 0;
      }

      if(this.MD.valorNovoDeito > this.MD.valorMax && this.MD.TipoParcela == 'D' ){
        // console.log("valid 2");
        this.MD.valorNovoDeito = 0;
      }

        if( parseFloat(this.MD.valorNovoDeito) <=   parseFloat(this.MD.valorMax)){
          // console.log("valid 3");
          this.MD.valor_total =  parseFloat(this.MD.valorMax)  - parseFloat(this.MD.valorNovoDeito);
        }
         
     

      // console.log(this.MD);
    }


    Deletar(Modal){
      // console.log("Deletar");

      // console.log(this.MD);
      // console.log(this.FincTrselectedRow);
      // console.log(this.FincTrselectedRowObj);

      // console.log("------------------------------------");

      if( this.PacienteSelec == null ){
        return false;
      }

      if( ( typeof this.FincTrselectedRow !== 'undefined' ) && ( this.FincTrselectedRow !== null ) ){
      

        this.MD = {};
        this.MD.vencimento = this.FincTrselectedRowObj.dt_transacao; //this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
        //this.FormDataPagChanger(this.MD.vencimento);
        this.MD.acaoBD = 'e';
        this.MD.valorNovoDeito = this.FincTrselectedRowObj.valor_bonus;
        this.MD.valorMax = this.FincTrselectedRowObj.valor_bonus;
        this.MD.valor_total = this.FincTrselectedRowObj.valor_bonus;
        this.MD.valor_total_Old = this.FincTrselectedRowObj.valor_total;
        this.MD.id = this.ObjSelec.PacienteSelec.chave;
        //this.FormDataShow(this.FincTrselectedRowObj.dt_transacao);
        this.MD.transacao = this.FincTrselectedRowObj.transacao;
        this.MD.TipoParcela = this.FincTrselectedRowObj.transacao;
        this.MD.chaveTratamento = this.FincTrselectedRowObj.cd_tipo_tratamento;
        this.MD.chave_Ob = this.FincTrselectedRowObj.chave;
        this.MD.dt_transacao = this.FincTrselectedRowObj.dt_transacao;
        this.MD.cd_paciente = this.FincTrselectedRowObj.cd_paciente;
        
       

        
        this.openModal(Modal, 'modal-lg');
       
        // console.log(this.MD);

      
      }else{
          alert("Selecione primeiro! ");
      }
    }

    DeletarExe(Modal){
      // console.log("Deletar");

      this.Process = true;
      this.hiderModal(); 

      this.MD.paciente_unidade = this.UnidadeDados.paciente_unidade;
      this.MD.cd_filial = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.IsAdm = this.IsAdm;

      // console.log(this.MD);

      this.creditoService.DellBonusDebito(this.MD).subscribe(data => {
        // console.log('DellBonusDebito RET');
        // console.log(data);
        // console.log(this.creditoService.RESDellBonusDebito);
        if(this.creditoService.RESDellBonusDebito.error){
          this.alertMe(this.creditoService.RESDellBonusDebito.msg);
        }
        this.FincTrselectedRow = null
        this.FincTrselectedRowObj = null;
        this.GetFinac();
        this.Process = false;
      });
    }

    onchagerPagForm(F){
      // console.log("onchagerPagForm");
      // console.log(this.MD);
      // console.log(F);
      this.GetItemInObj(F, this.ListFormaPG);
      this.ListpacCriar(this.MD.ItemInObj.maxparcelas);
      //  console.log(this.MD);
      if(!this.MD.parces || this.MD.parces > this.MD.ItemInObj.maxparcelas){
        this.MD.parces = 1;
      }
      

      if(this.MD.TipoParcela == 'L00000020110310134731'){
        this.MD.parces = 1;

      }


    }

    /***alterar forma de pagamento de credito ja adicionado */
    onchagerPagFormAlt(obj){
      // console.log("onchagerPagFormAlt");
      // console.log(this.MD);
      // console.log(obj);
      // console.log("VERIFICO SE EXISTE ALGUMA BAIXA PARA PODER MUDAR A FORMA DE PAGAMENTO ");
        let existeBaixa = false;
        Object.keys(obj.DTHLFCP).map(function (key) {
            // console.log(obj.DTHLFCP[key]);
            /*** verifico se a data da baixa ainda e futura - ja vem do back */
            if(obj.DTHLFCP[key].alterarFCP == null){
                  // console.log("JA DEU BAIXA NESSA PARCELA ");
                  existeBaixa = true
            }
        });
      /** CASO NAO EXISTA BAIXA  */
      if(!existeBaixa){ 
          // console.log("pode mudar forma de pagamento "); L00000020100620202853 L00000020100620202851
          // console.log("se mudar para dineiro fixa as parcelas em uma 1");
          this.GetItemInObj(this.MD.TipoParcela, this.ListFormaPG);
          this.ListpacCriar(this.MD.ItemInObj.maxparcelas);
          // console.log(this.MD);
          if(!this.MD.Pacelas || this.MD.Pacelas > this.MD.ItemInObj.maxparcelas){
            this.MD.Pacelas = 1;
            this.onchagerAltParcela(this.MD);
          }


          if(this.MD.TipoParcela == 'L00000020110310134731' || this.MD.TipoParcela == 'L01300020160725130407'  ){
            this.MD.Pacelas = 1;
            this.onchagerAltParcela(this.MD);
          }
      }else{
        /** existe baixa e esta tendo muda a forma de pagamento fecha modal  */
        if(this.MD.TipoParcela == 'L00000020110310134731' || this.MD.TipoParcela == 'L01300020160725130407'|| !this.MD.Pacelas || this.MD.Pacelas > this.MD.ItemInObj.maxparcelas ){
            this.hiderModal(); 
        }
      }
    }


    GetItemInObj(data,obj){
      // console.log("GetItemInObj");
      // console.log(data);
      return obj.forEach(element => {
          // console.log(element);
          if(element.chave == data){
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            // console.log(element);
            this.MD.ItemInObj = element;
          }
      });
    };


    Devolucao(Modal){
      // console.log("Devolucao");

      if( this.PacienteSelec == null ){
        return false;
      }

      this.FincTrselectedRow = null
      this.FincTrselectedRowObj = null;

      this.MD = {};

        if( ( typeof this.ObjSelec !== 'undefined' ) && ( this.ObjSelec.PacienteSelec !== null ) && ( this.ObjSelec.PacienteSelec.chave !== null ) ){

          this.MD.vencimento = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
          this.FormDataPagChanger(this.MD.vencimento);
          this.MD.acaoBD = 'a'; // alterar permissao
          this.MD.valorNovoDeito = 0;
          this.MD.valor_total = 0; 
          this.MD.TipoParcela =  'D';  // 'L00000020110310134731'; // Dinheiro 
          this.MD.tipo_movimento = 'D';
          this.MD.PagForm = 'L00000020110310134731'; //dinheiro
          this.MD.parces = 1;
          this.MD.PlanoConta = this.MD.planoContaAtual =  this.ListPlanoConta[0].chave;
          this.MD.NomePacienteSelect = this.ObjSelec.PacienteSelecNome;
          this.MD.cd_paciente = this.ObjSelec.PacienteSelec.chave;

          //console.log(this.ListTratamentos); 
          if( this.ListTratamentos && this.ListTratamentos[0] != null && this.ListTratamentos[0].chave != null ){
              this.MD.chaveTratamento = this.ListTratamentos[0].chave;
          }


          let dados = {
            'id'                : this.ObjSelec.PacienteSelec.chave,
            'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
            'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
            'USERID'            : this.SelectClinicaDados.USERID,
            'PGnome'            : this.SelectClinicaDados.PGnome,
          };
          

          this.creditoService.BonusCreditAtual(dados).subscribe(data => {
            // console.log('BonusCreditAtual');
            // console.log(data);
            this.MD.valor_total = data.valor_total;
            this.MD.valorMax = data.valor_total;
            
            // console.log(this.MD);
          });



          // console.log("trat ");
          // console.log(this.ListTratamentos); 
          // console.log(this.MD);
          // console.log(this.ListTipoParcela);
          // console.log("paciente ");
          // console.log(this.ObjSelec);
          // console.log(this.ObjSelec.PacienteSelec);

          this.openModal(Modal, 'modal-lg');

        }
    }

    DevolucaoExe(obj){
      // console.log("DevolucaoExe");

      this.Process = true;
      this.hiderModal(); 

      this.MD.paciente_unidade = this.UnidadeDados.paciente_unidade;
      this.MD.cd_filial = this.SelectClinicaDados.cd_unidade_atendimento;
      this.MD.USERID = this.SelectClinicaDados.USERID;
      this.MD.PGnome = this.SelectClinicaDados.PGnome;
      this.MD.unidade = this.SelectClinicaDados.unidade;
      this.MD.IsAdm = this.IsAdm;
      //ObjSelec.PacienteSelecNome


      // console.log(this.MD);

      this.creditoService.BonusDevolucao(this.MD).subscribe(data => {
        // console.log('DellBonusDebito RET');
        // console.log(data);
        // console.log(this.creditoService.RESDellBonusDebito);
        if(this.creditoService.RESBonusDevolucao.error){
          this.alertMe(this.creditoService.RESBonusDevolucao.msg);
        }
        this.FincTrselectedRow = null
        this.FincTrselectedRowObj = null;
        this.GetFinac();
        this.Process = false;
      });
    }



    Transfere(Modal){
      // console.log("Transfere");
      // console.log(this.FincTrselectedRowObj);
      // console.log( this.ObjSelec);

      if( this.PacienteSelec == null ){
        return false;
      }

      this.FincTrselectedRow = null
      this.FincTrselectedRowObj = null;

      this.MD = {};
      this.ListPacientesTransf = [];
      this.CredTranfPacient = null;

        if( ( typeof this.ObjSelec !== 'undefined' ) && ( this.ObjSelec.PacienteSelec !== null )&& ( this.ObjSelec.PacienteSelec.chave !== null ) ){

          this.MD.vencimento = this.startDateDia +'/'+ this.startDateMes +'/'+ this.startDateAno;
          this.FormDataPagChanger(this.MD.vencimento);
          this.MD.acaoBD = 'a'; // alterar permissao
          this.MD.valorNovoDeito = 0;
          this.MD.valor_total = 0; 
          this.MD.TipoParcela =  'D';  // 'L00000020110310134731'; // Dinheiro 
          this.MD.tipo_movimento = 'D';
          this.MD.PagForm = 'L00000020110310134731'; //dinheiro
          this.MD.parces = 1;
          this.MD.PlanoConta = this.MD.planoContaAtual =  this.ListPlanoConta[0].chave;
          this.MD.NomePacienteSelect = this.ObjSelec.PacienteSelecNome;
          this.MD.cd_paciente = this.ObjSelec.PacienteSelec.chave;

          //console.log(this.ListTratamentos); 
          if( this.ListTratamentos && this.ListTratamentos[0] != null && this.ListTratamentos[0].chave != null ){
              this.MD.chaveTratamento = this.ListTratamentos[0].chave;
          }


          let dados = {
            'id'                : this.ObjSelec.PacienteSelec.chave,
            'paciente_unidade'  : this.UnidadeDados.paciente_unidade,
            'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
            'USERID'            : this.SelectClinicaDados.USERID,
            'PGnome'            : this.SelectClinicaDados.PGnome,
          };
          

          this.creditoService.BonusCreditAtual(dados).subscribe(data => {
            // console.log('BonusCreditAtual');
            // console.log(data);
            this.MD.valor_total = data.valor_total;
            this.MD.valorMax = data.valor_total;
            
            // console.log(this.MD);
          });



          // console.log("trat ");
          // console.log(this.ListTratamentos); 
          // console.log(this.MD);
          // console.log(this.ListTipoParcela);
          // console.log("paciente ");
          // console.log(this.ObjSelec);
          // console.log(this.ObjSelec.PacienteSelec);

          this.openModal(Modal, 'modal-lg');

        }
    }

    TransfereExe(){
      // console.log("TransfereExe");
      // console.log( this.MD);
      // console.log( this.CredTranfPacient );

      if( (this.CredTranfPacient != null ) && (this.MD.valorNovoDeito > 0 ) ){

          this.Process = true;
          this.hiderModal(); 

          this.MD.paciente_unidade = this.UnidadeDados.paciente_unidade;
          this.MD.cd_filial = this.SelectClinicaDados.cd_unidade_atendimento;
          this.MD.USERID = this.SelectClinicaDados.USERID;
          this.MD.PGnome = this.SelectClinicaDados.PGnome;
          this.MD.unidade = this.SelectClinicaDados.unidade;
          this.MD.IsAdm = this.IsAdm;

          this.MD.CredTranfPacient = this.CredTranfPacient;

          // console.log(this.MD);

          this.creditoService.BonusTranferCredito(this.MD).subscribe(data => {
            // console.log('DellBonusDebito RET');
            // console.log(data);
            // console.log(this.creditoService.RESDellBonusDebito);
            // if(this.creditoService.RESBonusDevolucao.error){
            //   this.alertMe(this.creditoService.RESBonusDevolucao.msg);
            // }
            this.GetFinac();
            this.Process = false;
          });
            
          
      
      
      }else{
        /*** erros de preenchimento  */
        if(this.MD.CredTranfPacient == null ){ this.alertMe("Selecione o Paciente que recebera o crédito "); }
        if(this.MD.valorNovoDeito <= 0 ){ this.alertMe("Valor deve ser maior que zero."); }

        this.Process = false;
      }




    }


    /*** RECALCULA VALOR DISPONIVEL COM BASE NOS DADOS ATIVOS NO BANCO DE DADOS */
    RecalcularSaldoDispMd(Modal){
      // console.log("RecalcularSaldoDispMd");

      if( this.PacienteSelec == null ){
        return false;
      }

      this.openModal(Modal, 'modal-lg');

    }

    RecalcularSaldoDisp(){
      // console.log("RecalcularSaldoDisp");

      if( this.PacienteSelec == null ){
        return false;
      }
      
      this.Process = true;
      this.hiderModal(); 

      
      let dados = {
        'cd_paciente'       : this.ObjSelec.PacienteSelec.chave,
        'unidade'           : this.SelectClinicaDados.unidade,
        'cd_filial'         : this.SelectClinicaDados.cd_unidade_atendimento,
        'USERID'            : this.SelectClinicaDados.USERID,
        'PGnome'            : this.SelectClinicaDados.PGnome,
        'acaoBD'            : 'a', // alterar permissao
      };

      this.creditoService.RecalcularSaldoDisp(dados).subscribe(data => {
        //  console.log('RecalcularSaldoDisp RET');
        // console.log(data);
        // console.log(this.creditoService.RESDellBonusDebito);
        // if(this.creditoService.RESBonusDevolucao.error){
        //   this.alertMe(this.creditoService.RESBonusDevolucao.msg);
        // }
        this.GetFinac();
        this.Process = false;
      });



    }




    showVal(){
      console.log("showVal");
      console.log(this.ListFinancGrid);
    }



    /**bucar paciente clinica tranfere credito */
    GetPacienteStringTF(item){
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
                                      console.log(data);
                                      this.addListNomePacientes2(data);
                                      // this.ListPacientesTransf = data ;
                                      //  this.ListNomePacientes.push(Object.assign({}, data ));
                });
        }
    }



    /** ESta função une os Arrays sem dupliucar os dados - serve para o select com filtro */
    addListNomePacientes2(obj){
      let arrayNome = [];
      //console.log(this.ListNomePacientes);
        Object.keys(obj).map(function (key) {
          //console.log(obj[key].nome);
          let i = {label: obj[key].nome  , value: obj[key].chave, CPF: obj[key].cpf, unidade: obj[key].nm_unidade_atendimento } ;
          arrayNome.push(i);
          //this.ListNomePacientes.push(i)
        });
        this.ListPacientesTransf = arrayNome;
    }


    onNamePSelected(item){
      // console.log("onNamePSelected");
      // console.log(item);

      this.CredTranfPacient = item.value;

    }

    





    /**
     * verifica se e null ou empety e retorna true caso for 
     * @param val object ou any 
     */
    isNullOrEmpety(val){
      // console.log("isNullOrEmpety");
      if(val == '' || val == null){
        return true;
      }
      return false;
    }




    a(){ }

    public print = (): void => {
      window.print();
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

    FormDataPagChanger(data){
      // console.log("FormDataPagChanger");
      // console.log(data);
        //let dataOk  = subs
        let arr = data.split("/").reverse();
        //console.log(arr);
        let teste = new Date(arr[0], arr[1] - 1, arr[2]);
        //var dia = teste.getDay()+1;
        //console.log(teste.getDay()+1);
        this.MD.vencimentoMsql = arr[0] +"-"+ arr[1] +"-"+ arr[2];
        this.MD.diaNome  = this.DiasSemana[teste.getDay()+1];
    };

    FormDataShow(data){
      // console.log("FormDataShow");
      // console.log(data);
        let arr = data.split("-").reverse();
        this.MD.vencimento = arr[0] +"/"+ arr[1] +"/"+ arr[2];
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

    alertMe(MSG): void {
      setTimeout(function(): void {
        alert(MSG);
      });
    }

    /*** EXIBE O NUMERO DO CARTAO SEPARA PARA 2 INPUTS GANB KKK */
    showNumCartaoIniFim(numComplet,part){
      // console.log("showNumCartaoIniFim");
      // console.log(numComplet);
      if(!numComplet){  return '0000';  }

      if(numComplet.includes("-")){
        let numArray = numComplet.split("-");
        // console.log(numArray);
        return numArray[part];
      }else{
        if(part == 1){
          return numComplet;
        }
      }
      return '0000';
    }



}
