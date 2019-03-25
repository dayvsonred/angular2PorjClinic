import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { RelatorioPagamentoDentalvidasService } from './relatorio-pagamento-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { NotifyService } from '../../shared/services/notify.service';
import { GeneralService } from '../../shared/services/general.service';
import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-relatorio-pagamento-dentalvidas',
  templateUrl: './relatorio-pagamento-dentalvidas.component.html',
  styleUrls: ['./relatorio-pagamento-dentalvidas.component.css']
})
export class RelatorioPagamentoDentalvidasComponent implements OnInit {

	myDatePickerOptions: any;
    multiple0: any;
	loading: boolean;
	filtros = {
				  baseDados: "",
                  dataInicio: null,
                  dataFim: null,
                  chaveUnidade: "",
                  chaveUnidadeTratamento: "",
                  tipoTratamento: "",
                  tipoExibicao: "",
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
    ListaTratAgrupUnidade: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;

    ValorTotalPacienteTrat: number = 0;
    ValorTotalConvenioTrat: number = 0;
    ValorTotalPagoTrat: number = 0;
    
    secaoTrat = {
    	expanded: true
    };

    secaoTratAgrupUnidade = {
    	expanded: true
    };

	constructor(private authService: AuthService, private relatorioPagamentoDentalvidasService : RelatorioPagamentoDentalvidasService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private unidadeAtendimentoService: UnidadeAtendimentoService,
                private tipoTratamentoService: TipoTratamentoService, private router: Router,
                private generalService: GeneralService) {
		
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.relatorioPagamentoDentalvidasService.URLIndex;
	}

	ngOnInit() {
		
		this.ListaTrat = [];
		this.ListaTratAgrupUnidade = [];

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

	onSelectUnidade(item){
      
        this.SelectClinicaDados.chave = item.value;
        this.SelectClinicaDados.unidade = item.value;
        this.SelectClinicaDados.nm_unidade_atendimento = item.label;
        this.limparDados();
    }

    onSelectUnidadeTratamento(item){
    	this.filtros.chaveUnidadeTratamento = item.value;
        this.limparDados();
    }

    onChangeTipoTrat() {
    	this.limparDados();
    }

    onChangeTipoExibicao() {
    	if(this.filtros.tipoExibicao == "resumido")
    	{
    		this.secaoTratAgrupUnidade.expanded = true;
    	}
    	else
    	{
    		this.secaoTrat.expanded = true;
    	}
    }

    setarFiltrosIniciais() {
    	this.filtros.baseDados = this.varsProd.NomeEmpresa;
        this.filtros.tipoTratamento = "todos";
        this.filtros.tipoExibicao = "detalhado";
    }

    obterDataAtual() {
    	let dataHoje = new Date;
    	this.dataHojeYMD = dataHoje.getFullYear() + "-" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "-" + (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate());
    	this.dataHojeDMY = (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()) + "/" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "/" + dataHoje.getFullYear();
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

		console.log(filtrosParam);

		this.loading = true;
		this.relatorioPagamentoDentalvidasService.GetDadosPagamentoDentalvidas(filtrosParam).subscribe(
        	response=> {
        		this.ListaTrat = (response.dados ? response.dados : []);
                console.log(response);
        		
                this.totalizaValores();

                this.ListaTratAgrupUnidade = [];
                this.ListaTrat.forEach((item) => {
                	
                	let itemAdd = this.ListaTratAgrupUnidade.filter(x => x.chave_unidade_tratamento == item.chave_unidade_tratamento)[0];

                	if(!itemAdd)
                	{
                		itemAdd = Object.assign({}, item);
                		itemAdd.valor = parseFloat(item.valor);
                		itemAdd.receber_convenio = parseFloat(item.receber_convenio);
                		itemAdd.vl_proc_liquido = parseFloat(item.vl_proc_liquido);
                		this.ListaTratAgrupUnidade.push(itemAdd);
                	}
                	else
                	{
                		itemAdd.valor = parseFloat(itemAdd.valor) + parseFloat(item.valor);
                		itemAdd.receber_convenio = parseFloat(itemAdd.receber_convenio) + parseFloat(item.receber_convenio);
                		itemAdd.vl_proc_liquido = parseFloat(itemAdd.vl_proc_liquido) + parseFloat(item.vl_proc_liquido);
                	}

		        });
        		
        		this.loading = false;

                if (this.ListaTrat.length == 0) {
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
        this.ListaTratAgrupUnidade = [];
        this.limparTotais();
    }

    limparTotais() {
    	this.ValorTotalPacienteTrat = 0;
    	this.ValorTotalConvenioTrat = 0;
    	this.ValorTotalPagoTrat = 0;
    }

    totalizaValores() {

        this.ValorTotalPacienteTrat = 0;
    	this.ValorTotalConvenioTrat = 0;
    	this.ValorTotalPagoTrat = 0;
        
        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                this.ValorTotalPacienteTrat += parseFloat(item['valor']);
                this.ValorTotalConvenioTrat += parseFloat(item['receber_convenio']);
                this.ValorTotalPagoTrat += parseFloat(item['vl_proc_liquido']);
            }
        }
        
        this.ValorTotalPacienteTrat = parseFloat(this.ValorTotalPacienteTrat.toFixed(2));
        this.ValorTotalConvenioTrat = parseFloat(this.ValorTotalConvenioTrat.toFixed(2));
        this.ValorTotalPagoTrat = parseFloat(this.ValorTotalPagoTrat.toFixed(2));

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

}
