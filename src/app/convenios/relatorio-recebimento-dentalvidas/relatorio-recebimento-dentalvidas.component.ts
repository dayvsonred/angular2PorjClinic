import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { RelatorioRecebimentoDentalvidasService } from './relatorio-recebimento-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { NotifyService } from '../../shared/services/notify.service';
import { GeneralService } from '../../shared/services/general.service';
import { VarsProd } from '../../app.varsprod';

@Component({
  selector: 'app-relatorio-recebimento-dentalvidas',
  templateUrl: './relatorio-recebimento-dentalvidas.component.html',
  styleUrls: ['./relatorio-recebimento-dentalvidas.component.css']
})
export class RelatorioRecebimentoDentalvidasComponent implements OnInit {

	myDatePickerOptions: any;
    multiple0: any;
	loading: boolean;
	filtros = {
				  baseDados: "",
                  dataInicio: null,
                  dataFim: null,
                  chaveUnidade: "",
                  chaveUnidadeOperadora: "",
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
    ListaMensalidades: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;

    ValorTotalPacienteTrat: number = 0;
    ValorTotalConvenioTrat: number = 0;
    ValorTotalRecebidoTrat: number = 0;
    ValorTotalPacienteMens: number = 0;
    ValorTotalRecebidoMens: number = 0;
    TotalGeralRecebido: number = 0;
    
    secaoTrat = {
    	expanded: true
    };

    secaoTratAgrupUnidade = {
    	expanded: true
    };

    secaoMens = {
    	expanded: true
    };

	constructor(private authService: AuthService, private relatorioRecebimentoDentalvidasService : RelatorioRecebimentoDentalvidasService,
                private notifyService: NotifyService, private varsProd:VarsProd,
                private unidadeAtendimentoService: UnidadeAtendimentoService,
                private tipoTratamentoService: TipoTratamentoService, private router: Router,
                private generalService: GeneralService) {
		
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.relatorioRecebimentoDentalvidasService.URLIndex;
	}

	ngOnInit() {
		
		this.ListaTrat = [];
		this.ListaTratAgrupUnidade = [];
		this.ListaMensalidades = [];

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
                    this.ListUnidadeTodas.unshift({chave: "matrizdentalvidas", nm_unidade_atendimento: "Matriz Dentalvidas", value: "matrizdentalvidas", label: "Matriz Dentalvidas"});
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

    onSelectUnidadeOperadora(item){
    	this.filtros.chaveUnidadeOperadora = item.value;
        this.limparDados();
    }

    onChangeTipoTrat() {
    	this.limparDados();
    }

    onChangeTipoExibicao() {
    	if(this.filtros.tipoExibicao == "resumido")
    	{
    		this.secaoTratAgrupUnidade.expanded = true;
    		this.secaoMens.expanded = false;
    	}
    	else
    	{
    		this.secaoTrat.expanded = true;
    		this.secaoMens.expanded = true;
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
		this.relatorioRecebimentoDentalvidasService.GetDadosRecebimentoDentalvidas(filtrosParam).subscribe(
        	response=> {
        		this.ListaTrat = (response.dados ? response.dados : []);
        		this.ListaMensalidades = response.mensalidades;
                console.log(response);
        		
                this.totalizaValores();

                this.ListaTratAgrupUnidade = [];
                this.ListaTrat.forEach((item) => {
                	
                	let itemAdd = this.ListaTratAgrupUnidade.filter(x => x.chave_unidade_operadora == item.chave_unidade_operadora)[0];

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

                if (this.ListaTrat.length == 0 && this.ListaMensalidades.length == 0) {
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
        this.ListaMensalidades = [];
        this.limparTotais();
    }

    limparTotais() {
    	this.ValorTotalPacienteTrat = 0;
    	this.ValorTotalConvenioTrat = 0;
    	this.ValorTotalRecebidoTrat = 0;
    	this.ValorTotalPacienteMens = 0;
    	this.ValorTotalRecebidoMens = 0;
    	this.TotalGeralRecebido = 0;
    }

    totalizaValores() {

        this.ValorTotalPacienteTrat = 0;
    	this.ValorTotalConvenioTrat = 0;
    	this.ValorTotalRecebidoTrat = 0;
    	this.ValorTotalPacienteMens = 0;
    	this.ValorTotalRecebidoMens = 0;
    	this.TotalGeralRecebido = 0;
        
        if(this.ListaTrat)
        {
            for(let item of this.ListaTrat)
            {
                this.ValorTotalPacienteTrat += parseFloat(item['valor']);
                this.ValorTotalConvenioTrat += parseFloat(item['receber_convenio']);
                this.ValorTotalRecebidoTrat += parseFloat(item['vl_proc_liquido']);
            }
        }
        
        this.ValorTotalPacienteTrat = parseFloat(this.ValorTotalPacienteTrat.toFixed(2));
        this.ValorTotalConvenioTrat = parseFloat(this.ValorTotalConvenioTrat.toFixed(2));
        this.ValorTotalRecebidoTrat = parseFloat(this.ValorTotalRecebidoTrat.toFixed(2));

        if(this.ListaMensalidades)
        {
            for(let item of this.ListaMensalidades)
            {
                this.ValorTotalPacienteMens += parseFloat(item['valor_pago']);
                this.ValorTotalRecebidoMens += parseFloat(item['vl_liquido_item']);
            }
        }

        this.TotalGeralRecebido = this.ValorTotalRecebidoTrat + this.ValorTotalRecebidoMens;
        this.TotalGeralRecebido = parseFloat(this.TotalGeralRecebido.toFixed(2));

        this.ValorTotalPacienteMens = parseFloat(this.ValorTotalPacienteMens.toFixed(2));
        this.ValorTotalRecebidoMens = parseFloat(this.ValorTotalRecebidoMens.toFixed(2));

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
