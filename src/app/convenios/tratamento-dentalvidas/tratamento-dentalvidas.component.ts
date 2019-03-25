import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { TratamentoDentalvidasService } from './tratamento-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { NotifyService } from '../../shared/services/notify.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';
import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-tratamento-dentalvidas',
  templateUrl: './tratamento-dentalvidas.component.html',
  styleUrls: ['./tratamento-dentalvidas.component.css']
})
export class TratamentoDentalvidasComponent implements OnInit {

    myDatePickerOptions: any;
    multiple0: any;
    loading: boolean;
	filtros = {
				  baseDados: "",
                  chaveUnidade: "",
                  dataInicio: null,
                  dataFim: null,
                  status: ""
              };

    SelectClinicaDados  = {
      'chave'                  : ' ', 
      'unidade'                : ' ',
      'nm_unidade_atendimento' : ' ',
      'BaseIndex'              : null,
      'cd_unidade_atendimento' : ' ',
      'chaveUsuario'           : null
    };
    ListUnidadePrestador       : any;
    ListUnidadeTodas           : any;

    ListaTrat: any[];
    ListaInterv: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;
    selecionaTodos: boolean; // variavel que sinaliza se a opção de selecão de todos os registros está checada
    valorTotalEnviar: number = 0;
    valorTotalEnviado: number = 0;
    valorTotalConvTrat: number = 0;

    tratDetalhe: any;
    public modalRef: BsModalRef;
    subscriptions: Subscription[] = [];
    messages: string[] = [];

	constructor(private authService: AuthService, private tratamentoDentalvidasService : TratamentoDentalvidasService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private modalService: BsModalService, private changeDetection: ChangeDetectorRef,
                private unidadeAtendimentoService: UnidadeAtendimentoService, private router: Router) {
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.tratamentoDentalvidasService.URLIndex;
	}

	ngOnInit() {
		
		this.ListaTrat = [];
        this.ListaInterv = [];

		this.obterDataAtual();
		this.setarFiltrosIniciais();

		let dadosUnid = {
	        'chaveUsuario'  : this.SelectClinicaDados.chaveUsuario
	    }

		if(typeof this.ListUnidadePrestador === 'undefined'){ 
	        this.unidadeAtendimentoService.GetUnidadesPrestador(dadosUnid).subscribe(
	        	res=> {
	        		this.ListUnidadePrestador = res;
	        	}
	        );
	    }

        if(typeof this.ListUnidadeTodas === 'undefined'){ 
            this.unidadeAtendimentoService.GetAllUnidadeAtendimento().subscribe(
                res=> {
                    this.ListUnidadeTodas = res;
                }
            );
        }
	}

    public openModal(template: TemplateRef<any>, classT?:any ) {
        if (!classT) {
            classT =  'md-Full';
        }

        this.messages = [];
 
        const _combine = combineLatest(
            this.modalService.onShow,
            this.modalService.onShown,
            this.modalService.onHide,
            this.modalService.onHidden
        ).subscribe(() => this.changeDetection.markForCheck());

        this.subscriptions.push(
            this.modalService.onHide.subscribe((reason: string) => {
                const _reason = reason ? `, dismissed by ${reason}` : '';
                this.unsubscribe();
            })
        );
        
        this.subscriptions.push(_combine);
        this.modalRef = this.modalService.show(template, {class: classT});
        
    }

    unsubscribe() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    }

    hideModal() {
        this.modalRef.hide();
    }

	onSelectUnidade(item){
      
        this.SelectClinicaDados.chave = item.value;
        this.SelectClinicaDados.unidade = item.value;
        this.SelectClinicaDados.nm_unidade_atendimento = item.label;
        this.limparDados();
    }

    onChangeStatus() {
        this.limparDados();
    }

    setarFiltrosIniciais() {
    	this.filtros.baseDados = this.varsProd.NomeEmpresa;
        this.filtros.status = "todos";
    }

    obterDataAtual() {
    	let dataHoje = new Date;
    	this.dataHojeYMD = dataHoje.getFullYear() + "-" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "-" + (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate());
    	this.dataHojeDMY = (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()) + "/" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "/" + dataHoje.getFullYear();
    }

    checkAll(evento)
    {
        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                if(!item.data_envio && item.nome_unid_ope && item.nr_guia_gto)
                {
                    item.enviar = evento.target.checked;
                }
            }
        }
        //console.log(this.ListaTrat);
    }

    abrirTelaPagamento()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasnotafiscalpagto');
    }

    abrirTelaLoteGto()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidaslotegto');
    }

    abrirTelaNotaFiscal()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasnotafiscal');
    }

    abrirDetalhes(trat, template)
    {
        this.tratDetalhe = null;
        this.tratDetalhe = this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento);
        //console.log(this.tratDetalhe);
        this.totalizaItensTrat(trat);
        this.openModal(template);
    }

    buscarDados(validarFiltros)
	{
		if(validarFiltros === true)
		{
			if(this.filtrosValidos() === true)
			{
				this.getDados();
			}
		}
		else
		{
			this.getDados();
		}
	}

	getDados()
	{
		let filtrosParam = Object.assign({}, this.filtros);
		filtrosParam.dataInicio = filtrosParam.dataInicio ? this.formatDataDMYToYMD(filtrosParam.dataInicio.formatted) : this.dataHojeYMD;
		filtrosParam.dataFim = filtrosParam.dataFim ? this.formatDataDMYToYMD(filtrosParam.dataFim.formatted) : this.dataHojeYMD;
		filtrosParam.chaveUnidade = filtrosParam.chaveUnidade ? filtrosParam.chaveUnidade : this.SelectClinicaDados.unidade;

		//console.log(filtrosParam);

		this.loading = true;
		this.tratamentoDentalvidasService.GetTratamentosEnviarDentalvidas(filtrosParam).subscribe(
        	response=> {
        		this.ListaInterv = (response.dados ? response.dados : []);
                
                this.ListaInterv.forEach((item) => {
                    item.nome_unid_ope = "";
                    
                    let temp = this.ListUnidadeTodas.filter(x => x.chave == item.chave_unid_ope)[0];
                    
                    if(temp)
                    {
                        item.nome_unid_ope = temp.nm_unidade_atendimento;
                    }
                    else
                    {
                        if(item.chave_unid_ope == "matrizdentalvidas")
                        {
                            item.nome_unid_ope = "Matriz Dentalvidas";
                        }
                        else
                        {
                            item.nome_unid_ope = item.chave_unid_ope;
                        }
                    }
                });

                this.ListaTrat = [];
                this.ListaInterv.forEach((item) => {
                    let itemAdd = this.ListaTrat.filter(x => x.chave_tratamento == item.chave_tratamento)[0];
                    if(!itemAdd)
                    {
                        itemAdd = Object.assign({}, item);
                        //itemAdd.valor_total = parseFloat(item.valor_total);
                        //itemAdd.valor_total_convenio = parseFloat(item.valor_total_convenio);
                        this.ListaTrat.push(itemAdd);
                    }
                    else
                    {
                        itemAdd.valor_total = parseFloat(itemAdd.valor_total) + parseFloat(item.valor_total);
                        itemAdd.valor_total_convenio = parseFloat(itemAdd.valor_total_convenio) + parseFloat(item.valor_total_convenio);
                    }

                });

                //console.log(this.ListaTrat);
        		
                this.totalizaValores();
        		
        		this.loading = false;
        		this.selecionaTodos = false;

                if (this.ListaInterv.length == 0) {
                    this.notifyService.info('Nenhum registro encontrado!', '');
                }
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao consultar dados');
            }
        );
	}

    limparDados() {
        this.ListaTrat = [];
        this.ListaInterv = [];
        this.limparTotais();
        this.selecionaTodos = false;
        this.valorTotalConvTrat = 0;
    }

	filtrosValidos() {
        let dataInicio = this.filtros.dataInicio ? this.formatDataDMYToYMD(this.filtros.dataInicio.formatted) : this.dataHojeYMD;
        let dataFim = this.filtros.dataFim ? this.formatDataDMYToYMD(this.filtros.dataFim.formatted) : this.dataHojeYMD;

        if(dataInicio > dataFim)
        {
            alert("Data Início deve ser menor ou igual à Data Fim.");
            return false;
        }
        
        //console.log("***");
        //console.log(this.dateDiffIndays(dataInicio, dataFim));
        if(this.dateDiffIndays(dataInicio, dataFim) > 31)
        {
            alert("Favor informar um intervalo máximo de 31 dias.")
            return false;
        }

		return true;
	}

    totalizaItensTrat(trat) {
        this.valorTotalConvTrat = 0;

        this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento).forEach((item) => {
            this.valorTotalConvTrat += parseFloat(item.receber_convenio);
        });

        this.valorTotalConvTrat = parseFloat(this.valorTotalConvTrat.toFixed(2));
    }

	enviarTratamentos() {
    	let somaEnviar = this.obterSomaValoresEnviar();

    	somaEnviar = parseFloat(somaEnviar.toFixed(2));
    	if(somaEnviar == 0)
    	{
    		alert("Favor selecionar os tratamentos a serem enviados.");
    	}
    	else if(confirm("Confirma o envio dos tratamentos cobertos no valor de R$ " + somaEnviar + "?") === true)
    	{
    		this.registrarEnvio();
    	}
    }

    registrarEnvio() {
        this.loading = true;

        let arrayEnvio = this.ListaTrat.filter(x => x.enviar == 1);
        let objeto = {
        	id_usuario: this.SelectClinicaDados.chaveUsuario,
            chave_unidade_origem: this.SelectClinicaDados.chave,
            valor_total: this.obterSomaValoresEnviar(),
        	arrayEnviar: arrayEnvio
        };

        //console.log(arrayEnvio);

        this.tratamentoDentalvidasService.RegistrarEnvioTratamentos(objeto).subscribe(
            response => {
                //console.log(response);
                this.loading = false;
                this.buscarDados(false);
                this.selecionaTodos = false;

                this.notifyService.success('Informação', 'Envio registrado com sucesso!');
                
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao enviar tratamentos');
            }
        );
    }

	totalizaValores() {

        this.valorTotalEnviar = 0;
        this.valorTotalEnviado = 0;
        
        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                this.valorTotalEnviar += parseFloat(item['valor_total_convenio']);
                if(item['data_envio'])
                {
                	this.valorTotalEnviado += parseFloat(item['valor_total_convenio']);
                }
            }
        }
        this.valorTotalEnviar = parseFloat(this.valorTotalEnviar.toFixed(2));
        this.valorTotalEnviado = parseFloat(this.valorTotalEnviado.toFixed(2));
    }

    limparTotais() {
        this.valorTotalEnviar = 0;
        this.valorTotalEnviado = 0;
    }

    obterSomaValoresEnviar() {

        let soma = 0;

        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                if(item['enviar'] == 1)
                {
                    soma += parseFloat(item['valor_total_convenio']);
                }
            }
        }
        return soma;
    }

    formatDataYMDToDMY(data)
    {
        return data.substr(8, 2) + '/' + data.substr(5, 2) + '/' + data.substr(0, 4);
    }

    formatDataDMYToYMD(data)
    {
        return data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2);
    }

    dateDiffIndays(dateYMD1, dateYMD2) {

        let dateMDY1 = dateYMD1.substr(5, 2) + '/' + dateYMD1.substr(8, 2) + '/' + dateYMD1.substr(0, 4);
        let dateMDY2 = dateYMD2.substr(5, 2) + '/' + dateYMD2.substr(8, 2) + '/' + dateYMD2.substr(0, 4);

        let dt1 = new Date(dateMDY1);
        let dt2 = new Date(dateMDY2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

}
