import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { MensalidadeDentalvidasNotaFiscalService } from './mensalidade-dentalvidas-nota-fiscal.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { PrestadorService } from '../../shared/services/prestador.service';
import { NotifyService } from '../../shared/services/notify.service';
import { GeneralService } from '../../shared/services/general.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-mensalidade-dentalvidas-nota-fiscal',
  templateUrl: './mensalidade-dentalvidas-nota-fiscal.component.html',
  styleUrls: ['./mensalidade-dentalvidas-nota-fiscal.component.css']
})
export class MensalidadeDentalvidasNotaFiscalComponent implements OnInit {

	myDatePickerOptions: any;
    multiple0: any;
    loading: boolean;
	filtros = {
				  baseDados: "",
                  dataInicio: null,
                  dataFim: null,
                  chaveUnidade: "",
                  tipoRepasse: "",
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
    ListaMens: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;
    //valorTotalConvTrat: number = 0;
    //valorTotalConvTratSelec: number = 0;

    usuarioPerfilAdmin: boolean = false;
    public modalRef: BsModalRef;
    subscriptions: Subscription[] = [];
    messages: string[] = [];
  	arquivoNfAnexar: File = null;
  	loteAnexar: any;

	constructor(private authService: AuthService, private mensalidadeDentalvidasNotaFiscalService : MensalidadeDentalvidasNotaFiscalService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private unidadeAtendimentoService: UnidadeAtendimentoService,
                private prestadorService: PrestadorService, private router: Router,
                private modalService: BsModalService, private changeDetection: ChangeDetectorRef,
                private generalService: GeneralService) {
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.mensalidadeDentalvidasNotaFiscalService.URLIndex;

        this.prestadorService.PossuiPerfilAdmin(this.SelectClinicaDados.chaveUsuario).subscribe(
            res=> {
                this.usuarioPerfilAdmin = res;
            }
        );
	}

	ngOnInit() {
		
		this.ListaLote = [];
		this.ListaMens = [];

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
	}

	onFileSelected(event) {
    	this.arquivoNfAnexar = event.target.files[0];
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

    onUpload() {
    	
    	const fd = new FormData();

    	if(this.validarArquivoNotaFiscal(this.arquivoNfAnexar)) {
    		this.loading = true;

    		let nomeArquivo = this.arquivoNfAnexar.name.replace(/-/g, "_"); //Substitui todos os "-" por "_"
            fd.append('arquivo_nf', this.arquivoNfAnexar, this.loteAnexar.id_lote + "-" + this.SelectClinicaDados.chaveUsuario + "-" + nomeArquivo);
    		fd.append('_method', 'PUT');

	    	this.mensalidadeDentalvidasNotaFiscalService.UploadNotaFiscalLoteMens(fd).subscribe(
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
    	this.mensalidadeDentalvidasNotaFiscalService.GetUrlNotaFiscalLoteMens(lote).subscribe(
    		response => {
    			//console.log(response);
    			let url  = response.Dados;

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

    onChangeTipoRepasse() {
    	this.limparDados();
    }

    setarFiltrosIniciais() {
    	this.filtros.baseDados = this.varsProd.NomeEmpresa;
        this.filtros.status = "todos";
        this.filtros.tipoRepasse = "autorizada";
    }

    obterDataAtual() {
    	let dataHoje = new Date;
    	this.dataHojeYMD = dataHoje.getFullYear() + "-" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "-" + (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate());
    	this.dataHojeDMY = (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()) + "/" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "/" + dataHoje.getFullYear();
    }

    abrirTelaMensalidade()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/mensalidadedentalvidas');
    }

    abrirModalNotaFiscal(lote, template)
    {
        this.loteAnexar = lote;
        this.loteAnexar.substituir_nf = 0;
        this.openModal(template, 'sem_classe', 'anexar_nf');
    }

    filtrarItensLote(lote)
    {
        return this.ListaMens.filter(x => x.id_lote == lote.id_lote);
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
		filtrosParam.dataInicio = filtrosParam.dataInicio ? this.generalService.formatDataDMYToYMD(filtrosParam.dataInicio.formatted) : this.dataHojeYMD;
		filtrosParam.dataFim = filtrosParam.dataFim ? this.generalService.formatDataDMYToYMD(filtrosParam.dataFim.formatted) : this.dataHojeYMD;
		filtrosParam.chaveUnidade = filtrosParam.chaveUnidade ? filtrosParam.chaveUnidade : this.SelectClinicaDados.unidade;

		//console.log(filtrosParam);
		this.limparDados();

		this.loading = true;
		this.mensalidadeDentalvidasNotaFiscalService.GetLotesMensalidadeNotaFiscal(filtrosParam).subscribe(
        	response=> {
        		this.ListaMens = (response.Dados ? response.Dados : []);
                //console.log(this.ListaMens);

		        this.ListaLote = [];
                this.ListaMens.forEach((item) => {
                	
                	let itemAdd = this.ListaLote.filter(x => x.id_lote == item.id_lote)[0];

                	if(!itemAdd)
                	{
                		itemAdd = Object.assign({}, item);
                		itemAdd.rowexpanded = 0;
                		this.ListaLote.push(itemAdd);
                	}
		        });
                
        		this.loading = false;

                //console.log(this.ListaLote);

                if (this.ListaMens.length == 0) {
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
        this.ListaMens = [];
    }

	filtrosValidos() {
        let dataInicio = this.filtros.dataInicio ? this.generalService.formatDataDMYToYMD(this.filtros.dataInicio.formatted) : this.dataHojeYMD;
        let dataFim = this.filtros.dataFim ? this.generalService.formatDataDMYToYMD(this.filtros.dataFim.formatted) : this.dataHojeYMD;

        if(dataInicio > dataFim)
        {
            alert("Data Início deve ser menor ou igual à Data Fim.");
            return false;
        }
        
        if(this.generalService.dateDiffIndays(dataInicio, dataFim) > 31)
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

}
