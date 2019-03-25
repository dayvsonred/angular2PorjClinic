import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { RelatorioFinanceiroDentalvidasService } from './relatorio-financeiro-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { NotifyService } from '../../shared/services/notify.service';
import { GeneralService } from '../../shared/services/general.service';
import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-relatorio-financeiro-dentalvidas',
  templateUrl: './relatorio-financeiro-dentalvidas.component.html',
  styleUrls: ['./relatorio-financeiro-dentalvidas.component.css']
})
export class RelatorioFinanceiroDentalvidasComponent implements OnInit {

    myDatePickerOptions: any;
    multiple0: any;
	loading: boolean;
	filtros = {
				  baseDados: "",
                  mes: null,
                  ano: null,
                  anoMes: null,
                  chaveUnidade: "",
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

    GtoDados: any;
    MensalidadeDados: any;
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;

    qtdTotalMensalidade: number = 0;
    valorTotalMensalidade: number = 0;
    valorTotalImpostos: number = 0;
    valorTotalRoyalties: number = 0;
    valorTotalPagtoGto: number = 0;
    sobraTotalFranqueada: number = 0;

    valorTotalRecbtoGto: number = 0;
    valorTotalDespDentista: number = 0;
    valorTotalDespMaterial: number = 0;
    sobraTotalClinica: number = 0;
    sobraTotalGeral: number = 0;

    valorTotalGlosa: number = 0;
    valorTotalMensalidadesAtraso: number = 0;
    valorTotalPagtoGtoProprio: number = 0;
    valorTotalPagtoGtoTerceiro: number = 0;

	constructor(private authService: AuthService, private relatorioFinanceiroDentalvidasService : RelatorioFinanceiroDentalvidasService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private unidadeAtendimentoService: UnidadeAtendimentoService,
                private router: Router, private generalService: GeneralService) {
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.relatorioFinanceiroDentalvidasService.URLIndex;
	}

	ngOnInit() {
		
		this.GtoDados = null;
		this.MensalidadeDados = null;

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
                    this.ListUnidadeTodas.unshift({chave: "matrizdentalvidas", nm_unidade_atendimento: "Matriz Dentalvidas", value: "matrizdentalvidas", label: "Matriz Dentalvidas"});
                    this.ListUnidadeTodas.push({chave:"", nm_unidade_atendimento: "", value: "", label: "Todas"});
                }
            );
        }

	}

	onSelectUnidade(item){
      
        this.SelectClinicaDados.chave = item.value;
        this.SelectClinicaDados.unidade = item.value;
        this.SelectClinicaDados.nm_unidade_atendimento = item.label;
        this.limparDados();
    }

    onChangeMes(){
        this.limparDados();
    }

    onChangeAno(){
        this.limparDados();
    }

    setarFiltrosIniciais() {
    	this.filtros.baseDados = this.varsProd.NomeEmpresa;
        this.setarMesAnoInicial();
    }

    setarMesAnoInicial() {
    	let dataHoje = new Date;
        this.filtros.mes = ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1);
        this.filtros.ano = dataHoje.getFullYear();
    }

    buscarDados()
	{
		this.getDados();
	}

	getDados()
	{
		let filtrosParam = Object.assign({}, this.filtros);
		//filtrosParam.dataInicio = filtrosParam.dataInicio ? this.generalService.formatDataDMYToYMD(filtrosParam.dataInicio.formatted) : this.dataHojeYMD;
		//filtrosParam.dataFim = filtrosParam.dataFim ? this.generalService.formatDataDMYToYMD(filtrosParam.dataFim.formatted) : this.dataHojeYMD;
        filtrosParam.anoMes = filtrosParam.ano + '-' + filtrosParam.mes;
		filtrosParam.chaveUnidade = filtrosParam.chaveUnidade ? filtrosParam.chaveUnidade : this.SelectClinicaDados.unidade;

		//console.log(filtrosParam);

		this.loading = true;
		this.relatorioFinanceiroDentalvidasService.GetDadosFinanceirosDentalvidas(filtrosParam).subscribe(
        	response=> {
        		this.GtoDados = (response.dados ? response.dados : null);
                this.MensalidadeDados = response.mensalidades.length > 0 ? response.mensalidades[0] : response.mensalidades;
                //console.log(this.GtoDados);
                //console.log(this.MensalidadeDados);
        		
                this.totalizaValores();
        		
        		this.loading = false;

                if (this.GtoDados === null && this.MensalidadeDados === null) {
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
        this.GtoDados = null;
        this.MensalidadeDados = null;
        this.limparTotais();
    }

	totalizaValores() {

        //Inicializa valores caso não existam
        this.MensalidadeDados.qtd_mens = this.MensalidadeDados.qtd_mens ? this.MensalidadeDados.qtd_mens : 0;
        this.MensalidadeDados.valor_mens_bruto = this.MensalidadeDados.valor_mens_bruto ? this.MensalidadeDados.valor_mens_bruto : 0;
        this.MensalidadeDados.valor_repasse_bruto = this.MensalidadeDados.valor_repasse_bruto ? this.MensalidadeDados.valor_repasse_bruto : 0
        this.MensalidadeDados.valor_repasse_liquido = this.MensalidadeDados.valor_repasse_liquido ? this.MensalidadeDados.valor_repasse_liquido : 0;
        this.MensalidadeDados.valor_mensalidades_atraso = this.MensalidadeDados.valor_mensalidades_atraso ? this.MensalidadeDados.valor_mensalidades_atraso : 0;
        //----------------------------------------------------------------------

        this.qtdTotalMensalidade = this.MensalidadeDados.qtd_mens
        this.valorTotalMensalidade = this.MensalidadeDados.valor_mens_bruto;
        this.valorTotalImpostos = this.MensalidadeDados.valor_repasse_bruto - this.MensalidadeDados.valor_repasse_liquido;
        this.valorTotalRoyalties = this.MensalidadeDados.valor_mens_bruto - this.MensalidadeDados.valor_repasse_bruto;
        this.valorTotalPagtoGto = this.GtoDados.somaPagamento;
        this.sobraTotalFranqueada = this.MensalidadeDados.valor_repasse_liquido - this.GtoDados.somaPagamento;

        this.valorTotalRecbtoGto = this.GtoDados.somaRecebimento;
        this.valorTotalDespDentista = this.GtoDados.somaDespesasDentista;
        this.valorTotalDespMaterial = this.GtoDados.somaDespesasMaterial;
        this.sobraTotalClinica = this.GtoDados.somaRecebimento - this.GtoDados.somaDespesasDentista - this.GtoDados.somaDespesasMaterial;

        this.sobraTotalGeral = this.sobraTotalFranqueada + this.sobraTotalClinica;

        this.valorTotalGlosa = this.GtoDados.somaGlosa;
        this.valorTotalMensalidadesAtraso = this.MensalidadeDados.valor_mensalidades_atraso;
        this.valorTotalPagtoGtoProprio = this.GtoDados.somaPagamentoProprio;
        this.valorTotalPagtoGtoTerceiro = this.valorTotalPagtoGto - this.valorTotalPagtoGtoProprio;
    }

    limparTotais() {

        this.qtdTotalMensalidade = 0;
        this.valorTotalMensalidade = 0;
        this.valorTotalImpostos = 0;
        this.valorTotalRoyalties = 0;
        this.valorTotalPagtoGto = 0;
        this.sobraTotalFranqueada = 0;

        this.valorTotalRecbtoGto = 0;
        this.valorTotalDespDentista = 0;
        this.valorTotalDespMaterial = 0;
        this.sobraTotalClinica = 0;
        this.sobraTotalGeral = 0;

        this.valorTotalGlosa = 0;
        this.valorTotalMensalidadesAtraso = 0;
        this.valorTotalPagtoGtoProprio = 0;
        this.valorTotalPagtoGtoTerceiro = 0;
    }

}
