import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { TratamentoDentalvidasNotaFiscalService } from './tratamento-dentalvidas-nota-fiscal.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { PrestadorService } from '../../shared/services/prestador.service';
import { NotifyService } from '../../shared/services/notify.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-tratamento-dentalvidas-nota-fiscal',
  templateUrl: './tratamento-dentalvidas-nota-fiscal.component.html',
  styleUrls: ['./tratamento-dentalvidas-nota-fiscal.component.css']
})
export class TratamentoDentalvidasNotaFiscalComponent implements OnInit {

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

    usuarioPerfilAdmin: boolean = false;
    tratDetalhe: any;
    public modalRef: BsModalRef;
    subscriptions: Subscription[] = [];
  	messages: string[] = [];
  	arquivoNfAnexar: File = null;
  	loteAnexar: any;

	constructor(private authService: AuthService, private tratamentoDentalvidasNotaFiscalService : TratamentoDentalvidasNotaFiscalService,
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
		this.SelectClinicaDados.BaseIndex = this.tratamentoDentalvidasNotaFiscalService.URLIndex;

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
				
				if(tipoModal == 'anexar_nf')
				{
					this.arquivoNfAnexar = null;
				}
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

    onFileSelected(event) {
    	this.arquivoNfAnexar = event.target.files[0];
    }

    onUpload() {
    	
    	const fd = new FormData();

    	if(this.validarArquivoNotaFiscal(this.arquivoNfAnexar)) {
    		this.loading = true;

    		let nomeArquivo = this.arquivoNfAnexar.name.replace(/-/g, "_"); //Substitui todos os "-" por "_"
            fd.append('arquivo_nf', this.arquivoNfAnexar, this.loteAnexar.id_lote + "-" + this.SelectClinicaDados.chaveUsuario + "-" + nomeArquivo);
    		fd.append('_method', 'PUT');

	    	this.tratamentoDentalvidasNotaFiscalService.UploadNotaFiscalLote(fd).subscribe(
	    		response => {
	    			//console.log(response);
	    			this.arquivoNfAnexar = null;

	    			this.hideModal();
	    			this.loading = false;

	    			if(response != "erro")
	    			{
	    				this.notifyService.info('Nota Fiscal Anexada com Sucesso!', '');
	    			}
	    			else
	    			{
	    				this.notifyService.danger('Erro', 'Erro ao enviar a nota fiscal');
	    			}
	    			
	    			this.getDados();
	    		},
	            error => {
	                this.loading = false;
	                this.notifyService.danger('Erro', 'Erro ao enviar a nota fiscal');
	            }
	    	);

    	}
    }

    onDownload(lote) {

    	this.loading = true;
    	this.tratamentoDentalvidasNotaFiscalService.GetUrlNotaFiscalLote(lote).subscribe(
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

    validarArquivoNotaFiscal(arquivo) {
    	
    	let retorno = true;
    	
    	if(!arquivo)
    	{
    		alert("Favor selecionar um arquivo.");
    		retorno = false;
    	}
    	else if(arquivo.size <= 0) {
    		alert("Favor selecionar um arquivo válido.");
    		retorno = false;
    	}
    	else if(arquivo.size > 5000000) { //Verifica tamanho do arquivo em Bytes
    		alert("Tamanho do arquivo maior que 5Mb. Favor verificar a autenticidade do mesmo.");
    		retorno = false;
    	}

    	return retorno;
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

    abrirTelaPagamento()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/tratamentodentalvidasnotafiscalpagto');
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
    	this.loteAnexar = lote;
    	this.loteAnexar.substituir_nf = 0;
    	this.openModal(template, 'sem_classe', 'anexar_nf');
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
		this.tratamentoDentalvidasNotaFiscalService.GetLotesDentalvidasNotaFiscal(filtrosParam).subscribe(
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
