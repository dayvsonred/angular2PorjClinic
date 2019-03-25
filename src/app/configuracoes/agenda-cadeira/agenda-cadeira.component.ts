import { element } from 'protractor';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { IMyDpOptions } from 'mydatepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { ContaCorrenteClinicaService } from '../.././financeiro/conta-corrente-clinica/conta-corrente-clinica.service';
import { AgendaConfigCadeiraService } from './agenda-cadeira.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthService } from '../../auth/auth.service';
import { AllService } from '../../all.service';
import { Router } from '@angular/router';




// export function getTimepickerConfig(): TimepickerModule {
//   return Object.assign(new TimepickerModule(), {
//     readonlyInput: false,
//   });
// }


@Component({
  selector: 'app-agenda-cadeira',
  templateUrl: './agenda-cadeira.component.html',
  styleUrls: ['./agenda-cadeira.component.css'],

  // providers: [{ provide: TimepickerModule, useFactory: TimepickerModule }]
})





export class AgendaCadeiraComponent implements OnInit {


  


  // SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
  //   'chave'                  : 'L00500020160329092221', 
  //   'unidade'                : 'L00500020160329092221',  //mudae id nome obj para unidade - melhorar intendimento
  //   'nm_unidade_atendimento' : 'Clinica Bom Pastor - Teofilo Otoni', 
  //   'cd_unidade_atendimento' : '038',
  //   'USERID'                 : 'L00500020160620140212', // - ID solucoes ADM
  //   'PGnome'                 : 'Cadeiras', // nome PG
  //  'BaseIndex'               : null,
  //   'DataHoje'               : null 
  // }; 


    // SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
    //   'chave'                  : 'L00200020130130174652', 
    //   'unidade'                : 'L00200020130130174652',  //mudae id nome obj para unidade - melhorar intendimento
    //   'nm_unidade_atendimento' : 'Nossa Clinica - Americana', 
    //   'cd_unidade_atendimento' : '005',
    //   'USERID'                 : 'L00500020160620140212', // - ID solucoes ADM
    //   'PGnome'                 : 'Cadeiras', // nome PG
    //  'BaseIndex'               : null,
    //   'DataHoje'               : null 
    // }; 


    SelectClinicaDados  = { // este objeto tem q ser criado pelo sistema (ngOnInit) para q possa saber de qual clinica esta selecionanda
      'chave'                  : '', 
      'unidade'                : '',  //mudae id nome obj para unidade - melhorar intendimento
      'nm_unidade_atendimento' : '', 
      'cd_unidade_atendimento' : '',
      'USERID'                 : '', // - ID solucoes ADM
      'PGnome'                 : 'Cadeiras', // nome PG
     'BaseIndex'               : null,
      'DataHoje'               : null,
      'rotaAcao'               : 'ag2',
      'chaveUsuario'           : null,
      'cd_filial'              : null,
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
    /*** AND select 2 */

    ListUnidade               : any;
    UnidadeNome               : any;
    PeriodoAgenda             : any;
    NumCadeiraClinica         : number = 1;
    CadeiraSelectTab          : number = 1;
    SemanaIni                 : any;
    DiasSemanaAtual           : Array<any> = [];
    CliniConfig               : any;
    CliniFuncionaManha        : any;
    CliniFuncionaTarde        : any;
    CliniIntervalo            : any;
    CaregandoCaderas          : boolean = false;
    MD                        : any;
    SemanaDiaHorariosMedic    : any;
    DrHorariosDia             : any;
    CadeiraRowPx              : number = 17;
    ObjHorarioAgendar         : any;
    SelectTipoAgDr            : Array<any> = [];
    DrUnidade                 : any;
    IntervaloConsultas        : Array<any> = [];
    PrestadorSelected         : any;
    ErroData                  : boolean = false;  
    ErroPrestador             : boolean = false;  
    ERROMSGDATA               : any;
    ERROMSGPrestador          : any;
    ErroHoraFim               : any;
    ERROMSGHoraFim            : any;
    ErroMotivo                : any;
    ERROMSGMotivo             : any;
    ModalErro                 : any;
    PermitirAltera            : any;
    tabId                     : any;
    AcProssec                 : boolean = false;  
    BtBuscarProcess           : boolean = false;  
    DrCadeDupli               : any;
    CadeirasSenalAll          : any;
    DrCadeDupliShow           : any;
    DellProcess               : any;
    HrCadeiraOcultas          : any;
    // HoraIniArrayMd            : any;
    // mytimeCad1                : Date = new Date();
    // mytimeCad2                : Date = new Date();

    tabs = [
      {
        'heading': 'test 0',
        'active': true
      }
    ];

    public model: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public model1: any; // = { date: { year: this.startDateAno, month: this.startDateMes, day: this.startDateDia } };
    public modelfix: any;
    
    

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

    public myDatePickerOptionsB: IMyDpOptions = {
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
      //this.modalRef = this.modalService.show(template);
        if (!classT){  classT =  'md-Full';  }

      this.modalRef = this.modalService.show(template, {class: classT});
      
    }
    
    public hiderModal(){
        // console.log("hiderModal");
        this.modalRef.hide();
        
    }

  constructor(  private contaCorrenteClinicaService : ContaCorrenteClinicaService,
                private AgendaConfigCadeiraService : AgendaConfigCadeiraService, 
                private AllService : AllService, 
                private modalService: BsModalService,
                private authService: AuthService,
                private router: Router) { 

                  
                  this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
                  this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
                  this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
                  this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
                  this.SelectClinicaDados.USERID = authService.RESUserValid.dados[0].USERID;
                  this.SelectClinicaDados.BaseIndex = this.contaCorrenteClinicaService.URLIndex;
                  this.PermitirAltera = false;
                  this.AcProssec = true;
                              
                  // console.log(" cadeira constructor");

                }

    ngOnInit() {
      this.UnidadeNome = this.SelectClinicaDados.nm_unidade_atendimento;
      this.DrHorariosDia = [];
      this.DrCadeDupli = {};
      this.DrCadeDupliShow = [];
      this.HrCadeiraOcultas = [];
      this.CadeiraSelectTab = 1;
      this.AcProssec = true;
      
      this.SelectTipoAgDr = this.AgendaConfigCadeiraService.SelectTipoAgDr();

          /** apenas para preenche array com nome de unidade para ususario porde mudar de unidade  */
          let dadosUnid = {
            'chaveUsuario'  : this.SelectClinicaDados.USERID,
          }
          if( typeof this.ListUnidade === 'undefined' ){
            // this.contaCorrenteClinicaService.GetSelcUnidadeB(dadosUnid).subscribe(res=>this.ListUnidade=res);
            this.AllService.PostUrl(dadosUnid,'GetSelcUnidadeB').subscribe(res=>this.ListUnidade=res);
            
          }
          this.GetNumCadeiras(true);
          
      console.log("20180802.09v");
      console.log(this.SelectClinicaDados);

      this.changeTab();

     
      // this.GetaddHorariosMarcados(1);
      // this.AgendaConfigCadeiraService.NumCadCli(this.SelectClinicaDados.unidade).subscribe(res => {  this.CreatNunCadeirasTabs(res); });
      //this.AgendaConfigCadeiraService.ClinConfig(this.SelectClinicaDados.cd_unidade_atendimento).subscribe( res=>this.CliniConfig=res ); // res=>this.LancCaixaAnterioShow=res 
    }


    changeTab() {
      this.tabs[0].active = true;
      // console.log("in change()");
    }

    /** BUsco quantas cadeiras tem a CLINICA E A DATA INICIO DA SEMANA ATUAL */
    GetNumCadeiras(next){
      if(this.AcProssec == false){
            this.AcProssec = true;
      }
      this.DrCadeDupli = {};
      this.AgendaConfigCadeiraService.NumCadCli(this.SelectClinicaDados.unidade).subscribe(res => {
        this.NumCadeiraClinica  = res[0].cadeiras;
        this.SemanaIni  = this.AgendaConfigCadeiraService.RESNumCadCli.SemanaIni; 
        // console.log(this.AgendaConfigCadeiraService.RESNumCadCli);
        this.SelectClinicaDados.chave =res[0].chave; 
        this.SelectClinicaDados.unidade = res[0].chave; 
        this.SelectClinicaDados.nm_unidade_atendimento = res[0].nm_unidade_atendimento; 
        this.SelectClinicaDados.cd_unidade_atendimento = res[0].cd_unidade_atendimento; 
        this.CreatNunCadeirasTabs(next);

      });
     
    }

    /** vai gerar os horarios q a clinica anten o array */
    CreatNunCadeirasTabs(next){
          if(this.AcProssec == false){
                this.AcProssec = true;
          }
          // console.log("CreatNunCadeirasTabs");
          let arrayData = this.SemanaIni.split('-');
          // console.log(arrayData);
          var dat = new Date(arrayData[0],(arrayData[1] - 1),arrayData[2]); /*2014, 1, 1*/
          // console.log("dia gerado");
          //  console.log(dat);
          // let dia {
          //   dia
          // }

          // console.log("aaaaaaaa");
          // console.log(dat.getDate());
          // console.log(dat.getFullYear());
          // console.log(dat.getMonth());

          let dia = dat.getDate() < 10 ? '0'+dat.getDate() : dat.getDate();
          let mes = ( dat.getMonth() + 1 )  < 10 ? '0'+ ( dat.getMonth() + 1 ) : ( dat.getMonth() + 1 ) ;
          let diaData = dia +"/"+ mes +"/"+dat.getFullYear();

          this.DiasSemanaAtual =[];
          this.DiasSemanaAtual.push(diaData);

          this.CliniIntervalo = [];

          // console.log("loopp");
            for (let i = 1; i < 7; i++){
              //console.log(i);
              //console.log(dat.getDate() + 1);
              dat.setDate(dat.getDate() + 1);
              //console.log(dat);
              let dia = dat.getDate() < 10 ? '0'+dat.getDate() : dat.getDate();
              let mes = ( dat.getMonth() + 1 )< 10 ? '0'+( dat.getMonth() + 1 ) : ( dat.getMonth() + 1 );
              let diaData = dia +"/"+ mes +"/"+dat.getFullYear();

              this.DiasSemanaAtual.push(diaData);
            }

          // console.log("array dias");
          // console.log(this.DiasSemanaAtual);

          /** ***********************************************************
           * horario funcionanmeto MANHA
           ****************************************************************/
          //  console.log("horario funcionamento clinica");
          //  console.log(this.AgendaConfigCadeiraService.RESNumCadCli.HorarioClinica.dados);
          let dadosClinica = this.AgendaConfigCadeiraService.RESNumCadCli.HorarioClinica.dados[0];
          // console.log(dadosClinica);
          let datPHora = new Date(2014,11,11); /*2014, 1, 1*/
          let horaArrayINI = dadosClinica.horario_manha_inicio.split(':');
          // console.log(horaArrayINI);
          datPHora.setHours(horaArrayINI[0],horaArrayINI[1],horaArrayINI[2]);
          let datPHoraF = new Date(2014,11,11); /*2014, 1, 1*/
          let horaArrayFim = dadosClinica.horario_manha_fim.split(':');
          // console.log(horaArrayFim);
          datPHoraF.setHours(horaArrayFim[0],horaArrayFim[1],horaArrayFim[2]);
          let duracao_horario = parseInt(dadosClinica.duracao_horario);
          // console.log(duracao_horario);
          let horaFuncionaClinica = [];
          let horaString = '';
          let H,M,OJBH;

          H = datPHora.getHours() > 9 ? datPHora.getHours() : '0' + datPHora.getHours();
          M = datPHora.getMinutes() > 9 ? datPHora.getMinutes() : '0' + datPHora.getMinutes();
          horaString = H +":"+ M +":00";

            OJBH = {
              'hora' : horaString
            }

          horaFuncionaClinica.push(OJBH);


          for (let k = 1; datPHora < datPHoraF; k++){
            //console.log(datPHora.getHours() +"-"+ datPHora.getMinutes());
            datPHora.setMinutes(datPHora.getMinutes() + duracao_horario);

            H = datPHora.getHours() > 9 ? datPHora.getHours() : '0' + datPHora.getHours();
            M = datPHora.getMinutes() > 9 ? datPHora.getMinutes() : '0' + datPHora.getMinutes();
            horaString = H +":"+ M +":00";

            OJBH = {
              'hora' : horaString
            }

            /** nao deixa add hora igual para nao tem o horario fim add aqui */
            // if(datPHora != datPHoraF){
              horaFuncionaClinica.push(OJBH);
            // }
           

            
          }
          // let remover = horaFuncionaClinica.length - 1;
          // console.log("remover num0",remover );
          // console.log(  horaFuncionaClinica.length);
          // console.log(  horaFuncionaClinica);
          // console.log(this.CliniFuncionaManha);

          // horaFuncionaClinica = horaFuncionaClinica.slice( remover, 1);
          this.CliniFuncionaManha = horaFuncionaClinica;
          // console.log("arrary horas  MANHAM");
          
          // console.log(  horaFuncionaClinica.length);
          // console.log(this.CliniFuncionaManha);

          /** ***********************************************************
           * horario funcionanmeto TARDE
           * Add horaios de funcionanmento iniocio e fim da parte da tarde
           ****************************************************************/
          // console.log("INI HORARIOS DA TARDE");
          let horaTArrayINI = dadosClinica.horario_tarde_inicio.split(':');
          // console.log(horaTArrayINI);
          datPHora.setHours(horaTArrayINI[0],horaTArrayINI[1],horaTArrayINI[2]);
          let horaTArrayFim = dadosClinica.horario_tarde_fim.split(':');
          // console.log(horaTArrayFim);
          datPHoraF.setHours(horaTArrayFim[0],horaTArrayFim[1],horaTArrayFim[2]);
          // console.log("ini fim tarde");
          // console.log(datPHora);
          // console.log(datPHoraF);

          horaFuncionaClinica = [];
          horaString = '';

          H = datPHora.getHours() > 9 ? datPHora.getHours() : '0' + datPHora.getHours();
          M = datPHora.getMinutes() > 9 ? datPHora.getMinutes() : '0' + datPHora.getMinutes();
          horaString = H +":"+ M +":00";

            OJBH = {
              'hora' : horaString
            }


            /** calcula horas do intervalo da clinica caso exista */
            let datHoraManhFim = new Date(2014,11,11); /*2014, 1, 1*/
            let datHoraTardFim = new Date(2014,11,11); /*2014, 1, 1*/
            datHoraManhFim.setHours(horaArrayFim[0],horaArrayFim[1],horaArrayFim[2]);
            datHoraTardFim.setHours(horaTArrayINI[0],horaTArrayINI[1],horaTArrayINI[2]);


          /** para nao repetir o horario de 12h popr exemplo fim as 12h e ini as 12h */ 
          if(dadosClinica.horario_manha_fim != dadosClinica.horario_tarde_inicio ){
            // console.log("add hora igual #$%$%$%$%$%$%$%$%$$%");
                //  horaFuncionaClinica.push(OJBH);



                  /**remove o ultimo horario do array da mnham fim para nao repetir 12h*/
                  let num = this.CliniFuncionaManha.length -1;
                  // let ararasd = Object.assign({}, this.CliniFuncionaManha); 
                  // console.log("arary uiten amamamma");
                  // console.log(ararasd);
                  this.CliniFuncionaManha.splice(num,1);
                  // console.log("novovoovov arary");
                  // console.log( this.CliniFuncionaManha);
                  // console.log(num);

                  //this.CliniFuncionaManha 

                //  console.log("verificar o tempo de diferencia add intervalo");
                //  console.log('manhan fim..',datHoraManhFim);
                //  console.log('tarde inicio',datHoraTardFim);

                  H = datHoraManhFim.getHours() > 9 ? datHoraManhFim.getHours() : '0' + datHoraManhFim.getHours();
                  M = datHoraManhFim.getMinutes() > 9 ? datHoraManhFim.getMinutes() : '0' + datHoraManhFim.getMinutes();
                  horaString = H +":"+ M +":00";
      
                  OJBH = {
                    'hora' : horaString
                  }

                  // console.log(OJBH);
      
                    horaFuncionaClinica.push(OJBH);
                

                  for (let k = 1; datHoraManhFim < datHoraTardFim; k++){
                      //console.log(datPHora.getHours() +"-"+ datPHora.getMinutes());
                      datHoraManhFim.setMinutes(datHoraManhFim.getMinutes() + duracao_horario);
                      H = datHoraManhFim.getHours() > 9 ? datHoraManhFim.getHours() : '0' + datHoraManhFim.getHours();
                      M = datHoraManhFim.getMinutes() > 9 ? datHoraManhFim.getMinutes() : '0' + datHoraManhFim.getMinutes();
                      horaString = H +":"+ M +":00";
          
                      OJBH = {
                        'hora' : horaString
                      }

                      // console.log(OJBH);
          
                    horaFuncionaClinica.push(OJBH);
                  }

              this.CliniIntervalo = horaFuncionaClinica;
              // console.log('intervalos horas @@@@', this.CliniIntervalo);
          }



          horaFuncionaClinica = [];
          horaString = '';


          
          H = datHoraTardFim.getHours() > 9 ? datHoraTardFim.getHours() : '0' + datHoraTardFim.getHours();
          M = datHoraTardFim.getMinutes() > 9 ? datHoraTardFim.getMinutes() : '0' + datHoraTardFim.getMinutes();
          horaString = H +":"+ M +":00";

          OJBH = {
            'hora' : horaString
          }

          // console.log(OJBH);
            /** verifico se o primeiro horario da tarde nao esta adicionado ao horario da manha */
              let ultimoHorarioManha = this.CliniFuncionaManha[this.CliniFuncionaManha.length -1].hora;
              // console.log(ultimoHorarioManha);
              // console.log(OJBH.hora);
            if( ultimoHorarioManha != OJBH.hora ){
              // console.log("horario diferente  add");
              horaFuncionaClinica.push(OJBH);
            }

        



          for (let k = 1; datPHora < datPHoraF; k++){
              //console.log(datPHora.getHours() +"-"+ datPHora.getMinutes());
              datPHora.setMinutes(datPHora.getMinutes() + duracao_horario);
              H = datPHora.getHours() > 9 ? datPHora.getHours() : '0' + datPHora.getHours();
              M = datPHora.getMinutes() > 9 ? datPHora.getMinutes() : '0' + datPHora.getMinutes();
              horaString = H +":"+ M +":00";

              OJBH = {
                'hora' : horaString
              }

            horaFuncionaClinica.push(OJBH);
          }

        this.CliniFuncionaTarde = horaFuncionaClinica;
        // console.log("clini horarios ###################################");
        // console.log(this.CliniFuncionaManha);
        // console.log(this.CliniIntervalo);
        // console.log(this.CliniFuncionaTarde);
        /** se for (true) ou a pimeira vez chamar os horarios bloqueados */
        if(next == true){
          this.GetaddHorariosMarcados(this.CadeiraSelectTab);
        }
    }

    GetaddHorariosMarcados(cadeira){
      // console.log("GetaddHorariosMarcados ##########################################");

      // console.log("dados var");
      // console.log(this.model);
      // console.log("---------------------------------------------");
      this.DrCadeDupli = [];
      let dia = this.SemanaIni;

        if(this.model){
          // 07/12/2017
          // console.log("data selecinoda  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          // console.log(this.model.formatted);
          let ArraDia = this.model.formatted.split('/');
          // console.log(ArraDia);
          dia = ArraDia[2] +"-"+ ArraDia[1] +"-"+ ArraDia[0];
        }

        let dados = {
          'semana'                      : this.DiasSemanaAtual,
          'SemanaIni'                   : dia,
          'unidade'                     : this.SelectClinicaDados.unidade,
          'cd_unidade_atendimento'      : this.SelectClinicaDados.cd_unidade_atendimento,
          'cadeira'                     : cadeira
        }

        // console.log(dados);
        this.CadeirasSenalAll = {};
        this.AgendaConfigCadeiraService.AgCadeirasDentiSemana(dados).subscribe(res => {  this.addHorariosMarcados(res); });
    }

    buscarDataSelecionada(){
      //  console.log("buscarDataSelecionada BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
      //  console.log(this.model);
    
      if(this.model){
        console.log("556 AcProssec true", this.AcProssec);
        this.AcProssec = true;
        this.BtBuscarProcess = true;
        // console.log(this.model.formatted);
        // let novaData = this.model.formatted.date.day
        // console.log( this.SemanaIni);

        // let dataUsar = this.model;
        // dataUsar = dataUsar.formatted ? dataUsar.formatted  : dataUsar; 

        // console.log("resolvel?");
        // // console.log(dataUsar);
        // let novaData = new Date(this.model.date.year,this.model.date.month,this.model.date.day);
        // console.log(novaData);
        // console.log(novaData.getMonth);

        // let ArraDia = this.model.formatted.split('/');
        // console.log(ArraDia);
        // this.SemanaIni = ArraDia[2] +"-"+ ArraDia[1] +"-"+ ArraDia[0];

        // let datanova = new Date(this.model.jsdate);
        let datanova = new Date(this.model.date.year,(this.model.date.month -1),this.model.date.day);
        // console.log("+****");
        // console.log(datanova);
        // console.log(datanova.getMonth());
        let diaSemana = datanova.getDay();
        let quantosFaltaPDomingo =   datanova.getDay() ;
        if(quantosFaltaPDomingo > 0){
          let strDats = quantosFaltaPDomingo ;
          datanova.setDate(datanova.getDate() - strDats);
          // console.log("nova darta");
          // console.log(datanova);
        }
        let m  = (datanova.getMonth() +1) > 9 ? (datanova.getMonth() +1) : "0" + (datanova.getMonth() +1) ;
        let d  = datanova.getDate() > 9 ? datanova.getDate()  : "0" + datanova.getDate();
        this.SemanaIni = datanova.getFullYear() +"-"+  m+"-"+ d;
        // console.log("agora");
        // console.log(this.SemanaIni);


        this.CreatNunCadeirasTabs(false);
        this.GetaddHorariosMarcados(this.CadeiraSelectTab);
        this.BtBuscarProcess = false;
      }
      // this.SemanaIni.split('-');
    }

    addHorariosMarcados(obj){
      // console.log("addHorariosMarcados");
      // console.log(obj);
      this.CadeirasSenalAll = obj;
      this.HrCadeiraOcultas = [];

      // console.log(this.CliniIntervalo);

      let dadosClinica = this.AgendaConfigCadeiraService.RESNumCadCli.HorarioClinica.dados[0];
      // console.log(dadosClinica);
      
      this.DrHorariosDia = []; 
      let HrCadeiraOcultas = [];
      var DiaLoopPulo = new Date(2014,1,1); /*2014, 1, 1*/
      var DiaLoop = new Date(2014,1,1); /*2014, 1, 1*/

        this.DiasSemanaAtual.forEach(itemDiaLoop => {
            // console.log("acha dia horario e add in arary");
            // console.log(itemDiaLoop);
          let ArrayDay = itemDiaLoop.split('/');
          DiaLoop = new Date(ArrayDay[2],(ArrayDay[1] - 1),ArrayDay[0]); /*2014, 1, 1*/
          DiaLoop.setHours(0,0,1);
          DiaLoopPulo = new Date(ArrayDay[2],(ArrayDay[1] - 1),ArrayDay[0]); /*2014, 1, 1*/
          DiaLoopPulo.setHours(0,0,0);



         
          let datPHoraManha = new Date(ArrayDay[2],(ArrayDay[1] - 1),ArrayDay[0]); /*2014, 1, 1*/
          let horaArrayINI = dadosClinica.horario_manha_inicio.split(':');
          datPHoraManha.setHours(horaArrayINI[0],horaArrayINI[1],horaArrayINI[2]);
          let datPHoraManhaFim = new Date(ArrayDay[2],(ArrayDay[1] - 1),ArrayDay[0]); /*2014, 1, 1*/
          let horaArrayFim = dadosClinica.horario_manha_fim.split(':');
          datPHoraManhaFim.setHours(horaArrayFim[0],horaArrayFim[1],horaArrayFim[2]);

             

          
            this.SemanaDiaHorariosMedic = [];
            this.CliniFuncionaManha.forEach(lpHora => {

              let addHoraio = false;

              let ArrayHora = lpHora.hora.split(':');
              DiaLoop.setHours(ArrayHora[0],ArrayHora[1],ArrayHora[2]);


              if(DiaLoop >= DiaLoopPulo){


                //  console.log("hora tem Dr as : ",DiaLoop ,  DiaLoop.getDay() );

                    /** faço loop para ver se hora tem agendamento Dr */
                    obj.forEach(element => {
                  
                        // console.log(element.data_inicio);
                        // console.log(element.data_fim);
                        // console.log(element.horario_inicio);
                        // console.log(element.horario_fim);
                        // console.log(element.prestador);
                        // console.log("--##--");

                      
              
                        /** Horarios atende bloqueados DR */
                        let dataINIDr = element.data_inicio.split("-");
                        var DiaDrMarcadoINI = new Date(dataINIDr[0],(parseInt(dataINIDr[1]) - 1),dataINIDr[2]); /*2014, 1, 1*/
                        var DiaDrMarcadoINIFim = new Date(dataINIDr[0],(parseInt(dataINIDr[1]) - 1),dataINIDr[2]); /*2014, 1, 1*/
                        let dataFimDr = element.data_fim.split("-");
                        var DiaDrMarcadoFIM = new Date(dataFimDr[0],(parseInt(dataFimDr[1]) - 1),dataFimDr[2]); /*2014, 1, 1*/
                        let horaIniArray = element.horario_inicio.split(":");
                        let horaFimArray = element.horario_fim.split(":");
                        DiaDrMarcadoINI.setHours(horaIniArray[0],horaIniArray[1],horaIniArray[2]);
                        DiaDrMarcadoFIM.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
                        DiaDrMarcadoINIFim.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
                
                        var dif = Date.UTC(DiaDrMarcadoINI.getFullYear(),DiaDrMarcadoINI.getMonth(),DiaDrMarcadoINI.getDate(),DiaDrMarcadoINI.getHours(),DiaDrMarcadoINI.getMinutes(),0) - Date.UTC(DiaDrMarcadoINIFim.getFullYear(),DiaDrMarcadoINIFim.getMonth(),DiaDrMarcadoINIFim.getDate(),DiaDrMarcadoINIFim.getHours(),DiaDrMarcadoINIFim.getMinutes(),0);
                        dif=Math.abs((dif / 1000 / 60 / 60));
  
  
                        DiaDrMarcadoINI.setHours(horaIniArray[0],horaIniArray[1],horaIniArray[2]);
                        DiaDrMarcadoFIM.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);

                        let diaNumSemana = DiaLoop.getDay() + 1;


                         /**** HORAQRIO MANHAM, FIM NAO ALTERADO ---- PARA Q NAO POSSA EXIBIR HORA FIM MAHAN ANTES D INTERVALO  */
                           let datPHoraFixov = new Date(dataINIDr[0],(parseInt(dataINIDr[1]) - 1),dataINIDr[2]);/*2014, 1, 1*/
                          let horaArrayFim2S = dadosClinica.horario_manha_fim.split(':');
                          // console.log(horaArrayFim);
                          datPHoraFixov.setHours(horaArrayFim2S[0],horaArrayFim2S[1],horaArrayFim2S[2]);
                          // console.log("horario manham fim ");
                          // console.log(datPHoraFixov);


                        // console.log("marcado");
                        // console.log(DiaLoop);
                        // console.log("..............marcado", DiaDrMarcadoINI , DiaDrMarcadoFIM , addHoraio) ;
                        // console.log(".....................", (diaNumSemana == element.dia_semana) , (DiaDrMarcadoINI <= DiaLoop), (DiaDrMarcadoINI.getDay() == DiaLoop.getDay()), (DiaDrMarcadoFIM >= DiaLoop), (DiaLoop >= DiaLoopPulo), (DiaDrMarcadoINI.getDay() == DiaLoop.getDay()), DiaLoopPulo );

                          
                          /** Se a hora esta no ranger que o DR atende */
                          if( (addHoraio == false)  &&  (DiaDrMarcadoINI <= DiaLoop) &&  (diaNumSemana == element.dia_semana)  && (DiaDrMarcadoINI.getHours() == DiaLoop.getHours()) && (DiaDrMarcadoINI.getMinutes() == DiaLoop.getMinutes() ) && (DiaDrMarcadoFIM >= DiaLoop)  &&  (DiaLoop >= DiaLoopPulo)  ){ //&& (DiaDrMarcadoINI.getDay() == DiaLoop.getDay())
                              /** Pulo para nao entra na hora varias vezes */
                              DiaLoopPulo.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
                              addHoraio = true;

                              // console.log("entrou add hora  ------------------------------------");
                              // console.log(element);
                              this.DuplicidadeDrCadeira(obj,element);
                              

                              // console.log(".....................-> ######");
                              // console.log("--##--");
                              // console.log("--##--");
                              // console.log("--##--");
                              // console.log(DiaLoop);
                              // console.log(DiaLoop.getDay());
                              // console.log(element);
                              // console.log(element.dia_semana);
                              // console.log(diaNumSemana );
                              // console.log((diaNumSemana == element.dia_semana));
                              // console.log("entro no add array");
                              // console.log(DiaDrMarcadoINI , DiaDrMarcadoFIM ) ;
                              // console.log(addHoraio);
                              // console.log("--##--");
                              // console.log('RANGER', element.data_inicio , element.data_fim);
                              // console.log("HHHHH --->", element.horario_inicio, element.horario_fim);
                              // console.log("---------------->", element.prestador, DiaDrMarcadoINI , DiaDrMarcadoFIM);
                              // console.log("----------------pulo", DiaLoopPulo);
                              // console.log("--##--");
                              // console.log("ok");
                              // let resto =   dif > 1 ? (21 / dif) : 21 ;
                              // let height = (16.1 * (dif * ( ( 60 /  dadosClinica.duracao_horario  ) * 15 ) )  ) ; 
                              // let Xdif = dif < 1 ? 1 : dif;
                              let height = ( dif * ( ( 60 /  dadosClinica.duracao_horario  ) * this.CadeiraRowPx ) ) + 0   ; 

                                let dados = {
                                    'dia'         : itemDiaLoop,
                                    'dif'         : dif,
                                    'dtini'       : element.data_inicio,
                                    'dtfin'       : element.data_fim,
                                    'prestador'   : element.prestador +""+ element.alerta,
                                    'cd_prestador': element.chave_prestador,
                                    'horaIni'     : element.horario_inicio,
                                    'horaFim'     : element.horario_fim,
                                    'livre'       : false,
                                    'intervalo'   : false,
                                    'horaPeriodo' : element.horario_inicio +" - "+ element.horario_fim,
                                    'stlClass'    : element.chave != '' ? 'cadHorarioDr' : 'cadHorariobrock',
                                    'chave'       : element.chave   , 
                                    'aph_chave'   : element.aph_chave  , 
                                    'dt_ultima_edicao' : element.dt_ultima_edicao,
                                    'duracao' : element.duracao,
                                    'height'      : height
                                }

                                // let n = itemDiaLoop.split("/");
                                // let H = element.horario_inicio.split(":");
                                // n = n[0]+""+n[1]+""+n[2]+""+H[0]+""+H[1]+"00";
                                // n = itemDiaLoop +" "+element.horario_inicio;

                                // console.log("++++++++++++ HoDr -> ", element.horario_inicio, itemDiaLoop); 
                                this.SemanaDiaHorariosMedic.push(dados);

                                /**add horario fim para nao ter brecha */
                                let Hs = DiaDrMarcadoFIM.getHours() > 9 ? DiaDrMarcadoFIM.getHours() : '0' + DiaDrMarcadoFIM.getHours();
                                let Ms = DiaDrMarcadoFIM.getMinutes() > 9 ? DiaDrMarcadoFIM.getMinutes() : '0' + DiaDrMarcadoFIM.getMinutes();
                                let HsMs =  Hs +":"+ Ms ;
                                height  = this.CadeiraRowPx;
                                  let dadosB = {
                                        'dia'         : itemDiaLoop,
                                        'dif'         : '',
                                        'dtini'       : '',
                                        'dtfin'       : '',
                                        'prestador'   : '',
                                        'cd_prestador': '',
                                        'horaIni'     : HsMs,
                                        'horaFim'     : '',
                                        'livre'       : true,
                                        'intervalo'   : false,
                                        'horaPeriodo' : HsMs,
                                        'stlClass'    : 'cadHorarioLivre',
                                        'chave'       : '' , 
                                        'aph_chave'   : '' , 
                                        'dt_ultima_edicao' : '',
                                        'duracao' : '',
                                        'height'      : height
                                  }



                                  /*** SE A CLINICA NAO TEM INTERVALO EU ADDD O HORARIO FIM CASO TENHO AI VERIFICO AS CONDIÇOES */
                                  if(this.CliniIntervalo.length < 1){
                                    this.SemanaDiaHorariosMedic.push(dadosB);
                                  }else{
                                  
                                    /** se a hora for diferente de manham fim add */
                                    // console.log("verifica add data ??????????????????????????????");
                                    // console.log(datPHoraFixov,DiaDrMarcadoINIFim);
                                    // console.log(datPHoraFixov.getHours(), DiaDrMarcadoINIFim.getHours(),datPHoraFixov.getMinutes() , DiaDrMarcadoINIFim.getMinutes());
                                    if(  (datPHoraFixov.getHours() != DiaDrMarcadoINIFim.getHours()) && (datPHoraFixov.getMinutes() != DiaDrMarcadoINIFim.getMinutes())  ){
                                        // console.log("data nao add ");
                                        // console.log(datPHoraFixov, DiaDrMarcadoINIFim);
                                        this.SemanaDiaHorariosMedic.push(dadosB);
                                    }

                                  }
                               
                                // console.log("++++++++++++ Hora -> ", HsMs,  itemDiaLoop);   

                                /**remover a hora ini do array (necessario por que o codigo ja estava assim) */
                                this.RemoveHoraArray(itemDiaLoop,DiaDrMarcadoINI.getHours(),DiaDrMarcadoINI.getMinutes());
                          }
                    });

                    if((addHoraio == false) && (DiaLoop > DiaLoopPulo)){
                        /** verificar se horario e vago */

                        let Hs = DiaLoop.getHours() > 9 ? DiaLoop.getHours() : '0' + DiaLoop.getHours();
                        let Ms = DiaLoop.getMinutes() > 9 ? DiaLoop.getMinutes() : '0' + DiaLoop.getMinutes();
                        let HsMs =  Hs +":"+ Ms ;
                        let height  = this.CadeiraRowPx;
                          let dados = {
                                'dia'         : itemDiaLoop,
                                'dif'         : '',
                                'dtini'       : '',
                                'dtfin'       : '',
                                'prestador'   : '',
                                'cd_prestador': '',
                                'horaIni'     : HsMs,
                                'horaFim'     : '',
                                'livre'       : true,
                                'intervalo'   : false,
                                'horaPeriodo' : HsMs,
                                'stlClass'    : 'cadHorarioLivre',
                                'chave'       : '' , 
                                'aph_chave'   : '' , 
                                'dt_ultima_edicao' : '',
                                'duracao' : '',
                                'height'      : height
                          }

                        // let n = itemDiaLoop.split("/");
                        // let H = HsMs.split(":");
                        // n = n[0]+""+n[1]+""+n[2]+""+H[0]+""+H[1]+"00";
                        // n = itemDiaLoop +" "+HsMs;

                        this.SemanaDiaHorariosMedic.push(dados);
                        // console.log("++++++++++++ Hora -> ", HsMs,  itemDiaLoop);
                    }
              }



            });

            /** add hora intervao se existe nao pode  */
            // console.log("intervalo horas add se existe");
            // console.log(this.CliniIntervalo);
            this.CliniIntervalo.forEach(element => {
              // console.log(element.hora);

                  let horaInt = element.hora.split(":");
                      horaInt = horaInt[0]+":"+horaInt[1];

                      let dados = {
                        'dia'         : itemDiaLoop,
                        'dif'         : '',
                        'dtini'       : '',
                        'dtfin'       : '',
                        'prestador'   : '',
                        'cd_prestador': '',
                        'horaIni'     : horaInt,
                        'horaFim'     : '',
                        'livre'       : false,
                        'horaPeriodo' : horaInt,
                        'stlClass'    : 'cadHorarioIndterv',
                        'chave'       : '' , 
                        'aph_chave'   : '' , 
                        'dt_ultima_edicao' : '',
                        'intervalo'   : true , 
                        'duracao' : '',
                        'height'      : this.CadeiraRowPx
                  }

                        this.SemanaDiaHorariosMedic.push(dados);
              
            });



            this.CliniFuncionaTarde.forEach(lpHora => {
                    let addHoraio = false;
                    let ArrayHora = lpHora.hora.split(':');
                    DiaLoop.setHours(ArrayHora[0],ArrayHora[1],ArrayHora[2]);
                    if(DiaLoop >= DiaLoopPulo){
                      // console.log("hora tem Dr as : ",DiaLoop);
                                /** faço loop para ver se hora tem agendamento Dr */
                        obj.forEach(element => {
                      
                            // console.log(element.data_inicio);
                            // console.log(element.data_fim);
                            // console.log(element.horario_inicio);
                            // console.log(element.horario_fim);
                            // console.log(element.prestador);
                            // console.log("--##--");
                  
                            /** Horarios atende bloqueados DR */
                            let dataINIDr = element.data_inicio.split("-");
                            var DiaDrMarcadoINI = new Date(dataINIDr[0],(parseInt(dataINIDr[1]) - 1),dataINIDr[2]); /*2014, 1, 1*/
                            var DiaDrMarcadoINIFim = new Date(dataINIDr[0],(parseInt(dataINIDr[1]) - 1),dataINIDr[2]); /*2014, 1, 1*/
                            let dataFimDr = element.data_fim.split("-");
                            var DiaDrMarcadoFIM = new Date(dataFimDr[0],(parseInt(dataFimDr[1]) - 1),dataFimDr[2]); /*2014, 1, 1*/
                            let horaIniArray = element.horario_inicio.split(":");
                            let horaFimArray = element.horario_fim.split(":");
                            DiaDrMarcadoINI.setHours(horaIniArray[0],horaIniArray[1],horaIniArray[2]);
                            DiaDrMarcadoFIM.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
                            DiaDrMarcadoINIFim.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
                    
                            var dif = Date.UTC(DiaDrMarcadoINI.getFullYear(),DiaDrMarcadoINI.getMonth(),DiaDrMarcadoINI.getDate(),DiaDrMarcadoINI.getHours(),DiaDrMarcadoINI.getMinutes(),0) - Date.UTC(DiaDrMarcadoINIFim.getFullYear(),DiaDrMarcadoINIFim.getMonth(),DiaDrMarcadoINIFim.getDate(),DiaDrMarcadoINIFim.getHours(),DiaDrMarcadoINIFim.getMinutes(),0);
                            dif=Math.abs((dif / 1000 / 60 / 60));
      
      
                            DiaDrMarcadoINI.setHours(horaIniArray[0],horaIniArray[1],horaIniArray[2]);
                            DiaDrMarcadoFIM.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);

                            //  console.log("horarios TArde DR");
                            // console.log(DiaLoop);
                            // console.log('.............',DiaDrMarcadoINI , DiaDrMarcadoFIM ) ;
                            //  console.log(addHoraio);
                            // console.log((DiaDrMarcadoINI.getHours() == DiaLoop.getHours() ) && (DiaDrMarcadoINI.getMinutes() == DiaLoop.getMinutes() ) );

                            // console.log(DiaLoop);
                            // console.log("..............marcado", DiaDrMarcadoINI , DiaDrMarcadoFIM , addHoraio) ;
                            // console.log(".....................", (DiaDrMarcadoINI == DiaLoop), (DiaDrMarcadoFIM >= DiaLoop), (DiaLoop >= DiaLoopPulo), (DiaDrMarcadoINI.getDay() == DiaLoop.getDay()), DiaLoopPulo );

                            let diaNumSemana = (DiaLoop.getDay()) + 1;
                              /** Se a hora esta no ranger que o DR atende */
                              if( (DiaDrMarcadoINI <= DiaLoop) &&  (diaNumSemana == element.dia_semana)   &&  (DiaDrMarcadoINI.getHours() == DiaLoop.getHours()) && (DiaDrMarcadoFIM >= DiaLoop)   &&  (DiaLoop >= DiaLoopPulo) && (addHoraio == false) ){ //  && (DiaDrMarcadoINI.getDay() == DiaLoop.getDay())
                                  /** Pulo para nao entra na hora varias vezes */


                                  // console.log("entrou add hora  ------------------------------------");
                                  // console.log(element);
                                  this.DuplicidadeDrCadeira(obj,element);

                                  
                                  //  console.log("horaros marcados if");
                                  // console.log("dia semana ");
                                  // console.log( 'ini', DiaDrMarcadoINI.getDay());
                                  // console.log( 'FIM', DiaDrMarcadoINI.getDay());
                                  // console.log( 'DiaLoop', DiaLoop.getDay());
                                  // console.log("datas");
                                  // console.log(DiaLoop);
                                  // console.log(DiaDrMarcadoINI , DiaDrMarcadoFIM ) ;
                                  // // console.log(addHoraio);
                                  // console.log("--##--");
                                  // console.log('RANGER', element.data_inicio , element.data_fim);
                                  // console.log("HHHHH --->", element.horario_inicio, element.horario_fim);
                                  // console.log("---------------->", element.prestador);
                                  // console.log("--##--");
                                  // console.log("ok");


                                  if((DiaDrMarcadoINI.getHours() == DiaLoop.getHours() ) && (DiaDrMarcadoINI.getMinutes() == DiaLoop.getMinutes() )){
                                    // console.log("------------------------------------->horario igual");
                                    DiaLoopPulo.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
                                      addHoraio = true;
                                      // let resto =   dif > 1 ? (21 / dif) : 21 ;
                                      // let Xdif = dif < 1 ? 1 : dif;
                                      // let height = (16.1 * (Xdif * ( 60 /  dadosClinica.duracao_horario  ) )  ) ; 
                                      
                                      // console.log("---------------->###########");
                                      // console.log("---------------->###########");
                                      // console.log("---------------->###########");
                                      // console.log("---------------->###########");

                                      // console.log("----------------pulo", DiaLoopPulo);

                                      // console.log("---------------->", element.prestador, DiaDrMarcadoINI , DiaDrMarcadoFIM);
                                      // console.log("----------------pulo", DiaLoopPulo);


                                      let height = ( dif * ( ( 60 /  dadosClinica.duracao_horario  ) * this.CadeiraRowPx ) ) + 0   ; 
                                      
                                      let dados = {
                                          'dia'         : itemDiaLoop,
                                          'dif'         : dif,
                                          'dtini'       : element.data_inicio,
                                          'dtfin'       : element.data_fim,
                                          'prestador'   : element.prestador +""+ element.alerta,
                                          'cd_prestador': element.chave_prestador,
                                          'horaIni'     : element.horario_inicio,
                                          'horaFim'     : element.horario_fim,
                                          'livre'       : false,
                                          'intervalo'   : false,
                                          'horaPeriodo' : element.horario_inicio +" - "+ element.horario_fim,
                                          'stlClass'    : element.chave != '' ? 'cadHorarioDr' : 'cadHorariobrock',
                                          'chave'       : element.chave   , 
                                          'aph_chave'   : element.aph_chave  , 
                                          'dt_ultima_edicao' : element.dt_ultima_edicao,
                                          'duracao' : element.duracao,
                                          'height'      : height
                                      }
      
                                      // let n = itemDiaLoop.split("/");
                                      // let H = element.horario_inicio.split(":");
                                      // n = n[0]+""+n[1]+""+n[2]+""+H[0]+""+H[1]+"00";
                                      // n = itemDiaLoop +" "+element.horario_inicio;
      
                                      this.SemanaDiaHorariosMedic.push(dados);
                                      // console.log("++++++++++++ HoDr -> ", element.horario_inicio, itemDiaLoop); 
                                     

                                      // console.log(this.SemanaDiaHorariosMedic[n]);
                                      // console.log(this.SemanaDiaHorariosMedic );
                                      //this.DrHorariosDia[itemDiaLoop].push(dados);


                                      let Hs = DiaDrMarcadoFIM.getHours() > 9 ? DiaDrMarcadoFIM.getHours() : '0' + DiaDrMarcadoFIM.getHours();
                                      let Ms = DiaDrMarcadoFIM.getMinutes() > 9 ? DiaDrMarcadoFIM.getMinutes() : '0' + DiaDrMarcadoFIM.getMinutes();
                                      let HsMs =  Hs +":"+ Ms ;
                                      height  = this.CadeiraRowPx;
                                        let dadosB = {
                                              'dia'         : itemDiaLoop,
                                              'dif'         : '',
                                              'dtini'       : '',
                                              'dtfin'       : '',
                                              'prestador'   : '',
                                              'cd_prestador': '',
                                              'horaIni'     : HsMs,
                                              'horaFim'     : '',
                                              'livre'       : true,
                                              'intervalo'   : false,
                                              'horaPeriodo' : HsMs,
                                              'stlClass'    : 'cadHorarioLivre',
                                              'chave'       : '' , 
                                              'aph_chave'   : '' , 
                                              'dt_ultima_edicao' : '',
                                              'duracao' : '',
                                              'height'      : height
                                        }
      
                                      this.SemanaDiaHorariosMedic.push(dadosB);
                                      // console.log("++++++++++++ Hora -> ", HsMs,  itemDiaLoop);

                                       /**remover a hora ini do array (necessario por que o codigo ja estava assim) */
                                      this.RemoveHoraArray(itemDiaLoop,DiaDrMarcadoINI.getHours(),DiaDrMarcadoINI.getMinutes());
                                  }
                              }
                        });
            
                        if( (addHoraio == false) && (DiaLoop > DiaLoopPulo) ){
                            /** verificar se horario e vago */
    
                            let Hs = DiaLoop.getHours() > 9 ? DiaLoop.getHours() : '0' + DiaLoop.getHours();
                            let Ms = DiaLoop.getMinutes() > 9 ? DiaLoop.getMinutes() : '0' + DiaLoop.getMinutes();
                            let HsMs =  Hs +":"+ Ms ;
                            let height  = this.CadeiraRowPx;
                              let dados = {
                                    'dia'         : itemDiaLoop,
                                    'dif'         : '',
                                    'dtini'       : '',
                                    'dtfin'       : '',
                                    'prestador'   : '',
                                    'cd_prestador': '',
                                    'horaIni'     : HsMs,
                                    'horaFim'     : '',
                                    'livre'       : true,
                                    'intervalo'   : false,
                                    'horaPeriodo' : HsMs,
                                    'stlClass'    : 'cadHorarioLivre',
                                    'chave'       : '' , 
                                    'aph_chave'   : '' , 
                                    'dt_ultima_edicao' : '',
                                    'duracao' : '',
                                    'height'      : height
                                    
                              }
    
                            // let n = itemDiaLoop.split("/");
                            // let H = HsMs.split(":");
                            // n = n[0]+""+n[1]+""+n[2]+""+H[0]+""+H[1]+"00";
                            // n = itemDiaLoop +" "+HsMs;
    
                            this.SemanaDiaHorariosMedic.push(dados);
                            // console.log("++++++++++++ Hora -> ", HsMs,  itemDiaLoop); 
    
                            // console.log("else");
                            // console.log(this.SemanaDiaHorariosMedic[n] );
                            // console.log(this.SemanaDiaHorariosMedic );
                            //this.DrHorariosDia[itemDiaLoop].push(dados);
                        }
                    }
            });


            // console.log("horas tarde");



            this.DrHorariosDia[itemDiaLoop] = this.SemanaDiaHorariosMedic;


            // console.log("verificar se nesse dia teve hora oculta nao duplicada");   
            // console.log(this.SemanaDiaHorariosMedic);
            // console.log(DiaLoop, DiaLoop.getDay());
            // console.log(obj);
            HrCadeiraOcultas = [];
            obj.forEach(element => {

              let dtf= element.data_fim.split("-");
              let DatFim = new Date(dtf[0],(parseInt(dtf[1]) - 1),dtf[2]); /*2014, 1, 1*/
              let dti= element.data_inicio.split("-");
              let DatIni = new Date(dti[0],(parseInt(dti[1]) - 1),dti[2]); /*2014, 1, 1*/
              DatFim.setHours(DiaLoop.getHours());
              DatIni.setHours(DiaLoop.getHours());
              
              if(element.dia_semana == DiaLoop.getDay()+1 && DatIni <= DiaLoop &&  DiaLoop <= DatFim ){
                // console.log("no dia ", element.dia_semana, element);
                // console.log( element.dia_semana ,"==", DiaLoop.getDay()+1 ,"&&", DatIni ,"<= ", DiaLoop ,"&&" , DiaLoop ," <=", DatFim);
                  
                let Jacadastrado =  false;
                this.SemanaDiaHorariosMedic.forEach(elementDiaDr => {

                      // let dtflop= elementDiaDr.data_fim.split("-");
                      // let DatFimLoop = new Date(dtflop[0],(parseInt(dtflop[1]) - 1),dtflop[2]); /*2014, 1, 1*/
                      // console.log(element.aph_chave ,'!= ',elementDiaDr.aph_chave ,'&&', element.aph_chave ,' != " "');
                      if(element.aph_chave  == elementDiaDr.aph_chave ){
                          // console.log("ja cadastrato");
                         Jacadastrado =  true;
                      }

                      


                   
                    
                    // console.log(elementDiaDr.aph_chave);
                });

                if(Jacadastrado == false ){
                        
                  // console.log("Data OCULTA ------------------------------------------------------ ");
                  // console.log(element);
                  // console.log(this.SemanaDiaHorariosMedic);
                  // console.log(obj);

                    let dadosOclt = {
                      'dia'         : itemDiaLoop,
                      'dif'         : null,
                      'dtini'       : element.data_inicio,
                      'dtfin'       : element.data_fim,
                      'prestador'   : element.prestador +""+ element.alerta,
                      'cd_prestador': element.chave_prestador,
                      'horaIni'     : element.horario_inicio,
                      'horaFim'     : element.horario_fim,
                      'livre'       : false,
                      'intervalo'   : false,
                      'horaPeriodo' : element.horario_inicio +" - "+ element.horario_fim,
                      'stlClass'    : element.chave != '' ? 'cadHorarioDr' : 'cadHorariobrock',
                      'chave'       : element.chave   , 
                      'aph_chave'   : element.aph_chave  , 
                      'dt_ultima_edicao' : element.dt_ultima_edicao,
                      'duracao' : element.duracao,
                      'height'      : 0
                    }

                  
                   element.dadosAll = dadosOclt;

                  HrCadeiraOcultas.push(element);
                }

              }
              // console.log(' ');
            });


            this.HrCadeiraOcultas[itemDiaLoop] = HrCadeiraOcultas;

        });

        console.log("1187 AcProssec false", this.AcProssec);
        this.AcProssec = false;
        // console.log("***************************************************");
        // console.log(this.DrHorariosDia);
        // console.log(this.HrCadeiraOcultas);
        // console.log(obj);
        
        // console.log(this.DrCadeDupli);

        this.ForcarPeriodo();
         
    }

    
    ForcarPeriodo(){
      let Fordata = JSON.parse(sessionStorage.getItem('cadeiraForData'));
      sessionStorage.removeItem('cadeiraForData');
      // console.log("ForcarPeriodo");
      // console.log(Fordata);


      if(Fordata){

        let diaEscolhido = Fordata.dataIniF.split("/");

        let diaIniGo = new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0]);
        let diaIniGoOk;
        // console.log(diaIniGo.getDay()+1);


        for (let index = 0; index < 15; index++) {

          if(Fordata.dia_semana == diaIniGo.getDay()+1){
            diaIniGoOk = diaIniGo;
            break
          }

          diaIniGoOk = diaIniGo.setDate(diaIniGo.getDate() + 1);
        }

        // console.log("dia inicial ");
        // console.log(diaIniGoOk);
        let formatDateIni = (diaIniGoOk.getDate() > 9 ? diaIniGoOk.getDate() : '0' + diaIniGoOk.getDate()) +'/'+ (parseFloat(diaIniGoOk.getMonth()+1) > 9 ? parseFloat(diaIniGoOk.getMonth()+1) : '0' + parseFloat(diaIniGoOk.getMonth()+1)) +'/'+  diaIniGoOk.getFullYear();
        // console.log(formatDateIni);

        diaEscolhido = formatDateIni.split("/");
        
        this.model = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) },
                            formatted : diaEscolhido[0]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[2],
                            jsdate : new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0])
                          };


        // this.buscarDataSelecionada();

        this.CadeiraSelectTab = Fordata.cadeira;
        // this.tabs[Fordata.cadeira].active = true;

        this.cadeiraSelect(Fordata.cadeira,null);
      }



    }

    existeHrDrForaPadrao(d){
      if(this.HrCadeiraOcultas[d] && this.HrCadeiraOcultas[d].length>0 ){
        return true;
      }
      return false;
    }

    ShowHrCadDrForaPrad(DNum,D,Modal){
      // console.log("ShowHrCadDrForaPrad");
      // console.log(D);
      // console.log(DNum);
      this.MD = {};
      if(this.HrCadeiraOcultas[D] && this.HrCadeiraOcultas[D].length>0 ){
        // console.log(this.HrCadeiraOcultas[D]);
        this.MD.Dia = this.DiasSemanaComplt[DNum]
        this.MD.D = D;
        this.MD.DNum = DNum;
        // this.MD.XObj = this.DrHorariosDia[D];
        // console.log(this.MD);



        this.openModal(Modal,'modal-lg');
      }
    }


    DuplicidadeDrCadeira(obj,item){
      // console.log("DuplicidadeDrCadeira");
      // console.log(obj);
      // console.log(item); 
      // console.log(item.dia_semana); 
      // console.log('');
      
      // console.log("item datas ");
      // let dados = {
      //   'id'          : item.aph_chave,
      //   'dados'       : '',
      //   'dupli'       : false,
      // }
      // this.DrCadeDupli[dados.id] = dados;

      let DataIni = item.data_inicio.split("-");
      let DataIniFimFix = item.data_fim.split("-");
      let DataIniHrIni = new Date(DataIni[0],(parseInt(DataIni[1]) - 1),DataIni[2]); /*2014, 1, 1*/
      let DataIniHrFim = new Date(DataIni[0],(parseInt(DataIni[1]) - 1),DataIni[2]); /*2014, 1, 1*/
      let DataFimHrFimFix = new Date(DataIniFimFix[0],(parseInt(DataIniFimFix[1]) - 1),DataIniFimFix[2]); /*2014, 1, 1*/
      let horaIniArray = item.horario_inicio.split(":");
      let horaFimArray = item.horario_fim.split(":");
      DataIniHrIni.setHours(horaIniArray[0],horaIniArray[1],horaIniArray[2]);
      DataIniHrFim.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
      DataFimHrFimFix.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);
      // console.log(" ");console.log(" ");console.log(" ");
      // console.log(item.aph_chave, DataIniHrIni,DataIniHrFim);
      // console.log("loop ini ---------------------------------------");
      // console.log(" ");

      let DataHrFIMFixDtIniLoop; let DataHrIniFixDtIniLoop;  let DataIniFimFixLoop; let DataLoopIniHrIni; let DataIniLoop; let DataFim ; let DataFimLoop;  let DataIniHrIniLoop; let DataIniHrFimLoop; let horaIniArrayLoop; let horaFimArrayLoop; let DataFimLoopArray; let DataFimLoopEle;
      obj.forEach(element => {

        if( element.aph_chave != item.aph_chave &&  element.dia_semana == item.dia_semana  ){ // && DataIniHrIniLoop >= DataIniHrIni &&  DataIniHrIniLoop  < DataIniHrFim
          // console.log('loop next');
          // console.log(element.dia_semana);
          DataIniLoop = element.data_inicio.split("-");
          DataFimLoop = element.data_fim.split("-");
          DataIniHrIniLoop = new Date(DataIniLoop[0],(parseInt(DataIniLoop[1]) - 1),DataIniLoop[2]); /*2014, 1, 1*/
          DataIniHrFimLoop = new Date(DataIniLoop[0],(parseInt(DataIniLoop[1]) - 1),DataIniLoop[2]); /*2014, 1, 1*/
          DataFim = new Date(DataFimLoop[0],(parseInt(DataFimLoop[1]) - 1),DataFimLoop[2]); /*2014, 1, 1*/
          DataHrIniFixDtIniLoop = new Date(DataIniLoop[0],(parseInt(DataIniLoop[1]) - 1),DataIniLoop[2]); /*2014, 1, 1*/
          DataHrFIMFixDtIniLoop = new Date(DataIniLoop[0],(parseInt(DataIniLoop[1]) - 1),DataIniLoop[2]); /*2014, 1, 1*/
          horaIniArrayLoop = element.horario_inicio.split(":");
          horaFimArrayLoop = element.horario_fim.split(":");
          DataIniHrIniLoop.setHours(horaIniArrayLoop[0],horaIniArrayLoop[1],horaIniArrayLoop[2]);
          DataIniHrFimLoop.setHours(horaFimArrayLoop[0],horaFimArrayLoop[1],horaFimArrayLoop[2]);
          DataFim.setHours(horaFimArrayLoop[0],horaFimArrayLoop[1],horaFimArrayLoop[2]);
          DataHrIniFixDtIniLoop.setHours(horaIniArray[0],horaIniArray[1],horaIniArray[2]);
          DataHrFIMFixDtIniLoop.setHours(horaFimArray[0],horaFimArray[1],horaFimArray[2]);


              DataFimLoopArray = element.data_inicio.split("-");
              DataFimLoopEle = new Date(DataIni[0],(parseInt(DataIni[1]) - 1),DataIni[2]); /*2014, 1, 1*/
              DataFimLoopEle.setHours(horaIniArrayLoop[0],horaIniArrayLoop[1],horaIniArrayLoop[2]);
              let addDrData = false;
              // console.log('verificando datas ');
              // console.log(DataFimLoopEle , '>=', DataIniHrIni ,'<=', DataIniHrFim  );
                                                          /*** limita para os com data fim superior nao mostra  */
              if( DataFimLoopEle >=  DataIniHrIni && DataFimLoopEle <=  DataIniHrFim  ){  
                // console.log('if', item.dia_semana, DataFim, '>= ', DataIniHrIni, '< ', DataIniHrFim );
                // console.log( DataIniHrIniLoop.getFullYear(), DataIniHrIniLoop.getMonth(),DataIniHrIniLoop.getDate(),  ' * ', DataFim.getFullYear(), DataFim.getMonth(), DataFim.getDate() );
                // console.log(  DataIniHrFim.getFullYear(), DataIniHrFim.getMonth(), DataIniHrFim.getDate(),' * ', DataFimHrFimFix.getFullYear(), DataFimHrFimFix.getMonth(), DataFimHrFimFix.getDate() );
                

                // if( element.dia_semana == item.dia_semana  && item.dia_semana == 4 &&  element.aph_chave != item.aph_chave ){
                //   console.log(element);
                //   console.log( DataIniHrFimLoop ,'<', DataIniHrFim, (DataIniHrFimLoop < DataIniHrFim),( DataFim > DataFimHrFimFix),(DataIniHrIniLoop <= DataFim)   );
                //   console.log( DataFim ,'>', DataFimHrFimFix  );
                //   console.log( DataIniHrIniLoop ,'<=', DataFim  );
                //   console.log('');

                //   console.log( DataIniHrFimLoop ,'>=', DataIniHrFim, (DataIniHrFimLoop >= DataIniHrFim),(DataIniHrFimLoop <= DataFimHrFimFix),(DataIniHrIniLoop <= DataFim) );
                //   console.log( DataIniHrFimLoop ,'<=', DataFimHrFimFix );
                //   console.log( DataIniHrIniLoop ,'<=', DataFim);
                //   console.log('');

                //   console.log('sub if');
                //   console.log(DataHrIniFixDtIniLoop ,'>=', DataIniHrIniLoop, (DataHrIniFixDtIniLoop >= DataIniHrIniLoop),(DataHrFIMFixDtIniLoop >= DataIniHrFimLoop) );
                //   console.log(DataHrFIMFixDtIniLoop ,'>=', DataIniHrFimLoop);
                //   console.log('');

                //   console.log( DataFim ,'>=', DataIniHrFim, (DataFim >= DataIniHrFim),(DataFim <= DataFimHrFimFix), (DataIniHrIniLoop <= DataFim ) );
                //   console.log( DataFim ,'<=', DataFimHrFimFix );
                //   console.log( DataIniHrIniLoop ,'<=', DataFim);
                //   console.log('');

                  
                // } 
                

                

                if( DataIniHrFim == DataIniHrFimLoop && DataFimHrFimFix == DataFim ){
                  addDrData  = true;
                    // console.log("add DR vadeira dupplicada 1");
                    let dados = {
                      'id'          : item.aph_chave,
                      'dados'       : element,
                      'dupli'       : true,
                    }
                    this.DrCadeDupli.push(dados);
                    // console.log("ok");
                    // console.log("data Igual");
                }

                
                if(  addDrData == false &&  DataIniHrFimLoop <  DataIniHrFim  && DataFim > DataFimHrFimFix && DataIniHrIniLoop <=  DataFim  ){
                  addDrData  = true;
                    // console.log("add DR vadeira dupplicada 2");
                    // console.log(DataHrIniFixDtIniLoop ,'>=', DataIniHrIniLoop);
                    // console.log(DataHrFIMFixDtIniLoop , '>=', DataIniHrFimLoop);
                    if(DataHrIniFixDtIniLoop <= DataIniHrIniLoop && DataHrFIMFixDtIniLoop >= DataIniHrFimLoop){
                      let dados = {
                        'id'          : item.aph_chave,
                        'dados'       : element,
                        'dupli'       : true,
                      }
                      this.DrCadeDupli.push(dados);
                    }
                   
                    // console.log("ok");
                  // console.log("data Sobre o ranger ");
                }

                if( addDrData == false && DataIniHrFimLoop >=  DataIniHrFim  && DataIniHrFimLoop <= DataFimHrFimFix && DataIniHrIniLoop <=  DataFim ){
                  addDrData  = true;
                    // console.log("add DR vadeira dupplicada 3");
                    // console.log(DataIniHrIniLoop, '>=', DataHrIniFixDtIniLoop);
                    // console.log(DataHrFIMFixDtIniLoop , '>=', DataIniHrFimLoop);
                    if(DataHrIniFixDtIniLoop <= DataIniHrIniLoop && DataHrFIMFixDtIniLoop >= DataIniHrFimLoop){
                      let dados = {
                        'id'          : item.aph_chave,
                        'dados'       : element,
                        'dupli'       : true,
                      }
                      this.DrCadeDupli.push(dados);
                    }
                    // console.log("ok");
                    // console.log("data Ini no ranger ");
                }


                if(  addDrData == false &&  DataFim >=  DataIniHrFim  && DataFim <= DataFimHrFimFix && DataIniHrIniLoop <=  DataFim  ){
                  addDrData  = true;
                  // console.log("add DR vadeira dupplicada 4");
                  // console.log(DataIniHrIniLoop, DataHrIniFixDtIniLoop);
                  // console.log(DataHrFIMFixDtIniLoop , '>=', DataIniHrFimLoop);
                  let dados = {
                    'id'          : item.aph_chave,
                    'dados'       : element,
                    'dupli'       : true,
                  }
                  this.DrCadeDupli.push(dados);
                  // console.log("ok");
                  // console.log("data FINAL no ranger ");
                }

            }


                  // console.log('iff all');
                  // console.log( DataIniHrIniLoop ,'>= ', DataIniHrIni,( DataIniHrIniLoop >=  DataIniHrIni ),( DataIniHrIniLoop <=  DataFimHrFimFix), (DataFim  >= DataIniHrIni) );
                  // console.log( DataIniHrIniLoop ,'<=',  DataFimHrFimFix );
                  // console.log( DataFim  ,'>=', DataIniHrIni);
                  // console.log('');



                  // /** verifico se a data ini e maior e a data fim e maior so q no periodo de horas de algum agendamento  */
                  // if( addDrData == false &&  DataIniHrIniLoop >=  DataIniHrIni &&  DataIniHrIniLoop <=  DataFimHrFimFix &&  DataFim  >= DataIniHrIni ){ 


                  //   console.log("final add");
                  //   console.log(  DataFim ,'>=', DataIniHrFim , (DataFim >= DataIniHrFim ),( DataFim <= DataFimHrFimFix  ),(  DataIniHrIniLoop <= DataFim ) );
                  //   console.log(  DataFim ,'<=', DataFimHrFimFix  );
                  //   console.log(  DataIniHrIniLoop ,'<=', DataFim  );
                  //   if (DataFim >= DataIniHrFim && DataFim <= DataFimHrFimFix && DataIniHrIniLoop <= DataFim ){
                      
                  //     // console.log("add DR vadeira dupplicada 4");
                  //     // console.log(DataIniHrIniLoop, DataHrIniFixDtIniLoop);
                  //     // console.log(DataHrFIMFixDtIniLoop , '>=', DataIniHrFimLoop);
                  //     let dados = {
                  //       'id'          : item.aph_chave,
                  //       'dados'       : element,
                  //       'dupli'       : true,
                  //     }
                  //     this.DrCadeDupli.push(dados);
                  //     // console.log("ok");
                  //     // console.log("data FINAL no ranger ");
                  //   }


                  // } 

          }
        
      });


      // let dados = {
      //   'id'          : item.aph_chave,
      //   'dados'       : null,
      //   'dupli'       : false,
        
      // }


      // return dados;
      // console.log(''); console.log(''); console.log(''); 
    }

     


    TemCadeiraDrDupli(id){
      // console.log("TemCadeiraDrDupli");
      // console.log(id);

      let dupli = false;

      this.DrCadeDupli.forEach(element => {
          // console.log(element);
          if(id==element.id){
            // console.log(true);
            dupli = true;
          }
      });

      return dupli;

    }



    RemoveHoraArray(D,H,M){
        // console.log("RemoveHoraArray");
      // console.log(this.SemanaDiaHorariosMedic);
      // console.log(D);
      // console.log(H,M);
      H = H > 9 ? H : "0"+H;
      M = M > 9 ? M : "0"+M;
      let hora = H +":"+ M ;
        // console.log(hora);
      // console.log("looop");
      let index = 0;
      let removerItem = null;
      this.SemanaDiaHorariosMedic.forEach(element => {
          // console.log(hora);
          // console.log(element.horaIni);
          if((hora == element.horaIni) && (element.livre == true)  ){
            removerItem = index;
            // console.log("remove =--------------------");
            // console.log(element);
          }
        index++;
      });

      // console.log("E pra remover o ");
      // console.log(removerItem);

      if(removerItem){
        // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        //  console.log(removerItem);
        this.SemanaDiaHorariosMedic.splice(removerItem, 1);
      }
      
    }


    cadeiraSelect(i,tab){
      // console.log("cadeiraSelect");
      // console.log(i);
      //console.log(tab);
     // console.log(tab.active);
     
      // console.log("1502 AcProssec true", this.AcProssec);
      //  if(this.AcProssec == true){
      //     this.AcProssec = false;
      //  }
      //  console.log(this.AcProssec);
      this.CadeiraSelectTab = i;
      if(i != 1){
        this.tabs[0].active = false;
      }

     
      
     


      // console.log(this.model);
      

      if(this.model){




        let datanova = new Date(this.model.date.year,(this.model.date.month -1),this.model.date.day);
        // console.log("+****");
        // console.log(datanova);
        // console.log(datanova.getMonth());
        let diaSemana = datanova.getDay();
        let quantosFaltaPDomingo =   datanova.getDay() ;
        if(quantosFaltaPDomingo > 0){
          let strDats = quantosFaltaPDomingo ;
          datanova.setDate(datanova.getDate() - strDats);
          // console.log("nova darta");
          // console.log(datanova);
        }
        let m  = (datanova.getMonth() +1) > 9 ? (datanova.getMonth() +1) : "0" + (datanova.getMonth() +1) ;
        let d  = datanova.getDate() > 9 ? datanova.getDate()  : "0" + datanova.getDate();
        this.SemanaIni = datanova.getFullYear() +"-"+  m+"-"+ d;



        // let ArraDia = this.model.formatted.split('/');
        // this.SemanaIni = ArraDia[2] +"-"+ ArraDia[1] +"-"+ ArraDia[0];
        // let datanova = new Date(this.model.jsdate);
        // let diaSemana = datanova.getDay();
        // let quantosFaltaPDomingo =   datanova.getDay() ;
        // if(quantosFaltaPDomingo > 0){
        //   let strDats = quantosFaltaPDomingo ;
        //   datanova.setDate(datanova.getDate() - strDats);
        // }
        // let m  = (datanova.getMonth() +1) > 9 ? (datanova.getMonth() +1) : "0" + (datanova.getMonth() +1) ;
        // let d  = datanova.getDate() > 9 ? datanova.getDate()  : "0" + datanova.getDate();
        // this.SemanaIni = datanova.getFullYear() +"-"+  m+"-"+ d;
        // console.log("agora");
        // console.log(this.SemanaIni);
      }



      this.CreatNunCadeirasTabs(false);
      this.GetaddHorariosMarcados(i);
      

      
    }

    ClickOpenModal(ModalID1,ModalID2,obj,D,NumSemanaDia){
      // console.log("ClickOpenModal");
      // console.log(ModalID);
      console.log(obj);
      // console.log(D); 
      // console.log(this.CadeiraSelectTab);
      // console.log(NumSemanaDia); 
      //  DiasSemanaNum
      // console.log(this.DrHorariosDia[D]);

      // console.log(this.modalRef);
      if(this.modalRef){
          this.hiderModal();
      }



      

      if(!obj.intervalo){


        this.ErroData = false;
        this.ErroPrestador = false;
        this.ErroHoraFim = false;
        this.ErroMotivo = false;
        this.PrestadorSelected = 'Buscar nome de Prestador...';
        this.MD = [];
        this.MD.Prestador =  obj.prestador != '' ? obj.prestador  : '';
        if(obj.horaIni){
          let horaIni = obj.horaIni.split(':');
          obj.horaIni = horaIni[0] +':'+ horaIni[1];
        }
        this.MD.HoraINI = obj.horaIni;
        if(obj.horaFim){
          let horafim = obj.horaFim.split(':');
          obj.horaFim = horafim[0] +':'+ horafim[1];
        }
        this.MD.HoraFim = obj.horaFim;
        this.MD.HoraFimAntiga = obj.horaFim;
        this.MD.HoraFimArray = [];
        this.MD.HoraIniIntArray = [];
        this.MD.PuloArray = this.AgendaConfigCadeiraService.SelectPuloAgDr();
        this.MD.Pulo = 0;
        this.MD.semana = NumSemanaDia;
        this.MD.TipoAddAg = 0;
        this.MD.motivo = obj.chave != '' ? obj.prestador : ''; 
        this.MD.unidade = this.SelectClinicaDados.nm_unidade_atendimento;
        this.MD.cadeira = this.CadeiraSelectTab;
        this.MD.chave = obj.chave;
        this.MD.aph_chave = obj.aph_chave;
        this.MD.Dia = D;
        this.MD.cd_prestador = obj.cd_prestador;
        this.model1 = {};
        this.MD.Dtigual = false;
        this.MD.livre = obj.livre;
        this.MD.HoraFimArrayFull = [];
        this.MD.diaAlterar  = D;
        this.MD.NomeDiaSelect  = this.DiasSemanaComplt[NumSemanaDia];
        
        
        

        let diaEscolhido = D.split("/");
        this.MD.DiaEscolhidoSQL = diaEscolhido[2]+"-"+diaEscolhido[1]+"-"+diaEscolhido[0];
        // console.log("*******************************************************");
        // console.log(diaEscolhido);
        this.modelfix = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) } };

        
        this.model1 = { date: { year: diaEscolhido[2], month: parseInt(diaEscolhido[1]) , day: parseInt(diaEscolhido[0]) },
                            formatted : diaEscolhido[0]+ '/' +diaEscolhido[1]+ '/' +diaEscolhido[2],
                            jsdate : new Date(diaEscolhido[2],parseInt(diaEscolhido[1])-1,diaEscolhido[0])
                          };
        // console.log(this.model1);


        // console.log("-----------------");
        // console.log(this.SelectTipoAgDr);

        // this.AgendaConfigCadeiraService.DrDaUnidade(this.SelectClinicaDados.unidade).subscribe(res=>this.DrUnidade=res);
        this.AllService.GetUrl(this.SelectClinicaDados.unidade,'DrDaUnidade').subscribe(res=>this.DrUnidade=res);

        /**
         * Define o intervalo q sera mostrado na agenda 
         * un select e criado com o valor minimo e max do intervalo
         */
        // console.log("dados clinica");
        // console.log(this.AgendaConfigCadeiraService.RESNumCadCli.HorarioClinica);
        let dadosClinica = this.AgendaConfigCadeiraService.RESNumCadCli.HorarioClinica.dados[0];
        // console.log(dadosClinica);
        let max = parseInt(dadosClinica.duracao_horario_maximo);
        this.IntervaloConsultas = [];
        for(let i = parseInt(dadosClinica.duracao_horario_minimo); i < max;){

            this.IntervaloConsultas.push(i);

            i = i + parseInt(dadosClinica.duracao_horario_intervalo);

        }

        this.MD.duracao =  parseInt(obj.duracao)  >= 5 ? parseInt(obj.duracao) :  parseInt(dadosClinica.duracao_horario); 
        //this.MD.duracao =  parseInt(dadosClinica.duracao_horario_minimo);


        /** se for para editar ele tem q pergar as horar do intervalo */
        if(obj.livre == false){ 
          
        

            /** add tipo bloquear  exibicao do modal */
            if(obj.chave != '' ){ this.MD.TipoAddAg = 1; }
          

            //add data fim  
            let dtFimArray = obj.dtfin.split("-");
            this.model1 = { date: { year: dtFimArray[0], month: parseInt(dtFimArray[1]) , day: parseInt(dtFimArray[2]) },
                            formatted : dtFimArray[2]+ '/' +dtFimArray[1]+ '/' +dtFimArray[0],
                            jsdate : new Date(dtFimArray[0],parseInt(dtFimArray[1])-1,dtFimArray[2])
                          };
            
            let dtINIArray = obj.dtini.split("-");
            this.modelfix = { date: { year: dtINIArray[0], month: parseInt(dtINIArray[1]) , day: parseInt(dtINIArray[2]) },
                              formatted : dtINIArray[2]+ '/' +dtINIArray[1]+ '/' +dtINIArray[0],
                              jsdate : new Date(dtINIArray[0],parseInt(dtINIArray[1])-1,dtINIArray[2])
                            };




          /** add horas do ranger selecionado */
            // console.log("existe hora fim");
            // console.log('diferença');
            // console.log(obj.horaIni);
            // console.log(obj.horaFim);
            let ArrayHrIni =  obj.horaIni.split(':');
            let diaHoraINI =  new Date(2017,1,1); //obj.horaIni.split(':');
            diaHoraINI.setHours(ArrayHrIni[0],ArrayHrIni[1],0);
            let LoopHoraFim = new Date(2017,1,1);
            let ArrayHrFim =  obj.horaFim.split(':');
            LoopHoraFim.setHours(ArrayHrFim[0],ArrayHrFim[1],0);




                /**  add hora a arrya de horari ini pode aumentar horas ou diminuir  */
                
                // console.log("intervalo de horas");
                // console.log("loop");
                let horasIntenas = []; let addHora = true;
                let diaHoraINIIternas =  new Date(2017,1,1); //obj.horaIni.split(':');
                this.DrHorariosDia[D].forEach(element => {
                    /**  verifico se o horario e livre e se e uma hora maior q a hora inicio selecionada  */
                  // console.log(element.horaIni, element.livre, element );
                  let ArrayHrLop = element.horaIni.split(':');
                  diaHoraINIIternas.setHours(ArrayHrLop[0],ArrayHrLop[1],0);

                    let Amin = diaHoraINIIternas.getMinutes() > 9 ?  diaHoraINIIternas.getMinutes() : "0"+diaHoraINIIternas.getMinutes() ;
                    let Ahr = diaHoraINIIternas.getHours() > 9 ?  diaHoraINIIternas.getHours() : "0"+diaHoraINIIternas.getHours() ;
                    let AA = Ahr +":"+ Amin;
                    // console.log('horas' , AA , (diaHoraINIIternas > diaHoraINI) , diaHoraINI ,  diaHoraINIIternas, element.horaIni, element.livre, element );

                    /** verifico se o horario bloqueado e o hoario selecionando se for add ele no array de horas */
                    // console.log('3333333333333333');
                    // console.log(AA, (diaHoraINIIternas == diaHoraINI ), (element.livre == false ),diaHoraINIIternas.getHours(), diaHoraINIIternas.getMinutes() , diaHoraINI.getHours(), diaHoraINI.getMinutes() ,   diaHoraINIIternas,  diaHoraINI );
                    if( (element.livre == false ) && ( diaHoraINIIternas.getHours() == diaHoraINI.getHours()  ) && ( diaHoraINIIternas.getMinutes() == diaHoraINI.getMinutes() ) ){
                      //  console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
                      //  console.log(AA);
                       horasIntenas.push(AA);
                    }




                    /***add hora a array livre */
                    if( element.livre == true  && addHora == true ){
                        horasIntenas.push(AA);
                    }

                    
                    
                    /*** trava nao add mais horas */
                    if( diaHoraINIIternas >= diaHoraINI && element.livre == false ){
                          addHora = false;
                    }

                    /*** limpa array - pq achou horario ocupado */
                    if( element.livre == false && addHora == true ){
                        horasIntenas = [];
                    }

                    // console.log(horasIntenas , addHora );

                });

                // console.log(" fim loop ");
                // console.log(horasIntenas);
                






            let intervaloHoras = [];
            for(let h = 0; diaHoraINI < LoopHoraFim;){
                  // console.log(diaHoraINI);
                  diaHoraINI.setMinutes(diaHoraINI.getMinutes() + parseInt(dadosClinica.duracao_horario) );
                      let min = diaHoraINI.getMinutes() > 9 ?  diaHoraINI.getMinutes() : "0"+diaHoraINI.getMinutes() ;
                      let hr = diaHoraINI.getHours() > 9 ?  diaHoraINI.getHours() : "0"+diaHoraINI.getHours() ;
                      let a = hr +":"+ min;
                  intervaloHoras.push(a);
                  horasIntenas.push(a);

                  // console.log(diaHoraINI , LoopHoraFim);
                  if( ( LoopHoraFim.getHours() == diaHoraINI.getHours()  ) && ( LoopHoraFim.getMinutes() == diaHoraINI.getMinutes() )  ){
                      // console.log("remove", a);
                      // console.log(horasIntenas.length);
                      // console.log(horasIntenas);
                      horasIntenas.splice(horasIntenas.length -1, 1);
                    // console.log(horasIntenas);
                  }

                    if (h === 300){ break; }
                    h++;
            }


            // console.log("array intervalo");
            // console.log(intervaloHoras);
            this.MD.HoraFimArray = intervaloHoras;
            this.MD.HoraFimArrayFull =  intervaloHoras; // Object.assign([], intervaloHoras);  ;


            this.MD.HoraIniIntArray = horasIntenas;

            // console.log(this.CliniIntervalo);


                // console.log("ABILTAR BTS DELETAR");
                // console.log(this.model1);
                // console.log(this.modelfix);
                if(this.model1.formatted == this.modelfix.formatted){
                    // console.log("************ igual *****************");
                    this.MD.Dtigual = true;
                }else{
                    // console.log("************ validar mais de 7 dias *****************");
                    let LoopDIni = new Date(this.modelfix.date.year,this.modelfix.date.month,this.modelfix.date.day);
                    let LoopDFim = new Date(this.model1.date.year,this.model1.date.month,this.model1.date.day);
                    // console.log(LoopDIni);
                    // console.log(LoopDFim);
                    let timeDiff = Math.abs(LoopDFim.getTime() - LoopDIni.getTime());
                    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                    // console.log(diffDays);
                    /* se a diferençae  menor q 7 dias tbm cai na mesma exceção **/  
                    if(diffDays <= 6){
                      this.MD.Dtigual = true;
                    }
                }
        }




        
        //if(obj.livre == true){
        let horaIniSelect = new Date(2017,1,1); /*2014, 1, 1*/
        let arrayHora = obj.horaIni.split(':');
        horaIniSelect.setHours(arrayHora[0],arrayHora[1],0);

        // console.log("hora ini selecionada");
        // console.log(horaIniSelect);

        let horaloop = new Date(2017,1,1); /*2014, 1, 1*/
        horaloop.setHours(0,0,0);
        // console.log("hora loop ini");
        // console.log(horaloop);
        // console.log(obj);
        // console.log("horarios vagos loop ");
        let Loopara = false;
        let ArrayHorasLives = [];
        let PrimeriaHoraIntervalo = 0;
        this.DrHorariosDia[D].forEach(element => {

            let arrayLoppHora = element.horaIni.split(':');
            horaloop.setHours(arrayLoppHora[0],arrayLoppHora[1],0);

            /*** a hora nao pode ser maior q horario fim manham */
            // let datPHoraManhaFim = new Date(2017,1,1); /*2014, 1, 1*/
            // let horaArrayFimStop = dadosClinica.horario_manha_fim.split(':');
            // datPHoraManhaFim.setHours(horaArrayFimStop[0],horaArrayFimStop[1],horaArrayFimStop[2]);

            // console.log('comparacao', horaloop , horaIniSelect, element.intervalo);
              if( (Loopara==false) && (horaloop > horaIniSelect) && (element.intervalo == false ) ){
                  // console.log("loop ok ",element.horaIni, element.livre);
                  // console.log(element.horaIni, element.livre);
                  let a = element.horaIni.split(':');
                  a = a[0] +":"+ a[1];

                  ArrayHorasLives.push(a);

                  if(element.livre == false){
                      // console.log("tar");
                      Loopara = true;
                  }
              }
              if( (element.intervalo == true) && (horaloop > horaIniSelect) && (PrimeriaHoraIntervalo == 0)  ){
                  // console.log("tar");
                  Loopara = true;
                  PrimeriaHoraIntervalo++;

                  let a = element.horaIni.split(':');
                  a = a[0] +":"+ a[1];

                  ArrayHorasLives.push(a);

              }

        });

        if(obj.livre == false){
                  let NewArrayHoras = this.MD.HoraFimArray.concat(ArrayHorasLives);
                  ArrayHorasLives = NewArrayHoras;
                  this.MD.HoraFimArrayFull  = this.MD.HoraFimArrayFull.concat(ArrayHorasLives);
                  
        }
        this.MD.HoraFimArray = ArrayHorasLives;
        
        //}

        this.MD.alterarHoje = false;
        this.MD.TemCadeiraDrDupli = false;
        this.ObjHorarioAgendar = {};
        if(obj.livre){
          // console.log("horarios livre");
          // console.log(obj.horaIni);
          // console.log(obj);
          this.ObjHorarioAgendar = obj;
          this.openModal(ModalID1,'modal-md');
        }else{
          // console.log("editar dados");
          // console.log(obj.horaIni);
          // console.log(obj);
          this.MD.alterarHoje = this.model1.formatted != this.modelfix.formatted ? true : false;
          // this.MD.alterarHoje = true;
          this.ObjHorarioAgendar = obj;
          this.MD.TemCadeiraDrDupli  = this.TemCadeiraDrDupli(obj.aph_chave);
          //  console.log(this.MD.TemCadeiraDrDupli);
          this.openModal(ModalID2,'modal-lg');

          /** teste */
          this.DrAgMarcada(this.MD);

        }
      }
    }

    AlterarHoje(obj,Modal){
      // console.log("AlterarHoje");
      // console.log(obj);
      // console.log(this.MD);

      this.DellProcess = false;
      this.hiderModal();

      this.openModal(Modal,'modal-lg');
    }

    AlterarHojeExe(obj,Modal){
      // console.log("AlterarHojeExe");
      // console.log(obj);
      // console.log(this.MD);

      this.DellProcess = true;
      this.hiderModal();


      let dados = {
        'USERID'        :   this.SelectClinicaDados.USERID,
        'PGnome'        :   this.SelectClinicaDados.PGnome, 
        'PGTela'        :   "Configurações",  
        'acaoBD'        :   "a",
        'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
        'unidade'       :   this.SelectClinicaDados.unidade,

        'cadeira'       :   this.CadeiraSelectTab,
        'cd_prestador'  :   this.MD.cd_prestador,
        'aph_chave'     :   this.MD.aph_chave,
        'DiaSelect'     :   this.MD.DiaEscolhidoSQL,
        'Dia'           :   this.MD.Dia,
        'HoraFim'       :   this.MD.HoraFim,
        'HoraINI'       :   this.MD.HoraINI,
        'duracao'       :   this.MD.duracao,
      }

      // console.log(dados);


      // this.AgendaConfigCadeiraService.AlterDrCadHoje(dados).subscribe
      this.AllService.PostUrl(dados,'AlterDrCadHoje').subscribe(data => {
        // console.log("retorno AlterDrCadHoje"); console.log(data);
        this.DellProcess = false;

          alert(data.MSG);
          this.ngOnInit();
        

      });





    }







    OpenDuplicado(obj,Modal){
      // console.log("OpenDuplicado");
      // console.log(obj);
      // console.log(Modal);
      // console.log(dia);
      this.DellProcess = false;
      this.hiderModal();

          this.MD = {};
          this.MD = obj;

          this.DrCadeDupliShow = [];
          this.DrCadeDupli.forEach(element => {
            // console.log(element);
            if(obj.aph_chave==element.id){
              // console.log(element);
              this.DrCadeDupliShow.push(element);
            }
          });

          // console.log(this.DrCadeDupliShow);
          this.openModal(Modal,'modal-lg');
    }

    RemoverDulp(obj){
      // console.log("RemoverDulp");
      // console.log(obj);
      // console.log(this.MD );

      
      this.DellProcess = true;
      this.hiderModal();
      console.log("2018 AcProssec true", this.AcProssec);
      this.AcProssec = true;

      let dados = {
        'USERID'        :   this.SelectClinicaDados.USERID,
        'PGnome'        :   this.SelectClinicaDados.PGnome, 
        'PGTela'        :   "Configurações",  
        'acaoBD'        :   "e",
        'cd_prestador'  :   obj.dados.cd_prestador,
        'aph_chave'     :   obj.dados.aph_chave,
        'DrMarcada'     :   obj.id,
        'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
        'unidade'       :   this.SelectClinicaDados.unidade,
        'cadeira'       :   this.CadeiraSelectTab,
        'DiaSelect'     :   this.MD.DiaEscolhidoSQL,
        'Dia'           :   this.MD.Dia,
        
        
      }

        // console.log("enviando");
        // console.log(dados);
      this.AgendaConfigCadeiraService.ReMoveDulpCad(dados).subscribe(data => {
        // console.log("retorno ReMoveDulpCad"); console.log(data);
        console.log("2042 AcProssec false", this.AcProssec);
        this.AcProssec = false;

        /*** erro true e pq presisa cancelar agendamentos */
        if(data.error){
            // add itens com dados para imprimir a add ag cancelado
            sessionStorage.removeItem('imprimirDados');
            sessionStorage.removeItem('imprimirDadosTotais');
            sessionStorage.removeItem('ImprimirPgConfig');
            sessionStorage.removeItem('imprimirAcDellDr');
            sessionStorage.removeItem('PgVoltar');

            let Ags = data.rest.SelectAgs;
            
           

            let arraylinha = [];    
            let arrayGrup = [];  
                arraylinha.push('Paciente');     
                arraylinha.push('Data Agenda');
                arraylinha.push('Hora Agendamento');
                arraylinha.push('telefone');
                arraylinha.push('telefone');
                arraylinha.push('telefone');
                arraylinha.push('telefone');

            
            let i = 0;
            arrayGrup[i] = (arraylinha);
            i++;

            let ChavesCancel = '';
            Ags.forEach(element => {
              // console.log(element);
              arraylinha = [];
              let nomea = element.nome != null ? element.nome : '';
              let nomeb = element.nome1 != null ? element.nome1 : '';
              let nome = nomea + nomeb;

              ChavesCancel = ChavesCancel + '"' + element.chave + '",';
              arraylinha.push(nome);
              arraylinha.push(element.DataDia);
              arraylinha.push(element.hora_agenda);
              arraylinha.push(element.num_telefone1);
              arraylinha.push(element.num_telefone2);
              arraylinha.push(element.tel1);
              arraylinha.push(element.tel2);
              // arraylinha.push( element.valor_parcela);
              // arraylinha.push( element.valor_credito);
      
              arrayGrup[i] = arraylinha;
              i++;
            });

            ChavesCancel = ChavesCancel.substr(0,(ChavesCancel.length - 1));


            let ImprimirPgConfig = {
              'Titulo'      : 'IMPRESSÃO DE AGENDAMENTOS',
              'DataPg'      : 'Data Inicio: '+ data.rest.DtIni +'- Data Fim: '+ data.rest.DtFim,
              'Unidade'     : this.SelectClinicaDados.nm_unidade_atendimento
            };

            
            let PgVoltar = {
              'url' : 'configuracao_cadeira'
            }

            let DadosAcDellDr = {
                'cadDrDell' :   data.dados.aph_chave,
                'AgCancel'  :   ChavesCancel,
            }


            sessionStorage.setItem('imprimirDados' , JSON.stringify(arrayGrup));
            // sessionStorage.setItem('imprimirDadosTotais' , JSON.stringify(arrayGrupT));
            sessionStorage.setItem('ImprimirPgConfig' , JSON.stringify(ImprimirPgConfig));
            sessionStorage.setItem('imprimirAcDellDr' , JSON.stringify(DadosAcDellDr));
            sessionStorage.setItem('PgVoltar' , JSON.stringify(PgVoltar));


            // console.log(DadosAcDellDr);

            this.router.navigate(['/Imprimir/ag']);


        }else{
          alert(this.AgendaConfigCadeiraService.RESReMoveDulpCad.MSG);
          this.ngOnInit();
        }


        
      });


    }


    HoraIniMaiorFim(MD){
      // console.log("HoraIniMaiorFim");
      // console.log(MD);
      // console.log(MD.HoraFimArrayFull);
      // console.log(MD.HoraINI);
      // console.log(MD);
        let horaIniSel= new Date(2017,1,1); /*2014, 1, 1*/
        let arrayHoraIni = MD.HoraINI.split(':');
        horaIniSel.setHours(arrayHoraIni[0],arrayHoraIni[1],0);
        let horaLoop = new Date(2017,1,1); 
        let newAraryHora = [];
      MD.HoraFimArrayFull.forEach(element => {
          // console.log(element);
          let arrayHoraloop = element.split(':');
          horaLoop.setHours(arrayHoraloop[0],arrayHoraloop[1],0);
          if( horaLoop > horaIniSel ){
            newAraryHora.push(element);
          }
      });
      this.MD.HoraFimArray = newAraryHora;
    }

    AddDrAg(obj){
      // console.log("AddDrAg");
      this.ErroData = false;
      this.ErroPrestador = false;
      this.ErroHoraFim = false;
      this.ErroMotivo = false;
          //  console.log(obj);
          //  console.log(this.MD);
          
        // console.log(this.model1);
        let erroTpo = false;
        if(this.MD.TipoAddAg == '1' && this.MD.motivo == ''){
              // console.log("1");
              erroTpo = true;
              this.erroAddDrAg(); 
        }else{
          // console.log("tipo prestador");
            if( (this.MD.motivo != '') && (this.model1) && (!this.MD.HoraFim == false) ) {
                  // console.log("2"); 
                  // let arraydata = this.model.formatted.split("/");
                  let data = this.modelfix.date.year +"-"+ this.modelfix.date.month+"-"+ this.modelfix.date.day;
                  obj.DataINI = data;

                  let arraydata1 = this.model1.formatted.split("/");
                  let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
                  obj.DataFIM = data1;

                  let dataInicil = new Date(this.modelfix.date.year,this.modelfix.date.month -1,this.modelfix.date.day);  
                  let dataFinal = new Date(this.model1.jsdate);  
                  // console.log(".....................................................");
                  // console.log(dataInicil,dataFinal);

                        if(dataInicil <= dataFinal ){
                               this.Inserir(obj);
                      }else{ /*console.log("erro 1");*/ this.erroAddDrAg(); }

            }else{ /*console.log("erro 2");*/if(this.MD.TipoAddAg == '1') {this.erroAddDrAg();} }
        }

        if( (erroTpo == false) && (this.MD.TipoAddAg == '0')  && (this.model1) && (!this.MD.HoraFim == false) && (!obj.Prestador == false) && (obj.Prestador != "") ) {
                  // console.log("B"); 
                  // let arraydata = this.model.formatted.split("/");
                  let data = this.modelfix.date.year +"-"+ this.modelfix.date.month+"-"+ this.modelfix.date.day;
                  obj.DataINI = data;

                  let arraydata1 = this.model1.formatted.split("/");
                  let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
                  obj.DataFIM = data1;

                  let dataInicil = new Date(this.modelfix.date.year,this.modelfix.date.month -1,this.modelfix.date.day);  
                  let dataFinal = new Date(this.model1.jsdate);  
                  // console.log(".....................................................");
                  // console.log(dataInicil,dataFinal);
                if(dataInicil <= dataFinal){
                  // console.log("B 2"); 
                  this.Inserir(obj);
              }else{ /*console.log("erro B1");*/  this.erroAddDrAg(); }
        }else{ /*console.log("erro B2");*/ this.erroAddDrAg(); }


        // console.log("fim");
    }

    Alterar(obj,modal){
      // console.log("Alterar");
      // console.log(obj);
      // console.log(this.model1);

      this.ModalErro = modal;

      this.hiderModal();

      if(obj.TipoAddAg == 1){
          // console.log("bloqueado");

          let data = this.modelfix.date.year +"-"+ this.modelfix.date.month+"-"+ this.modelfix.date.day;
          obj.DataINI = data;

          let arraydata1 = this.model1.formatted.split("/");
          let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
          obj.DataFIM = data1;

          let NewObj = {
            'Prestador'     :   obj.Prestador    == '' ?  'erro' : obj.Prestador,
            'cd_prestador'  :   obj.cd_prestador,
            'HoraINI'       :   obj.HoraINI     ,  
            'HoraFim'       :   obj.HoraFim     ,   
            'HoraFimAntiga' :   obj.HoraFimAntiga,  
            'Pulo'          :   obj.Pulo        ,
            'semana'        :   obj.semana      ,  
            'DataINI'       :   obj.DataINI     ,  
            'DataFIM'       :   obj.DataFIM     ,  
            'USERID'        :   this.SelectClinicaDados.USERID,  
            'PGnome'        :   this.SelectClinicaDados.PGnome,
            'PGTela'        :   "Configurações" ,       
            'TipoAddAg'     :   obj.TipoAddAg   ,
            'chave'         :   obj.chave       ,
            'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
            'unidade'       :   this.SelectClinicaDados.unidade,
            'cadeira'       :   this.CadeiraSelectTab,
            'motivo'        :   this.MD.motivo == '' ?  'erro' : this.MD.motivo,
            'DataDiaEscolha':   obj.DiaEscolhidoSQL   ,
            
          }


          let dataArray = obj.Dia.split("/");
          // console.log(dataArray);
          let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
          // console.log(diaBuscar);

          this.AgendaConfigCadeiraService.AlterBloqUnidade(NewObj).subscribe(res => {  this.ValidandoDRAddAg(diaBuscar,res); });
          // this.AllService.PostUrl(NewObj,'AlterBloqUnidade').subscribe(res => {  this.ValidandoDRAddAg(diaBuscar,res); });



      }else{
        // console.log("livre");

        let data = this.modelfix.date.year +"-"+ this.modelfix.date.month+"-"+ this.modelfix.date.day;
        obj.DataINI = data;

        let arraydata1 = this.model1.formatted.split("/");
        let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
        obj.DataFIM = data1;

        let NewObj = {
          'Prestador'     :   obj.Prestador    == '' ?  'erro' : obj.Prestador,
          'cd_prestador'  :   obj.cd_prestador,
          'HoraINI'       :   obj.HoraINI     ,  
          'HoraFim'       :   obj.HoraFim     ,  
          'Pulo'          :   obj.Pulo        ,
          'semana'        :   obj.semana      ,  
          'DataINI'       :   obj.DataINI     ,  
          'DataFIM'       :   obj.DataFIM     ,  
          'USERID'        :   this.SelectClinicaDados.USERID,
          'PGnome'        :   this.SelectClinicaDados.PGnome,
          'PGTela'        :   "Configurações" ,
          'TipoAddAg'     :   obj.TipoAddAg   ,
          'chave'         :   obj.aph_chave   ,
          'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
          'unidade'       :   this.SelectClinicaDados.unidade,
          'cadeira'       :   this.CadeiraSelectTab,
          'motivo'        :   this.MD.motivo == '' ?  'erro' : this.MD.motivo,
          'duracao'       :   obj.duracao == '' ?  5 : obj.duracao,
          'DataDiaEscolha':   obj.DiaEscolhidoSQL   ,
        }


        let dataArray = obj.Dia.split("/");
        // console.log(dataArray);
        let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
        // console.log(diaBuscar);

        this.AgendaConfigCadeiraService.AlterAgDrUnidade(NewObj).subscribe(res => {  this.ValidandoDRAddAg(diaBuscar,res); });
        // this.AllService.PostUrl(NewObj,'AlterAgDrUnidade').subscribe(res => {  this.ValidandoDRAddAg(diaBuscar,res); });



      }



    }

    Excluir(obj,modal){
      console.log("Excluir");
      // console.log(obj);

      this.ModalErro = modal;

      /** esconder modal */
      this.hiderModal();

      let arraydata2 = obj.Dia.split("/");
      let dataFimNova= new Date(arraydata2[2],arraydata2[1] -1,arraydata2[0]);  
      let Mh = (dataFimNova.getMonth()+1) < 10 ? '0'+ (dataFimNova.getMonth()+1): (dataFimNova.getMonth()+1);
      let Dh = dataFimNova.getDate() < 10 ? '0'+ (dataFimNova.getDate()): dataFimNova.getDate();
      let hojeSelect =  dataFimNova.getFullYear() +"-"+ Mh +"-"+  Dh;


      let chave = obj.chave != '' ? obj.chave : obj.aph_chave;
      let dados = {
          'chave'         :   chave           ,
          'USERID'        :   this.SelectClinicaDados.USERID,
          'PGnome'        :   this.SelectClinicaDados.PGnome, 
          'PGTela'        :   "Configurações"      ,  
          'Prestador'     :   obj.cd_prestador,
          'cd_prestador'  :   obj.cd_prestador,
          'HoraINI'       :   obj.HoraINI     ,  
          'HoraFim'       :   obj.HoraFim     ,  
          'semana'        :   obj.semana      ,  
          'DataINI'       :   obj.DataINI     ,  
          'DataFIM'       :   obj.DataFIM     ,
          'hojeSelect'    :   hojeSelect  ,
          'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
          'unidade'       :   this.SelectClinicaDados.unidade,
          'cadeira'       :   this.CadeiraSelectTab,
          'duracao'       :   obj.duracao,
      }




      // console.log(dados);
      let dataArray = obj.Dia.split("/");
      // console.log(dataArray);
      let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
      if(obj.chave == ''){
        // this.AgendaConfigCadeiraService.DellAgDrUnidade(dados).subscribe( res => { this.ValidandoDRAddAg(diaBuscar,res); });
        this.AllService.PostUrlAll(dados,'DellAgDrUnidade').subscribe( res => { this.ValidandoDRAddAg(diaBuscar,res); });
      }else{
        this.AgendaConfigCadeiraService.DellBloqUnidade(dados).subscribe( res => { this.ValidandoDRAddAg(diaBuscar); });
        // this.AllService.PostUrl(dados,'DellBloqUnidade').subscribe( res => { this.ValidandoDRAddAg(diaBuscar); });
      }
      


    }


    /** so pode excluir hoje se nao for bloqueado */
    ExcluirHoje(obj,modal){
      // console.log("ExcluirHoje");
      // console.log(obj);
         /** esconder modal */
      this.hiderModal();
      // console.log(this.modelfix);

      let M = this.modelfix.date.month < 10 ? '0'+this.modelfix.date.month : this.modelfix.date.month;
      let D = this.modelfix.date.day < 10 ? '0'+this.modelfix.date.day : this.modelfix.date.day;
      let data = this.modelfix.date.year +"-"+ M+"-"+ D;
      obj.DataINI = data;

      let arraydata1 = this.model1.formatted.split("/");
      let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
      obj.DataFIM = data1;

      let arraydata2 = obj.Dia.split("/");
      // console.log('array da data', arraydata2);
      // console.log("Data hoje ontem amanham!!!");
      let dataFimNova= new Date(arraydata2[2],arraydata2[1] -1,arraydata2[0]);  
      // let dataFimAmanha= new Date();
      //let dataFimOntem= new Date();
      // console.log(dataFimNova);

      let Mh = (dataFimNova.getMonth()+1) < 10 ? '0'+ (dataFimNova.getMonth()+1): (dataFimNova.getMonth()+1);
      let Dh = dataFimNova.getDate() < 10 ? '0'+ (dataFimNova.getDate()): dataFimNova.getDate();
      let hojeSelect =  dataFimNova.getFullYear() +"-"+ Mh +"-"+  Dh;

      dataFimNova.setDate(dataFimNova.getDate() - 1);
      // console.log("data -1", dataFimNova , dataFimNova.getDate(), dataFimNova.getMonth() , dataFimNova.getFullYear() );
      let dataFimOntem= new Date(dataFimNova.getFullYear(),dataFimNova.getMonth(),dataFimNova.getDate());
      // dataFimOntem.setDate(dataFimNova.getDate() );
      // dataFimOntem.setFullYear(dataFimNova.getFullYear());
      // dataFimOntem.setMonth(dataFimNova.getMonth());
      // console.log("ontem", dataFimOntem , dataFimOntem.getDate(), dataFimOntem.getMonth(), dataFimOntem.getFullYear() );
      let Mo = (dataFimOntem.getMonth()+1) < 10 ? '0'+ (dataFimOntem.getMonth()+1): (dataFimOntem.getMonth()+1);
      let Do = dataFimOntem.getDate() < 10 ? '0'+ (dataFimOntem.getDate()): dataFimOntem.getDate();
      let ontem =  dataFimOntem.getFullYear() +"-"+ Mo +"-"+  Do;

      dataFimNova.setDate(dataFimNova.getDate() +2);
      let dataFimAmanha= new Date(dataFimNova.getFullYear(),dataFimNova.getMonth(),dataFimNova.getDate());

      let Ma = (dataFimAmanha.getMonth()+1) < 10 ? '0'+ (dataFimAmanha.getMonth()+1): (dataFimAmanha.getMonth()+1);
      let Da = dataFimAmanha.getDate() < 10 ? '0'+ (dataFimAmanha.getDate()): dataFimAmanha.getDate();
      let amanha =  dataFimAmanha.getFullYear() +"-"+ Ma +"-"+  Da;

      // console.log(ontem);
      // console.log(hojeSelect);
      // console.log(amanha);

      let chave = obj.aph_chave ; //  obj.chave != '' ? obj.chave : obj.aph_chave; 


      let NewObj = {
        'chave'         :   chave           ,
        'Prestador'     :   obj.Prestador    == '' ?  'erro' : obj.Prestador,
        'cd_prestador'  :   obj.cd_prestador,
        'HoraINI'       :   obj.HoraINI     ,  
        'HoraFim'       :   obj.HoraFim     ,  
        'Pulo'          :   obj.Pulo        ,
        'semana'        :   obj.semana      ,
        'duracao'       :   obj.duracao     ,
        'DataINI'       :   obj.DataINI     ,  
        'DataFIM'       :   obj.DataFIM     ,  
        'hojeSelect'    :   hojeSelect  ,
        'DataFIMOnten'  :   ontem     ,  
        'DataFIMAmanha' :   amanha     ,  
        'USERID'        :   this.SelectClinicaDados.USERID,  
        'PGnome'        :   this.SelectClinicaDados.PGnome,
        'PGTela'        :   "Configurações" ,       
        'TipoAddAg'     :   obj.TipoAddAg   ,
        'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
        'unidade'       :   this.SelectClinicaDados.unidade,
        'cadeira'       :   this.CadeiraSelectTab,
        'motivo'        :   this.MD.motivo == '' ?  'erro' : this.MD.motivo,
      }

      //  console.log(NewObj);

      let dataArray = obj.Dia.split("/");
      // console.log(dataArray);
      let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
      
      this.AgendaConfigCadeiraService.DellAgDrUnidadeHoje(NewObj).subscribe( res => { this.ValidandoDRAddAg(diaBuscar,res); });
      // this.AllService.PostUrl(NewObj,'DellAgDrUnidadeHoje').subscribe( res => { this.ValidandoDRAddAg(diaBuscar,res); });


    }

    ExcluirEmDiante(obj,modal){
      //  console.log("ExcluirEmDiante");

      this.hiderModal();

      let M = this.modelfix.date.month < 10 ? '0'+this.modelfix.date.month : this.modelfix.date.month;
      let D = this.modelfix.date.day < 10 ? '0'+this.modelfix.date.day : this.modelfix.date.day;
      let data = this.modelfix.date.year +"-"+ M+"-"+ D;
      obj.DataINI = data;

      let arraydata1 = this.model1.formatted.split("/");
      let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
      obj.DataFIM = data1;

      let arraydata2 = obj.Dia.split("/");
      // console.log(arraydata2);
      // console.log("Data hoje ontem amanham!!!");
      let dataFimNova= new Date(arraydata2[2],arraydata2[1] -1,arraydata2[0]);  
      // let dataFimAmanha= new Date();
      // let dataFimOntem= new Date();
      // console.log(dataFimNova);

      let Mh = (dataFimNova.getMonth()+1) < 10 ? '0'+ (dataFimNova.getMonth()+1): (dataFimNova.getMonth()+1);
      let Dh = dataFimNova.getDate() < 10 ? '0'+ (dataFimNova.getDate()): dataFimNova.getDate();
      let hojeSelect =  dataFimNova.getFullYear() +"-"+ Mh +"-"+  Dh;

      dataFimNova.setDate(dataFimNova.getDate() - 1);
      let dataFimOntem= new Date(dataFimNova.getFullYear(),dataFimNova.getMonth(),dataFimNova.getDate());
      
      //dataFimOntem.setDate(dataFimNova.getDate() - 1);
      let Mo = (dataFimOntem.getMonth()+1) < 10 ? '0'+ (dataFimOntem.getMonth()+1): (dataFimOntem.getMonth()+1);
      let Do = dataFimOntem.getDate() < 10 ? '0'+ (dataFimOntem.getDate()): dataFimOntem.getDate();
      let ontem =  dataFimOntem.getFullYear() +"-"+ Mo +"-"+  Do;

      dataFimNova.setDate(dataFimNova.getDate() +2);
      let dataFimAmanha= new Date(dataFimNova.getFullYear(),dataFimNova.getMonth(),dataFimNova.getDate());
       
      //dataFimAmanha.setDate(dataFimNova.getDate() + 1);
      let Ma = (dataFimAmanha.getMonth()+1) < 10 ? '0'+ (dataFimAmanha.getMonth()+1): (dataFimAmanha.getMonth()+1);
      let Da = dataFimAmanha.getDate() < 10 ? '0'+ (dataFimAmanha.getDate()): dataFimAmanha.getDate();
      let amanha =  dataFimAmanha.getFullYear() +"-"+ Ma +"-"+  Da;

      // console.log(ontem);
      // console.log(amanha);

      let chave = obj.aph_chave ; //  obj.chave != '' ? obj.chave : obj.aph_chave; 


      let NewObj = {
        'chave'         :   chave           ,
        'Prestador'     :   obj.Prestador    == '' ?  'erro' : obj.Prestador,
        'cd_prestador'  :   obj.cd_prestador,
        'HoraINI'       :   obj.HoraINI     ,  
        'HoraFim'       :   obj.HoraFim     ,  
        'Pulo'          :   obj.Pulo        ,
        'semana'        :   obj.semana      ,
        'duracao'       :   obj.duracao     ,
        'DataINI'       :   obj.DataINI     ,  
        'DataFIM'       :   obj.DataFIM     ,  
        'DataFIMOnten'  :   ontem     ,  
        'DataFIMAmanha' :   amanha     ,  
        'hojeSelect'    :   hojeSelect  ,
        'USERID'        :   this.SelectClinicaDados.USERID,  
        'PGnome'        :   this.SelectClinicaDados.PGnome,
        'PGTela'        :   "Configurações" ,       
        'TipoAddAg'     :   obj.TipoAddAg   ,
        'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
        'unidade'       :   this.SelectClinicaDados.unidade,
        'cadeira'       :   this.CadeiraSelectTab,
        'motivo'        :   this.MD.motivo == '' ?  'erro' : this.MD.motivo,
      }

       console.log(NewObj);

      let dataArray = obj.Dia.split("/");
      // console.log(dataArray);
      let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
      this.AgendaConfigCadeiraService.DellAgDrUnidadeAteHoje(NewObj).subscribe( res => { this.ValidandoDRAddAg(diaBuscar,res); });
      // this.AllService.PostUrl(NewObj,'DellAgDrUnidadeAteHoje').subscribe( res => { this.ValidandoDRAddAg(diaBuscar,res); });
    }

    Inserir(obj){
      // console.log("AddDrAgNoErros");
      // console.log(obj);
        // console.log("entro datas");
        // console.log(this.model);
        // console.log(this.model1);
        this.hiderModal();
        // let arraydata = this.model.formatted.split("/");
        let M = this.modelfix.date.month < 10 ? '0'+this.modelfix.date.month : this.modelfix.date.month;
        let D = this.modelfix.date.day < 10 ? '0'+this.modelfix.date.day : this.modelfix.date.day;
        let data = this.modelfix.date.year +"-"+ M+"-"+ D;
        obj.DataINI = data;

        let arraydata1 = this.model1.formatted.split("/");
        let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
        obj.DataFIM = data1;

        // let dataInicil = new Date(this.modelfix.date.year,this.modelfix.date.month -1,this.modelfix.date.day);  
        // let dataFinal = new Date(this.model1.jsdate);  
        // console.log(".....................................................");
        // console.log(dataInicil,dataFinal);


        // console.log("go send back");
        obj.USERID = this.SelectClinicaDados.USERID;
        obj.PGnome = this.SelectClinicaDados.PGnome;
        obj.PGTela = "Configurações";
        obj.TipoAddAg = this.MD.TipoAddAg;

        let PuloArrayDias = [];
        if(obj.Pulo  == '1'){
          let dataPuloINI = new Date(this.modelfix.date.year,this.modelfix.date.month-1,this.modelfix.date.day);  
          let dataPuloFIM = new Date(arraydata1[2],parseInt(arraydata1[1]) -1, arraydata1[0] );  
          
          // console.log("qual dia e ", obj.semana );
          // console.log('data ini e fim ', dataPuloINI , dataPuloFIM);
          let diaSemanaEscolhido =  obj.semana - 1;
          let addDiaPulo =  true;
            /** lop para achar todas as data iguais (mesmo dia semana) ate a data fim  */
            for(let i= 0; dataPuloINI <= dataPuloFIM ; i++){
                  // console.log(dataPuloINI.getDay(), dataPuloINI);
                  
                  if(dataPuloINI.getDay() == diaSemanaEscolhido){
                    if(addDiaPulo){
                      let dm = (dataPuloINI.getMonth()+1) < 10 ? "0"+((dataPuloINI.getMonth())+1): (dataPuloINI.getMonth()+1) ;
                      let dd = dataPuloINI.getDate() < 10 ? "0"+dataPuloINI.getDate() : dataPuloINI.getDate() ;
                      let diaFomat = dataPuloINI.getFullYear() +"-"+ dm +"-"+ dd;
                      PuloArrayDias.push(diaFomat); 
                    }
                    addDiaPulo = addDiaPulo == true ? false : true;
                  }
                dataPuloINI.setDate(dataPuloINI.getDate() + 1);
                if (i >= 300) { break; }
            }
        }




            let NewObj = {
              'Prestador'     :   obj.Prestador    == '' ?  'erro' : obj.Prestador,
              'HoraINI'       :   obj.HoraINI     ,  
              'HoraFim'       :   obj.HoraFim     ,  
              'HoraFimArray'  :   obj.HoraFimArray,        
              'PuloArray'     :   obj.PuloArray   ,    
              'Pulo'          :   obj.Pulo        ,
              'pulodias'      :   PuloArrayDias   ,
              'semana'        :   obj.semana      ,  
              'duracao'       :   obj.duracao     ,  
              'DataINI'       :   obj.DataINI     ,  
              'DataFIM'       :   obj.DataFIM     ,  
              'USERID'        :   obj.USERID      ,  
              'PGnome'        :   obj.PGnome      ,  
              'PGTela'        :   obj.PGTela      ,  
              'TipoAddAg'     :   obj.TipoAddAg   ,
              'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
              'unidade'       :   this.SelectClinicaDados.unidade,
              'cadeira'       :   this.CadeiraSelectTab,
              'motivo'        :   this.MD.motivo == '' ?  'erro' : this.MD.motivo,
            }

            //   console.log("objeto enviar ");
            //  console.log(NewObj);


            let dataArray = obj.Dia.split("/");
            // console.log(dataArray);
            let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
            // console.log(diaBuscar);
            this.AgendaConfigCadeiraService.AddAgDrUnidade(NewObj).subscribe(res => {  this.ValidandoDRAddAg(diaBuscar,res); });
            // this.AllService.PostUrl(NewObj,'AddAgDrUnidade').subscribe(res => {  this.ValidandoDRAddAg(diaBuscar,res); });
            // this.AgendaConfigCadeiraService.AddAgDrUnidade(NewObj).subscribe(res => {  this.SHOWretorno(diaBuscar,res); });

    }


    /**verificar se tem ag marcado no dia da cadeira */
    DrAgMarcada(obj){
      // console.log("DrAgMarcada");
      // console.log(obj);

      let M = this.modelfix.date.month < 10 ? '0'+this.modelfix.date.month : this.modelfix.date.month;
      let D = this.modelfix.date.day < 10 ? '0'+this.modelfix.date.day : this.modelfix.date.day;
      let data = this.modelfix.date.year +"-"+ M+"-"+ D;
      obj.DataINI = data;

      let arraydata1 = this.model1.formatted.split("/");
      let data1 = arraydata1[2] +"-"+ arraydata1[1] +"-"+ arraydata1[0];
      obj.DataFIM = data1;

      let arraydata2 = obj.Dia.split("/");
      // console.log(arraydata2);
      // console.log("Data hoje ontem amanham!!!");
      let dataFimNova= new Date(arraydata2[2],arraydata2[1] -1,arraydata2[0]);  
      // let dataFimAmanha= new Date();
      // let dataFimOntem= new Date();
      // console.log(dataFimNova);

      let Mh = (dataFimNova.getMonth()+1) < 10 ? '0'+ (dataFimNova.getMonth()+1): (dataFimNova.getMonth()+1);
      let Dh = dataFimNova.getDate() < 10 ? '0'+ (dataFimNova.getDate()): dataFimNova.getDate();
      let hojeSelect =  dataFimNova.getFullYear() +"-"+ Mh +"-"+  Dh;

      dataFimNova.setDate(dataFimNova.getDate() - 1);
      let dataFimOntem= new Date(dataFimNova.getFullYear(),dataFimNova.getMonth(),dataFimNova.getDate());
       
      //dataFimOntem.setDate(dataFimNova.getDate() - 1);
      let Mo = (dataFimOntem.getMonth()+1) < 10 ? '0'+ (dataFimOntem.getMonth()+1): (dataFimOntem.getMonth()+1);
      let Do = dataFimOntem.getDate() < 10 ? '0'+ (dataFimOntem.getDate()): dataFimOntem.getDate();
      let ontem =  dataFimOntem.getFullYear() +"-"+ Mo +"-"+  Do;

      dataFimNova.setDate(dataFimNova.getDate() +2);
      let dataFimAmanha= new Date(dataFimNova.getFullYear(),dataFimNova.getMonth(),dataFimNova.getDate());
       
      //dataFimAmanha.setDate(dataFimNova.getDate() + 1);
      let Ma = (dataFimAmanha.getMonth()+1) < 10 ? '0'+ (dataFimAmanha.getMonth()+1): (dataFimAmanha.getMonth()+1);
      let Da = dataFimAmanha.getDate() < 10 ? '0'+ (dataFimAmanha.getDate()): dataFimAmanha.getDate();
      let amanha =  dataFimAmanha.getFullYear() +"-"+ Ma +"-"+  Da;

      // console.log(ontem);
      // console.log(amanha);

      let chave = obj.aph_chave ; //  obj.chave != '' ? obj.chave : obj.aph_chave; 


      let NewObj = {
        'chave'         :   chave           ,
        'Prestador'     :   obj.Prestador    == '' ?  'erro' : obj.Prestador,
        'cd_prestador'  :   obj.cd_prestador,
        'HoraINI'       :   obj.HoraINI     ,
        'HoraFim'       :   obj.HoraFim     ,
        'Pulo'          :   obj.Pulo        ,
        'semana'        :   obj.semana      ,
        'duracao'       :   obj.duracao     ,
        'DataINI'       :   obj.DataINI     ,
        'DataFIM'       :   obj.DataFIM     ,
        'DataFIMOnten'  :   ontem       ,
        'hojeSelect'    :   hojeSelect  ,
        'DataFIMAmanha' :   amanha      ,
        'USERID'        :   this.SelectClinicaDados.USERID,
        'PGnome'        :   this.SelectClinicaDados.PGnome,
        'PGTela'        :   "Configurações" ,
        'TipoAddAg'     :   obj.TipoAddAg   ,
        'cd_filial'     :   this.SelectClinicaDados.cd_unidade_atendimento,
        'unidade'       :   this.SelectClinicaDados.unidade,
        'cadeira'       :   this.CadeiraSelectTab,
        'motivo'        :   this.MD.motivo == '' ?  'erro' : this.MD.motivo,
      }

      // console.log(NewObj);

      let dataArray = obj.Dia.split("/");
      // console.log(dataArray);
      let diaBuscar = dataArray[2] +"-"+dataArray[1]+"-"+dataArray[0];
      
      // this.AgendaConfigCadeiraService.DrAgMarcada(NewObj).
      this.AllService.PostUrl(NewObj,'DrAgMarcada').subscribe( res => { this.ValidandoAgAlterar(res); });



    }

    ValidandoAgAlterar(res){
      // console.log("ValidandoAgAlterar");
      // console.log(res);
      // let obj = res.obj;
      // if(obj.RetornoAG){
      //   if(obj.RetornoAG.length > 0){
      //     console.log("existe agendameto para cancelar");
      //     // this.PermitirAltera = false;
      //   }

      // }
     
      

    }

    onSelectUnidade(obj){
      // console.log('onSelectUnidade');
      // console.log(obj);

      this.SelectClinicaDados.nm_unidade_atendimento =  obj.label;
      this.SelectClinicaDados.chave =  obj.value;
      this.SelectClinicaDados.unidade =   obj.value;
      this.ngOnInit();

    }
    

    ErroShowTab(obj){
      // console.log("ErroShowTab");
      // console.log(obj);

      let msg =  'Erro existe agendamento cadastrado no dia : '  + obj.data_agenda + ' as  '+ obj.hora_agenda;
      this.alertMe(msg);
      
    }


    
    ValidandoDRAddAg(data , retornoErro = null){
       console.log("ValidandoDRAddAg DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
       console.log(retornoErro);

        if((retornoErro) && retornoErro.error == true){
          // console.log("show msg erro");
            //this.openModal( this.ModalErro ,'modal-lg');

            if(retornoErro.show){
                this.ErroShowTab(retornoErro.dadosShowTb);
                return true;
            }


            this.alertMe(retornoErro.msg);
            // console.log("all",retornoErro);
            let dados  = retornoErro.dados;
            // console.log("age futuros");
            // console.log(dados);
            if(dados.agendaMarcada){

              // console.log("dados agenda");
              // console.log(dados.agenda);
                sessionStorage.removeItem('imprimirDados');
                sessionStorage.removeItem('imprimirDadosTotais');
                sessionStorage.removeItem('ImprimirPgConfig');
                sessionStorage.removeItem('imprimirAcDellDr');
                sessionStorage.removeItem('PgVoltar');
    
                let Ags = dados.agenda.SelectAgs;
                
              
    
                let arraylinha = [];    
                let arrayGrup = [];  
                    arraylinha.push('Paciente');     
                    arraylinha.push('Data Agenda');
                    arraylinha.push('Hora Agendamento');
                    arraylinha.push('telefone');
                    arraylinha.push('telefone');
                    arraylinha.push('telefone');
                    arraylinha.push('telefone');
    
                
                let i = 0;
                arrayGrup[i] = (arraylinha);
                i++;
    
                let ChavesCancel = '';
                Ags.forEach(element => {
                  // console.log(element);
                  arraylinha = [];
                  let nomea = element.nome != null ? element.nome : '';
                  let nomeb = element.nome1 != null ? element.nome1 : '';
                  let nome = nomea + nomeb;
    
                  ChavesCancel = ChavesCancel + '"' + element.chave + '",';
                  arraylinha.push(nome);
                  arraylinha.push(element.DataDia);
                  arraylinha.push(element.hora_agenda);
                  arraylinha.push(element.num_telefone1);
                  arraylinha.push(element.num_telefone2);
                  arraylinha.push(element.tel1);
                  arraylinha.push(element.tel2);
                  // arraylinha.push( element.valor_parcela);
                  // arraylinha.push( element.valor_credito);
          
                  arrayGrup[i] = arraylinha;
                  i++;
                });
    
                ChavesCancel = ChavesCancel.substr(0,(ChavesCancel.length - 1));
    
    
                let ImprimirPgConfig = {
                  'Titulo'      : 'IMPRESSÃO DE AGENDAMENTOS',
                  'DataPg'      : 'Data Inicio: '+ dados.DtIni +'- Data Fim: '+ dados.DtFim,
                  'Unidade'     : this.SelectClinicaDados.nm_unidade_atendimento
                };
    
                
                let PgVoltar = {
                  'url' : 'configuracao_cadeira'
                }
    
                let DadosAcDellDr = {
                    'cadDrDell' :   dados.chave,
                    'AgCancel'  :   ChavesCancel,
                }
    
    
                sessionStorage.setItem('imprimirDados' , JSON.stringify(arrayGrup));
                // sessionStorage.setItem('imprimirDadosTotais' , JSON.stringify(arrayGrupT));
                sessionStorage.setItem('ImprimirPgConfig' , JSON.stringify(ImprimirPgConfig));
                sessionStorage.setItem('imprimirAcDellDr' , JSON.stringify(DadosAcDellDr));
                sessionStorage.setItem('PgVoltar' , JSON.stringify(PgVoltar));
    
    
                // console.log(DadosAcDellDr);
    
                this.router.navigate(['/Imprimir/Cad']);
                return true;
            }






        }
         

      
      // console.log(data);
      let arrayData = data.split("-");
      // console.log(arrayData);

      this.model= { date: { year: arrayData[0], month: parseInt(arrayData[1]) , day: parseInt(arrayData[2]) } };
      this.model.formatted = arrayData[0] +"/"+arrayData[1]+"/"+arrayData[2];
      
      this.buscarDataSelecionada();
    }

    ZerarErrosMSGADD(){
      // console.log("ZerarErrosMSGADD");
      this.ErroData = false;
      this.ErroPrestador = false;
      this.ErroHoraFim = false;
      this.ErroMotivo = false;

    }

    erroAddDrAg(){
      // console.log("erroAddDrAg");
      // console.log((this.model));
      // console.log((this.model1));
      // console.log(this.MD.Prestador);
      //     console.log((!this.MD.Prestador));
      //     console.log((this.MD.Prestador == ""));
        if( (this.MD.TipoAddAg == '0') && ( (!this.MD.Prestador ) || (this.MD.Prestador == "") ) ){
            // console.log("pestador erro add true");
            this.ErroPrestador = true;
            this.ERROMSGPrestador = "Informe o prestador!";
        }

        if(this.MD.TipoAddAg == '1' && this.MD.motivo == ''){
            this.ErroMotivo = true;
            this.ERROMSGMotivo = "Informe o Motivo!";
        }

          // console.log((this.MD.HoraFim));
          // console.log(this.MD.HoraFim);
        if( (!this.MD.HoraFim ) || (this.MD.HoraFim == "") ){
            // console.log("pestador erro add true");
            this.ErroHoraFim = true;
            this.ERROMSGHoraFim = "Informe a Hora Fim!";
        }

        if( this.model1 ){
          let dataInicil = new Date(this.modelfix.date.year,this.modelfix.date.month -1,this.modelfix.date.day);  
          let dataFinal = new Date(this.model1.jsdate);  
            if(!(dataInicil <= dataFinal) ){
                  this.ErroData = true;
                  this.ERROMSGDATA = "A data inicial deve ser menor ou igual que a data final.";
            }
        }else{
          this.ErroData = true;
          this.ERROMSGDATA = "A data Final deve ser informada.";
        }
    }

    onSelectedPrestCadAdd(item){
      //  console.log("onSelectedPrestCadAdd");
      // console.log(item);

       this.MD.Prestador = item.value;
      //  console.log(this.MD.Prestador);
       this.PrestadorSelected = item.label;

    }

    deselectSelectedPrestCad(){
      this.MD.Prestador = "";
      this.PrestadorSelected = "Selecione um prestador.";

    }


    alertMe(MSG): void {
      setTimeout(function(): void {
        alert(MSG);
      });
    }

    /** copya configuração do datapiker */
    getCopyOfOptions(): IMyDpOptions {
      return JSON.parse(JSON.stringify(this.myDatePickerOptionsB));
    }

    /** nao usado  TODAS PARA BAIXO*/
    onDisableRange(checked:boolean) {
      let bdate = new Date();
      let edate = new Date();
      // console.log("desabilitando datas ");
      // console.log(this.MD);

      // Disable/enable +-3 today
      let copy = this.getCopyOfOptions();

      bdate.setDate(bdate.getDate() - 3);
      edate.setDate(edate.getDate() + 3);

      copy.disableDateRanges = checked ? [{begin: {year: bdate.getFullYear(), month: bdate.getMonth() + 1, day: bdate.getDate()}, end: {year: edate.getFullYear(), month: edate.getMonth() + 1, day: edate.getDate()}}] : [];
      this.myDatePickerOptionsB = copy;
    }

    arrayToObject = (array) =>
      array.reduce((obj, item) => {
        console.log(item);
          obj[item.id] = item
              return obj
    }, {});

    SHOWretorno(a,b){
      console.log("SHOWretorno");
      console.log(a);
      console.log(b);

    }
}
