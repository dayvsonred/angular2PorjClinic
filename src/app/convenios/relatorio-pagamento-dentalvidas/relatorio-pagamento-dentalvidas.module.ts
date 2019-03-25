import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { RelatorioPagamentoDentalvidasRoutingModule } from './relatorio-pagamento-dentalvidas-routing.module';
import { RelatorioPagamentoDentalvidasComponent } from './relatorio-pagamento-dentalvidas.component';
import { RelatorioPagamentoDentalvidasService } from './relatorio-pagamento-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';

import { NotifyService } from '../../shared/services/notify.service';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'angular2-select';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RelatorioPagamentoDentalvidasRoutingModule,
    FormsModule,
    MyDatePickerModule,
    BrMasker4Module,
    SelectModule
  ],
  declarations: [
  	RelatorioPagamentoDentalvidasComponent
  ],
  providers: [
  	RelatorioPagamentoDentalvidasService,
    NotifyService,
    UnidadeAtendimentoService,
    TipoTratamentoService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class RelatorioPagamentoDentalvidasModule { }
