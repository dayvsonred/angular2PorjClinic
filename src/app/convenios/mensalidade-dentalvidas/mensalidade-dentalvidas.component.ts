import { Component, OnInit } from '@angular/core';
//import { Component, OnInit, Pipe, PipeTransform, ElementRef,Renderer2, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import 'moment/locale/pt-br';
import { AuthService } from '../../auth/auth.service';
import { MensalidadeDentalvidasService } from './mensalidade-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { NotifyService } from '../../shared/services/notify.service';
import { VarsProd } from '../../app.varsprod';

@Component({
	selector: 'app-mensalidade-dentalvidas',
	templateUrl: './mensalidade-dentalvidas.component.html',
	styleUrls: ['./mensalidade-dentalvidas.component.css']
})
export class MensalidadeDentalvidasComponent implements OnInit {
	
    myDatePickerOptions: any;
    multiple0: any;
	loading: boolean;
	filtros = {
				  baseDados: "",
                  chaveUnidade: "",
                  dataInicio: null,
                  dataFim: null,
                  origem: "",
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
    ListUnidade                : any;

    ListaDados: any[];
    locale: string = 'pt-br';
    dataHojeDMY: any;
    dataHojeYMD: any;
    selecionaTodos: boolean; // variavel que sinaliza se a opção de selecão de todos os registros está checada
    valorTotalReceber: number = 0;
    valorTotalAutorizado: number = 0;

	constructor(private authService: AuthService, private mensalidadeDentalvidasService : MensalidadeDentalvidasService,
                private notifyService: NotifyService, private varsProd:VarsProd, private unidadeAtendimentoService: UnidadeAtendimentoService,
                private router: Router) {
		this.SelectClinicaDados.chave = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.unidade = authService.RESUserValid.dados[0].unidade;
		this.SelectClinicaDados.nm_unidade_atendimento = authService.RESUserValid.dados[0].nm_unidade_atendimento; 
		this.SelectClinicaDados.cd_unidade_atendimento = authService.RESUserValid.dados[0].cd_unidade_atendimento;
		this.SelectClinicaDados.chaveUsuario = authService.RESUserValid.dados[0].USERID;
		this.SelectClinicaDados.BaseIndex = this.mensalidadeDentalvidasService.URLIndex;

	}

	ngOnInit() {
		
		this.ListaDados = [];

		this.obterDataAtual();
		this.setarFiltrosIniciais();

		let dadosUnid = {
	        'chaveUsuario'  : this.SelectClinicaDados.chaveUsuario
	    }

		if(typeof this.ListUnidade === 'undefined'){ 
	        this.unidadeAtendimentoService.GetUnidadesPrestador(dadosUnid).subscribe(
	        	res=> {
	        		this.ListUnidade = res;
	        	}
	        );
	    }
	}

	onSelectUnidade(item){
        console.log(item);
        this.SelectClinicaDados.chave = item.value;
        this.SelectClinicaDados.unidade = item.value;
        this.SelectClinicaDados.nm_unidade_atendimento = item.label;
        this.limparDados();
    }

    onChangeStatus() {
        this.limparDados();
    }

    onChangeOrigem() {
        this.limparDados();
    }

    setarFiltrosIniciais() {
    	this.filtros.baseDados = this.varsProd.NomeEmpresa;
        this.filtros.status = "todos";
        this.filtros.origem = "autorizada";
    }

    obterDataAtual() {
    	let dataHoje = new Date;
    	this.dataHojeYMD = dataHoje.getFullYear() + "-" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "-" + (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate());
    	this.dataHojeDMY = (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()) + "/" + ((dataHoje.getMonth() + 1) < 10 ? ('0' + (dataHoje.getMonth() + 1)) : dataHoje.getMonth() + 1) + "/" + dataHoje.getFullYear();
    }

    abrirTelaNotaFiscal()
    {
        let token = JSON.parse(sessionStorage.getItem('toke'));
        this.router.navigateByUrl('/loginFast/' + token + '/mensalidadedentalvidasnotafiscal');
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

		console.log(filtrosParam);

		this.loading = true;
		this.mensalidadeDentalvidasService.GetMensalidadesReceber(filtrosParam).subscribe(
        	response=> {
        		this.ListaDados = (response.Dados ? response.Dados : []);
                //console.log(this.ListaDados);
        		
                this.totalizaValores();
        		
        		this.loading = false;
        		this.selecionaTodos = false;

                if (response.Mensagem) {
                    this.notifyService.info(response.Mensagem, '');
                }
            },
            error => {
                this.loading = false;
                this.notifyService.danger('Erro', 'Erro ao consultar dados');
            }
        );
	}

    limparDados() {
        this.ListaDados = [];
        this.limparTotais();
        this.selecionaTodos = false;
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

	totalizaValores() {

        this.valorTotalReceber = 0;
        this.valorTotalAutorizado = 0;
        
        if(this.ListaDados)
        {
            for(let item of this.ListaDados)
            {
                this.valorTotalReceber += parseFloat(item['valor_receber']);
                if(item['id_lote'])
                {
                	this.valorTotalAutorizado += parseFloat(item['valor_receber']);
                }
            }
        }
        this.valorTotalReceber = parseFloat(this.valorTotalReceber.toFixed(2));
        this.valorTotalAutorizado = parseFloat(this.valorTotalAutorizado.toFixed(2));
    }

    limparTotais() {
        this.valorTotalReceber = 0;
        this.valorTotalAutorizado = 0;
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
