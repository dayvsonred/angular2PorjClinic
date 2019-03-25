import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { TratamentoDentalvidasLoteGtoService } from './tratamento-dentalvidas-lote-gto.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { PrestadorService } from '../../shared/services/prestador.service';
import { NotifyService } from '../../shared/services/notify.service';
import { GeneralService } from '../../shared/services/general.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-tratamento-dentalvidas-lote-gto',
  templateUrl: './tratamento-dentalvidas-lote-gto.component.html',
  styleUrls: ['./tratamento-dentalvidas-lote-gto.component.css']
})
export class TratamentoDentalvidasLoteGtoComponent implements OnInit {

	myDatePickerOptions: any;
    multiple0: any;
    loading: boolean;
	filtros = {
				  baseDados: "",
                  dataInicio: null,
                  dataFim: null,
                  chaveUnidade: "",
                  chaveUnidadePagar: "",
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
    ListUnidadeTodas           : any;
    ListTipoTratamento		   : any;

    ListaTrat: any[];
    ListaInterv: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;
    selecionaTodos: boolean; // variavel que sinaliza se a opção de selecão de todos os registros está checada
    selecionaTodosCanc: boolean;

    valorGeralSemLote: number = 0;
    valorTotalSelecLote: number = 0;
    valorTotalSelecLoteMaisGlosa: number = 0;
    valorTotalConvTrat: number = 0;
    valorTotalConvTratSelec: number = 0;

    usuarioPerfilAdmin: any;
    tratDetalhe: any;
    public modalRef: BsModalRef;
    subscriptions: Subscription[] = [];
  	messages: string[] = [];

	constructor(private authService: AuthService, private tratamentoDentalvidasLoteGtoService : TratamentoDentalvidasLoteGtoService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private unidadeAtendimentoService: UnidadeAtendimentoService,
                private tipoTratamentoService: TipoTratamentoService, private generalService: GeneralService,
                private prestadorService: PrestadorService, private router: Router,
                private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.tratamentoDentalvidasLoteGtoService.URLIndex;

        this.prestadorService.PossuiPerfilAdmin(this.SelectClinicaDados.chaveUsuario).subscribe(
            res=> {
                this.usuarioPerfilAdmin = res;
            }
        );
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
                    this.ListUnidadeTodas.push({chave:"", nm_unidade_atendimento: "", value: "", label: "Todas"});
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
				//this.messages.push(`onHide event has been fired${_reason}`);
				this.totalizaTratGeral();
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

    onSelectUnidadePagar(item){
    	this.filtros.chaveUnidadePagar = item.value;
        this.limparDados();
    }

    onChangeStatus() {
        this.limparDados();
    }

    onChangeTipoTrat() {
    	this.limparDados();
    }

    /*onChangeTipoGlosa(event, item) {
        if(item.tipo_glosa == event.target.value)
        {
            item.tipo_glosa = null;
            item.confirmar = 0;
            if(item.glosado == 'N')
            {
                item.obs_glosa = null;
            }
        }
        else
        {
            item.tipo_glosa = event.target.value;
            item.confirmar = 1;
            item.cancelar = 0;
        }
    }*/

    onChangeIncluirCheck(item) {
        

        this.ListaInterv.filter(x => x.chave_tratamento == item.chave_tratamento).forEach(x => x.incluir_no_lote = item.incluir_no_lote);
        
        this.limparOpcaoCancelamento();
        
        this.totalizaTratGeral();
    }

    limparOpcaoCancelamento() {
    	this.selecionaTodosCanc = false;

    	this.ListaTrat.forEach((itemLista) => {
            itemLista.cancelar_lote = 0;
        });

        this.ListaInterv.forEach((itemLista) => {
            itemLista.cancelar_lote = 0;
        });
    }

    onChangeIncluirItemTratCheck(itemTrat) {
    	this.checarTratamentoIncluiLote(itemTrat);
    }

    checarTratamentoIncluiLote(itemTrat) {
    	let trat = this.ListaTrat.filter(x => x.chave_tratamento == itemTrat.chave_tratamento)[0];
		trat.incluir_no_lote = this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento && x.incluir_no_lote == 1 && x.tipo_glosa == null).length > 0 ? 1 : 0;
		
		this.limparOpcaoCancelamento();

		this.totalizaItensTrat(trat);
    }

    onChangeCancelarCheck(item) {
        this.selecionaTodos = false;

        this.ListaInterv.filter(x => x.chave_tratamento == item.chave_tratamento).forEach(x => x.cancelar_lote = item.cancelar_lote);
        
        this.ListaTrat.forEach((itemLista) => {
            itemLista.incluir_no_lote = 0;
        });

        this.ListaInterv.forEach((itemLista) => {
            itemLista.incluir_no_lote = 0;
        });

        //console.log(this.ListaInterv.filter(x => x.cancelar_lote == 1));
        this.totalizaTratGeral();
    }

    onChangeTipoGlosa(event, itemTrat) {
        if(itemTrat.tipo_glosa == event.target.value)
        {
            itemTrat.tipo_glosa = null;
            itemTrat.incluir_no_lote = 0;
            itemTrat.obs_glosa = null;
        }
        else
        {
            itemTrat.tipo_glosa = event.target.value;
            itemTrat.incluir_no_lote = 1;
        }
        this.checarTratamentoIncluiLote(itemTrat);
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

    checkAll(evento)
    {
        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                if(!item.id_lote && item.nr_guia_gto)
                {
                    item.incluir_no_lote = evento.target.checked;
                    this.ListaInterv.filter(x => x.chave_tratamento == item.chave_tratamento).forEach(x => x.incluir_no_lote = evento.target.checked);
                }
                item.cancelar_lote = 0;
                this.ListaInterv.filter(x => x.chave_tratamento == item.chave_tratamento).forEach(x => x.cancelar_lote = 0);
            }
        }
        this.selecionaTodosCanc = false;
        
        this.totalizaTratGeral();
    }

    checkAllCanc(evento)
    {
        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                if(item.id_lote && !item.nota_fiscal_lote)
                {
                    item.cancelar_lote = evento.target.checked;
                    this.ListaInterv.filter(x => x.chave_tratamento == item.chave_tratamento).forEach(x => x.cancelar_lote = evento.target.checked);
                }
                item.incluir_no_lote = 0;
                this.ListaInterv.filter(x => x.chave_tratamento == item.chave_tratamento).forEach(x => x.incluir_no_lote = 0);
            }
            //console.log(this.ListaTrat.filter(x => x.cancelar_lote == 1));
            //console.log(this.ListaInterv.filter(x => x.cancelar_lote == 1));
        }
        this.selecionaTodos = false;
        this.totalizaTratGeral();
    }

    abrirTelaEnvio()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasenvio');
    }

    abrirTelaNotaFiscal()
    {
    	let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasnotafiscal');
    }

    abrirTelaPagamento()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasnotafiscalpagto');
    }

    abrirDetalhes(trat, template)
    {
    	this.tratDetalhe = null;
    	this.tratDetalhe = this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento);
    	//console.log(this.tratDetalhe);
    	this.totalizaItensTrat(trat);
    	//this.totalizaTratGeral();
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
		this.limparDados();

		this.loading = true;
		this.tratamentoDentalvidasLoteGtoService.GetTratamentosDentalvidasGerarLote(filtrosParam).subscribe(
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
                		this.ListaTrat.push(itemAdd);
                	}
                	else
                	{
                		itemAdd.valor = parseFloat(itemAdd.valor) + parseFloat(item.valor);
                		itemAdd.receber_convenio = parseFloat(itemAdd.receber_convenio) + parseFloat(item.receber_convenio);
                		itemAdd.vl_pagar_procedimento = parseFloat(itemAdd.vl_pagar_procedimento) + parseFloat(item.vl_pagar_procedimento);
                	}

		        });
                
                let ListaLoteAux = [];
                this.ListaTrat.forEach((item) => {
                	item.valor = parseFloat(item.valor.toFixed(2));
                	item.receber_convenio = parseFloat(item.receber_convenio.toFixed(2));
                	item.vl_pagar_procedimento = parseFloat(item.vl_pagar_procedimento.toFixed(2));
                	if(item.id_lote)
                	{
                		//Verifica se o tratamento está na lista auxiliar
                		if(ListaLoteAux.filter(x => x == item.id_lote).length == 0)
                		{
                			item.qtdItensLote = this.ListaTrat.filter(x => x.id_lote == item.id_lote).length;
                			ListaLoteAux.push(item.id_lote);
                		}
                	}
		        });
        		
        		//console.log(ListaLoteAux);
        		//console.log(this.ListaTrat);
                this.totalizaTratGeral();
        		
        		this.loading = false;
        		this.selecionaTodos = false;
                this.selecionaTodosCanc = false;

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

	validarCriacaoLote() {
		let retorno = true;
		let tratLote = this.ListaTrat.filter(x => x.incluir_no_lote == 1);

		if(tratLote.length == 0) {
			alert("Favor selecionar as GTOs que serão incluídas no lote.");
			retorno = false;
		}

		tratLote.forEach((trat) => {
			if(this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento && x.incluir_no_lote == 0).length > 0)
			{
				alert("Alguns procedimentos do paciente " + trat.paciente + "\nnão foram incluídos no lote nem glosados. Favor verificar!");
				retorno = false;
			}
		});
		return retorno;
	}

	validarExclusaoLote() {
		let retorno = true;
		let tratLoteCanc = this.ListaTrat.filter(x => x.cancelar_lote == 1);

		if(tratLoteCanc.length == 0) {
			alert("Favor selecionar os lotes a serem excluídos.");
			retorno = false;
		}

		return retorno;
	}

	criarLote() {

		if(this.validarCriacaoLote() === true)
		{
			let qtdGtosLote = this.ListaTrat.filter(x => x.incluir_no_lote == 1).length;
			if(confirm("Confirma a criação do lote com " + qtdGtosLote + " GTOs e valor total de R$ " + this.valorTotalSelecLote + "?") == true)
			{
				this.loading = true;

                let objImp = {
                    chave_unidade: this.SelectClinicaDados.chave,
                    valor_referencia: this.valorTotalSelecLote
                }

                this.generalService.GetAliquotaImpostos(objImp).subscribe(
                    respImp => {

                        //console.log(respImp);
                        //console.log(respImp.dados);

                        let arrayNovoLote = this.ListaInterv.filter(x => x.incluir_no_lote == 1);
                        let arrayTipoTrat = arrayNovoLote.map(x => x.tipo_tratamento).filter((x, i, a) => a.indexOf(x) == i); //Funciona como distinct

                        let valorDescontadoImposto = this.valorTotalSelecLote;
                        if(respImp.dados) {
                            valorDescontadoImposto = this.descontarImpostos(arrayNovoLote, this.valorTotalSelecLoteMaisGlosa, this.valorTotalSelecLote, respImp.dados);
                        }

                        let objeto = {
                            id_usuario: this.SelectClinicaDados.chaveUsuario,
                            chave_unidade_filtro: this.SelectClinicaDados.chave,
                            chave_unidade_atendimento: this.filtros.chaveUnidadePagar,
                            arrayLote: arrayNovoLote,
                            arrayTipoTratamento: arrayTipoTrat,
                            valorLoteBruto: this.valorTotalSelecLote,
                            valorLoteLiquido: valorDescontadoImposto
                        };
                        
                        this.tratamentoDentalvidasLoteGtoService.CriarLoteGto(objeto).subscribe(
                            respLote => {
                                //console.log(respLote);
                                this.loading = false;
                                this.buscarDados(false);
                                this.selecionaTodos = false;

                                this.notifyService.success('Informação', 'Lote criado com sucesso!');
                                
                            },
                            error => {
                                this.loading = false;
                                this.notifyService.danger('Erro', 'Erro ao criar lote');
                            }
                        );
                    },
                    error => {
                        this.loading = false;
                        this.notifyService.danger('Erro', 'Erro ao buscar alíquotas de impostos');
                    }
                );

			}
		}
	}

	excluiLote() {
		if(this.validarExclusaoLote() === true)
		{
			if(confirm("Confirma a exclusão dos lotes selecionados?") == true)
			{
				let justificativaExc = prompt("Favor informar o motivo da exclusão:");
	            while(!justificativaExc)
	            {
	                justificativaExc = prompt("Favor informar o motivo da exclusão:");
	            }

				this.loading = true;

		        let arrayItensLoteExc = this.ListaInterv.filter(x => x.cancelar_lote == 1);
		        let arrayIDsLoteExc = arrayItensLoteExc.map(x => x.id_lote).filter((x, i, a) => a.indexOf(x) == i); //Funciona como distinct

		        let objeto = {
		        	id_usuario: this.SelectClinicaDados.chaveUsuario,
		        	arrayIDsLote: arrayIDsLoteExc,
		            arrayItensLote: arrayItensLoteExc,
		            obsExclusao: justificativaExc
		        };
		        
		        this.tratamentoDentalvidasLoteGtoService.ExcluirLoteGto(objeto).subscribe(
		            response => {
		                //console.log(response);
		                this.loading = false;
		                this.buscarDados(false);
		                this.selecionaTodos = false;

		                this.notifyService.success('Informação', 'Lotes excluídos com sucesso!');
		                
		            },
		            error => {
		                this.loading = false;
		                this.notifyService.danger('Erro', 'Erro ao excluir lote');
		            }
		        );
			}
		}
	}

    descontarImpostos(arrayItensLote, valorBrutoMaisGlosa, valorBrutoSemGlosa, arrayAliquotas) {

        let valorLiquido = 0;
        let totalAliquotas = 0;
        arrayAliquotas.forEach((item) => {
            totalAliquotas += parseFloat(item.perc_imposto);
        });

        valorLiquido = valorBrutoMaisGlosa - (valorBrutoMaisGlosa * totalAliquotas / 100);
        valorLiquido = parseFloat(valorLiquido.toFixed(2));

        let somaValorLiquidoItens = 0;
        for (let cont = 0; cont < arrayItensLote.length; cont++) { 
            //Desconta do último item possíveis diferenças de arredondamento
            if(cont == arrayItensLote.length - 1)
            {
                arrayItensLote[cont].vl_pagar_procedimento = parseFloat((valorLiquido - somaValorLiquidoItens).toFixed(2));
            }
            else
            {
                arrayItensLote[cont].vl_pagar_procedimento = parseFloat((arrayItensLote[cont].receber_convenio - (arrayItensLote[cont].receber_convenio * totalAliquotas / 100)).toFixed(2));
                somaValorLiquidoItens += arrayItensLote[cont].vl_pagar_procedimento;
            }
        }

        let valorLiquidoSemGlosa = valorBrutoSemGlosa - (valorBrutoSemGlosa * totalAliquotas / 100);
        valorLiquidoSemGlosa = parseFloat(valorLiquidoSemGlosa.toFixed(2));
        
        return valorLiquidoSemGlosa;
    }

    limparDados() {
        this.ListaTrat = [];
        this.ListaInterv = [];
        //this.limparTotais();
        this.selecionaTodos = false;
        this.selecionaTodosCanc = false;

        this.valorTotalConvTrat = 0;
		this.valorTotalConvTratSelec = 0;
        this.valorGeralSemLote = 0;
		this.valorTotalSelecLote = 0;
        this.valorTotalSelecLoteMaisGlosa = 0;
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

	totalizaItensTrat(trat) {
		this.valorTotalConvTrat = 0;
		this.valorTotalConvTratSelec = 0;

		this.ListaInterv.filter(x => x.chave_tratamento == trat.chave_tratamento).forEach((item) => {
			//this.valorTotalConvTrat += parseFloat(item.vl_pagar_procedimento);
            this.valorTotalConvTrat += parseFloat(item.receber_convenio);
			if((item.incluir_no_lote == 1 || item.id_lote) && !item.tipo_glosa)
			{
				//this.valorTotalConvTratSelec += parseFloat(item.vl_pagar_procedimento);
                this.valorTotalConvTratSelec += parseFloat(item.receber_convenio);
			}
		});

		this.valorTotalConvTrat = parseFloat(this.valorTotalConvTrat.toFixed(2));
		this.valorTotalConvTratSelec = parseFloat(this.valorTotalConvTratSelec.toFixed(2));
	}

	totalizaTratGeral() {
		this.valorGeralSemLote = 0;
		this.valorTotalSelecLote = 0;
        this.valorTotalSelecLoteMaisGlosa = 0;

		this.ListaInterv.forEach((item) => {
			if(!item.id_lote)
			{
				//this.valorLiquidoGeralSemLote += parseFloat(item.vl_pagar_procedimento);
                this.valorGeralSemLote += parseFloat(item.receber_convenio);
			}
			
			if(item.incluir_no_lote == 1)
			{
                if(!item.id_lote && !item.tipo_glosa)
                {
                    this.valorTotalSelecLote += parseFloat(item.receber_convenio);
                }
                this.valorTotalSelecLoteMaisGlosa += parseFloat(item.receber_convenio);
			}
		});

		this.valorGeralSemLote = parseFloat(this.valorGeralSemLote.toFixed(2));
		this.valorTotalSelecLote = parseFloat(this.valorTotalSelecLote.toFixed(2));
        this.valorTotalSelecLoteMaisGlosa = parseFloat(this.valorTotalSelecLoteMaisGlosa.toFixed(2));
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
