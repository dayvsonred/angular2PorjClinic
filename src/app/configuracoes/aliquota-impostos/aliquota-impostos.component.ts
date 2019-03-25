import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { AliquotaImpostosService } from './aliquota-impostos.service';
import { NotifyService } from '../../shared/services/notify.service';
import { PrestadorService } from '../../shared/services/prestador.service';

import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-aliquota-impostos',
  templateUrl: './aliquota-impostos.component.html',
  styleUrls: ['./aliquota-impostos.component.css']
})
export class AliquotaImpostosComponent implements OnInit {

	loading: boolean;
	
    regimeTributarioList: any[];
    ListaImpostosRegime: any[];
    tipoImpostoList: any[];
    regimeTributario: any;
    siglaImpostoNovaFaixa;
    valorMinNovaFaixa;
    valorMaxNovaFaixa
    percImpostoNovaFaixa;

    SelectClinicaDados  = {
      'chave'                  : ' ', 
      'unidade'                : ' ',
      'nm_unidade_atendimento' : ' ',
      'BaseIndex'              : null,
      'cd_unidade_atendimento' : ' ',
      'chaveUsuario'           : null
    };

    usuarioPerfilAdmin: any;
    public modalRef: BsModalRef;
    subscriptions: Subscription[] = [];
  	messages: string[] = [];

	constructor(private authService: AuthService, private aliquotaImpostosService : AliquotaImpostosService,
                private notifyService: NotifyService, private router: Router, private prestadorService: PrestadorService,
                private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
		
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;

		this.prestadorService.PossuiPerfilAdmin(this.SelectClinicaDados.chaveUsuario).subscribe(
            res=> {
                this.usuarioPerfilAdmin = res;
            }
        );
	}

	ngOnInit() {
		this.carregaListaRegimeTributario();
		this.carregaListaTipoImposto();
		this.ListaImpostosRegime = [];
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

	onChangeRegimeTributario(){
        this.buscarDados();
    }

    carregaListaRegimeTributario()
    {
    	this.aliquotaImpostosService.GetAllRegimeTributario().subscribe(
        	response=> {
        		this.regimeTributarioList = (response ? response : []);
        		
        		if(this.regimeTributarioList.length > 0)
        		{
        			this.regimeTributario = this.regimeTributarioList[0];
        		}

        		this.buscarDados();
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao listar regimes tributários');
            }
        );
    }

    carregaListaTipoImposto()
    {
    	this.aliquotaImpostosService.GetAllTipoImposto().subscribe(
        	response=> {
        		this.tipoImpostoList = (response ? response : []);
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao listar tipos de impostos');
            }
        );
    }

    abrirModalConfig(template)
    {
    	this.openModal(template);
    }

    filtrarPorImposto(siglaImposto)
    {
    	return this.ListaImpostosRegime.filter(x => x.sg_imposto == siglaImposto);
    }

    buscarDados()
	{
		this.getDados();
	}

	getDados()
	{
		let objeto = {
			idRegimeTributario: this.regimeTributario.id
		};

		this.limparDados();

		this.loading = true;
		this.aliquotaImpostosService.GetAliquotaImpostosRegime(objeto).subscribe(
        	response=> {
        		this.ListaImpostosRegime = (response ? response : []);

        		this.loading = false;
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao consultar dados');
            }
        );
	}

	incluirAliquota()
	{
		if(this.validarCamposInclusao())
		{
			let tipoImposto = this.tipoImpostoList.filter(x => x.sigla == this.siglaImpostoNovaFaixa)[0];
			
			let objeto = {
				idRegimeTributario: this.regimeTributario.id,
				idImposto: tipoImposto.id,
				valorMinNovaFaixa: this.valorMinNovaFaixa,
				valorMaxNovaFaixa: this.valorMaxNovaFaixa,
				percentual: this.percImpostoNovaFaixa
			};

			this.loading = true;
			this.aliquotaImpostosService.InserirNovaAliquota(objeto).subscribe(
	        	response=> {
	        		
	        		this.notifyService.info('Informação', 'Alíquota Cadastrada com Sucesso');

	        		this.loading = false;

	        		this.limparCamposInclusao();
	        		this.getDados();
	            },
	            error => {
	                this.loading = false;
	                this.notifyService.danger('Erro', 'Erro ao cadastrar alíquota');
	            }
	        );
		}
	}

	excluirAliquota(aliquota)
	{
		if(confirm("Confirma a exclusão da alíquota?") === true)
		{
			let tipoImposto = this.tipoImpostoList.filter(x => x.sigla == this.siglaImpostoNovaFaixa)[0];
			
			let objeto = {
				idAliquotaRegime: aliquota.cd_imposto_regime_tributario
			};

			console.log(objeto);

			this.loading = true;
			this.aliquotaImpostosService.ExcluirAliquota(objeto).subscribe(
	        	response=> {
	        		
	        		console.log(response);
	        		this.notifyService.info('Informação', 'Alíquota excluída com Sucesso');

	        		this.loading = false;

	        		this.limparCamposInclusao();
	        		this.getDados();
	            },
	            error => {
	                this.loading = false;
	                this.notifyService.danger('Erro', 'Erro ao excluir alíquota');
	            }
	        );
		}
	}

	validarCamposInclusao() {
		let retorno = true;

		if(this.valorMinNovaFaixa > this.valorMaxNovaFaixa)
		{
			alert("O valor mínimo não pode ser maior que o valor máximo de incidência.");
			retorno = false;
		}
		else if(this.valorMinNovaFaixa < 0)
		{
			alert("O valor mínimo de incidência deve ser maior ou igual a zero.");
			retorno = false;
		}
		else if(this.valorMaxNovaFaixa <= 0)
		{
			alert("O valor máximo de incidência deve ser maior que zero.");
			retorno = false;
		}
		else if(this.percImpostoNovaFaixa <= 0)
		{
			alert("O percentual da alíquota deve ser maior que zero.");
			retorno = false;
		}

		//Verifica se a nova faixa entra em conflito com alguma faixa ja existente
		this.ListaImpostosRegime.filter(x => x.sg_imposto == this.siglaImpostoNovaFaixa).forEach((item) => {
            if(Math.round(parseFloat(this.valorMinNovaFaixa)*100)/100 >= Math.round(parseFloat(item.vl_minimo_incidencia)*100)/100 && Math.round(parseFloat(this.valorMinNovaFaixa)*100)/100 <= Math.round(parseFloat(item.vl_maximo_incidencia)*100)/100)
            {
            	alert("O valor mínimo informado já está incluso em outra faixa cadastrada.\nFavor reajustar.");
            	retorno = false;
            }
            else if(Math.round(parseFloat(this.valorMaxNovaFaixa)*100)/100 >= Math.round(parseFloat(item.vl_minimo_incidencia)*100)/100 && Math.round(parseFloat(this.valorMaxNovaFaixa)*100)/100 <= Math.round(parseFloat(item.vl_maximo_incidencia)*100)/100)
            {
            	alert("O valor máximo informado já está incluso em outra faixa cadastrada.\nFavor reajustar.");
            	retorno = false;
            }
        });

		return retorno;
	}

	limparCamposInclusao() {
		this.siglaImpostoNovaFaixa = null;
		this.valorMinNovaFaixa = null;
		this.valorMaxNovaFaixa = null;
		this.percImpostoNovaFaixa = null;
	}

    limparDados() {
        this.ListaImpostosRegime = [];
    }

}
