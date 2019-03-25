import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { TratamentoDentalvidasNotaFiscalPagtoService } from './tratamento-dentalvidas-nota-fiscal-pagto.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { PrestadorService } from '../../shared/services/prestador.service';
import { NotifyService } from '../../shared/services/notify.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-tratamento-dentalvidas-nota-fiscal-pagto',
  templateUrl: './tratamento-dentalvidas-nota-fiscal-pagto.component.html',
  styleUrls: ['./tratamento-dentalvidas-nota-fiscal-pagto.component.css']
})
export class TratamentoDentalvidasNotaFiscalPagtoComponent implements OnInit {

	myDatePickerOptions: any;
    multiple0: any;
    loading: boolean;
	filtros = {
				  baseDados: "",
                  dataInicio: null,
                  dataFim: null,
                  chaveUnidade: "",
                  tipoTratamento: "",
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
    ListTipoTratamento		   : any;

    ListaLote: any[];
    ListaTrat: any[];
    ListaInterv: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;
    valorTotalConvTrat: number = 0;
    valorTotalConvTratSelec: number = 0;

    usuarioPerfilAdmin: any;
    tratDetalhe: any;
    public modalRef: BsModalRef;
    subscriptions: Subscription[] = [];
  	messages: string[] = [];
  	loteModal: any;
  	selecionaTodos: boolean;
    selecionaTodosCanc: boolean;

	constructor(private authService: AuthService, private tratamentoDentalvidasNotaFiscalPagtoService : TratamentoDentalvidasNotaFiscalPagtoService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private unidadeAtendimentoService: UnidadeAtendimentoService,
                private tipoTratamentoService: TipoTratamentoService,
                private prestadorService: PrestadorService, private router: Router,
                private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
		
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.tratamentoDentalvidasNotaFiscalPagtoService.URLIndex;

        this.prestadorService.PossuiPerfilAdmin(this.SelectClinicaDados.chaveUsuario).subscribe(
            res=> {
                this.usuarioPerfilAdmin = res;
            }
        );
	}

	ngOnInit() {
		
		this.ListaLote = [];
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

        if(typeof this.ListTipoTratamento === 'undefined'){ 
            this.tipoTratamentoService.GetAllTipoTratamento().subscribe(
                res=> {
                    this.ListTipoTratamento = res;
                }
            );
        }
	}

	public openModal(template: TemplateRef<any>, classT?:any, tipoModal?:any ) {
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

    onDownload(lote) {

    	this.loading = true;
    	this.tratamentoDentalvidasNotaFiscalPagtoService.GetUrlNotaFiscalLote(lote).subscribe(
    		response => {
    			//console.log(response);
    			let url  = response.dados;

    			this.hideModal();
    			this.loading = false;

    			if(response.error === true)
    			{
    				this.notifyService.danger('Erro', 'Arquivo não encontrado!');
    			}
    			else
    			{
    				window.open(url, "_blank");
    			}
    		},
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao fazer download do arquivo');
            }
    	);
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

    onChangeTipoTrat() {
    	this.limparDados();
    }

    checkAll(evento)
    {
        if(this.ListaLote)
        {
            for(let item of this.ListaLote)
            {
                if(!item.dt_pagamento_lote)
                {
                    item.registrar_pagto = evento.target.checked;
                }
                item.cancelar_pagto = 0;
            }
        }
        
        this.selecionaTodosCanc = false;
        
    }

    checkAllCanc(evento)
    {
        if(this.ListaLote)
        {
            for(let item of this.ListaLote)
            {
                if(item.dt_pagamento_lote)
                {
                    item.cancelar_pagto = evento.target.checked;
                }
                item.registrar_pagto = 0;
            }
        }
        this.selecionaTodos = false;
    }

    onChangeRegistrarPagtoCheck(lote) {
    	this.selecionaTodosCanc = false;

    	this.ListaLote.forEach((itemLista) => {
            itemLista.cancelar_pagto = 0;
        });
    }

    onChangeCancPagtoCheck(item) {
        this.selecionaTodos = false;

        this.ListaLote.forEach((itemLista) => {
            itemLista.registrar_pagto = 0;
        });
    }

    setarFiltrosIniciais() {
    	this.filtros.baseDados = this.varsProd.NomeEmpresa;
        this.filtros.status = "todos";
        this.filtros.tipoTratamento = "todos";
    }

    obterDataAtual() {
    	let dataHoje = new Date;
    	this.dataHojeYMD = dataHoje.getFullYear() + "-" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "-" + (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate());
    	this.dataHojeDMY = (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()) + "/" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "/" + dataHoje.getFullYear();
    }

    abrirTelaEnvio()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasenvio');
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
    	this.totalizaItensTrat(trat);
    	this.openModal(template);
    }

    abrirModalNotaFiscal(lote, template)
    {
    	this.loteModal = lote;
    	this.loteModal.substituir_nf = 0;
    	this.openModal(template, 'sem_classe');
    }

    totalizaItensTrat(trat) {
		this.valorTotalConvTrat = 0;
		this.valorTotalConvTratSelec = 0;

		this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento).forEach((item) => {
			this.valorTotalConvTrat += parseFloat(item.receber_convenio);
			if(item.data_inclusao_item_operadora && !item.tipo_glosa)
			{
				this.valorTotalConvTratSelec += parseFloat(item.receber_convenio);
			}
		});

		this.valorTotalConvTrat = parseFloat(this.valorTotalConvTrat.toFixed(2));
		this.valorTotalConvTratSelec = parseFloat(this.valorTotalConvTratSelec.toFixed(2));
	}

    filtrarItensLote(lote)
    {
    	return this.ListaTrat.filter(x => x.id_lote == lote.id_lote);
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
		this.limparDados();

		this.loading = true;
		this.tratamentoDentalvidasNotaFiscalPagtoService.GetLotesDentalvidasPagar(filtrosParam).subscribe(
        	response=> {
        		this.ListaInterv = (response.dados ? response.dados : []);
                //console.log(this.ListaInterv);

                this.ListaTrat = [];
                this.ListaInterv.forEach((item) => {
                	let itemAdd = this.ListaTrat.filter(x => x.chave_tratamento == item.chave_tratamento)[0];
                	if(!itemAdd)
                	{
                		itemAdd = Object.assign({}, item);
                		itemAdd.valor = parseFloat(item.valor);
                		itemAdd.receber_convenio = parseFloat(item.receber_convenio);
                		itemAdd.vl_pagar_procedimento = parseFloat(item.vl_pagar_procedimento);
                		if(!item.tipo_glosa)
                        {
                            itemAdd.vl_receber = parseFloat(item.receber_convenio);
                        }
                		this.ListaTrat.push(itemAdd);
                	}
                	else
                	{
                		itemAdd.valor = parseFloat(itemAdd.valor) + parseFloat(item.valor);
                		itemAdd.receber_convenio = parseFloat(itemAdd.receber_convenio) + parseFloat(item.receber_convenio);
                		itemAdd.vl_pagar_procedimento = parseFloat(itemAdd.vl_pagar_procedimento) + parseFloat(item.vl_pagar_procedimento);
                		if(!item.tipo_glosa)
                        {
                            itemAdd.vl_receber = parseFloat(itemAdd.vl_receber) + parseFloat(item.receber_convenio);
                        }
                	}

		        });

		        this.ListaLote = [];
                this.ListaTrat.forEach((item) => {
                	
                	item.valor = parseFloat(item.valor.toFixed(2));
                	item.receber_convenio = parseFloat(item.receber_convenio.toFixed(2));
                	item.vl_pagar_procedimento = parseFloat(item.vl_pagar_procedimento.toFixed(2));
                	item.vl_receber = item.vl_receber ? parseFloat(item.vl_receber.toFixed(2)) : 0.00;
                	
                	let itemAdd = this.ListaLote.filter(x => x.id_lote == item.id_lote)[0];

                	if(!itemAdd)
                	{
                		itemAdd = Object.assign({}, item);
                		//itemAdd.vl_pagar_procedimento = parseFloat(item.vl_pagar_procedimento);
                		itemAdd.rowexpanded = 0;
                		this.ListaLote.push(itemAdd);
                	}
                	else
                	{
                		//itemAdd.vl_pagar_procedimento = parseFloat(itemAdd.vl_pagar_procedimento) + parseFloat(item.vl_pagar_procedimento);
                	}

		        });
                
        		//console.log(ListaLoteAux);
        		//console.log(this.ListaTrat);
        		
        		this.loading = false;

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

	pagarNotas() {
    	let somaPagar = this.obterSomaValoresPagar();

    	somaPagar = parseFloat(somaPagar.toFixed(2));

    	if(somaPagar == 0)
    	{
    		alert("Favor selecionar as notas a serem pagas.");
    	}
    	else
    	{
            let msg = "Confirma o pagamento das notas no valor total de R$ " + somaPagar + "?";
            
            if(confirm(msg) === true)
            {
                this.registrarPagamento();
            }
    	}
    }

    cancelarPagamento() {
        let somaPagCanc = this.obterSomaValoresPagosCancelar();

        somaPagCanc = parseFloat(somaPagCanc.toFixed(2));

        if(somaPagCanc == 0)
        {
            alert("Favor selecionar os pagamentos a serem cancelados.");
        }
        else
        {
            let msg = "Confirma o cancelamento do pagamento das notas no valor de R$ " + somaPagCanc + "?";
            
            if(confirm(msg) === true)
            {
                this.registrarCancelamento();
            }
        }
    }

    registrarPagamento() {
        this.loading = true;

        let arrayPagtoLote = this.ListaLote.filter(x => x.registrar_pagto == 1);

        arrayPagtoLote.forEach((lote) => {
        	//Obtem a lista de tipos de tratamento de cada lote
        	//lote.listaTipoTrat = this.ListaInterv.filter(x => x.id_lote == lote.id_lote && !x.tipo_glosa).map(x => x.tipo_tratamento).filter((x, i, a) => a.indexOf(x) == i);

        	let ListaIntervAux = this.ListaInterv.slice(0); //Clona o array para outra variável
        	
        	lote.tiposTratamento = [];
        	
        	ListaIntervAux.filter(x => x.id_lote == lote.id_lote && !x.tipo_glosa).map(x => x.tipo_tratamento).filter((x, i, a) => a.indexOf(x) == i).forEach((tipoTrat) => {
        		
        		let tipoTratamento = {
	    			chave: '',
	    			intervencoes: []
	    		}

	    		tipoTratamento.chave = tipoTrat;
        		tipoTratamento.intervencoes = this.ListaInterv.filter(x => x.id_lote == lote.id_lote && !x.tipo_glosa && x.tipo_tratamento == tipoTrat);

        		//lote.tiposTratamento.chave = tipoTrat;
        		//lote.tiposTratamento.intervencoes = this.ListaInterv.filter(x => x.id_lote == lote.id_lote && !x.tipo_glosa && x.tipo_tratamento == tipoTrat);
        		lote.tiposTratamento.push(tipoTratamento);
        		console.log(lote.tiposTratamento);
        	});
        	
        });

        let objeto = {
        	id_usuario: this.SelectClinicaDados.chaveUsuario,
            chave_unidade_filtro: this.SelectClinicaDados.chave,
        	arrayLotePagar: arrayPagtoLote
        };

        //console.log(arrayPagtoLote);

        this.tratamentoDentalvidasNotaFiscalPagtoService.RegistrarPagtoLotesDentalvidas(objeto).subscribe(
            response => {
                console.log(response);
                this.loading = false;
                this.buscarDados(false);
                this.selecionaTodos = false;

                this.notifyService.success('Informação', 'Pagamento registrado com sucesso!');
                
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao registrar pagamento');
            }
        );
    }

    registrarCancelamento() {
        this.loading = true;

        let arrayCancLote = this.ListaLote.filter(x => x.cancelar_pagto == 1);

        arrayCancLote.forEach((lote) => {
        	//Obtem a lista de tipos de tratamento de cada lote
        	let ListaIntervAux = this.ListaInterv.slice(0); //Clona o array para outra variável
        	
        	lote.tiposTratamento = [];
        	
        	ListaIntervAux.filter(x => x.id_lote == lote.id_lote && !x.tipo_glosa).map(x => x.tipo_tratamento).filter((x, i, a) => a.indexOf(x) == i).forEach((tipoTrat) => {
        		
        		let tipoTratamento = {
	    			chave: '',
	    			intervencoes: []
	    		}

	    		tipoTratamento.chave = tipoTrat;
        		tipoTratamento.intervencoes = this.ListaInterv.filter(x => x.id_lote == lote.id_lote && !x.tipo_glosa && x.tipo_tratamento == tipoTrat);

        		lote.tiposTratamento.push(tipoTratamento);
        	});
        	
        });

        let objeto = {
        	id_usuario: this.SelectClinicaDados.chaveUsuario,
            chave_unidade_filtro: this.SelectClinicaDados.chave,
        	arrayLoteCanc: arrayCancLote
        };

        //console.log(arrayCancLote);

        this.tratamentoDentalvidasNotaFiscalPagtoService.RegistrarCancPagtoNFDentalvidas(objeto).subscribe(
            response => {
                console.log(response);
                this.loading = false;
                this.buscarDados(false);
                this.selecionaTodosCanc = false;

                this.notifyService.success('Informação', 'Cancelamento registrado com sucesso!');
                
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao registrar cancelamento');
            }
        );
    }

    obterSomaValoresPagar() {

        let soma = 0;

        if(this.ListaLote)
        {
            for(let item of this.ListaLote)
            {
                if(item['registrar_pagto'] == 1)
                {
                    soma += parseFloat(item['vl_lote_bruto']);
                }
            }
        }
        return soma;
    }

    obterSomaValoresPagosCancelar() {

        let soma = 0;

        if(this.ListaLote)
        {
            for(let item of this.ListaLote)
            {
                if(item['cancelar_pagto'] == 1)
                {
                    soma += parseFloat(item['vl_lote_bruto']);
                }
            }
        }
        return soma;
    }

	limparDados() {
		this.ListaLote = [];
        this.ListaTrat = [];
        this.ListaInterv = [];

        this.valorTotalConvTrat = 0;
		this.valorTotalConvTratSelec = 0;
    }

	filtrosValidos() {
        let dataInicio = this.filtros.dataInicio ? this.formatDataDMYToYMD(this.filtros.dataInicio.formatted) : this.dataHojeYMD;
        let dataFim = this.filtros.dataFim ? this.formatDataDMYToYMD(this.filtros.dataFim.formatted) : this.dataHojeYMD;

        if(dataInicio > dataFim)
        {
            alert("Data Início deve ser menor ou igual à Data Fim.");
            return false;
        }
        
        if(this.dateDiffIndays(dataInicio, dataFim) > 31)
        {
            alert("Favor informar um intervalo máximo de 31 dias.")
            return false;
        }

		return true;
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
