import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { RelatorioFinanceiroDentalvidasRoutingModule } from './relatorio-financeiro-dentalvidas-routing.module';
import { RelatorioFinanceiroDentalvidasComponent } from './relatorio-financeiro-dentalvidas.component';
import { RelatorioFinanceiroDentalvidasService } from './relatorio-financeiro-dentalvidas.service';
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
    FormsModule,
    RelatorioFinanceiroDentalvidasRoutingModule,
    MyDatePickerModule,
    BrMasker4Module,
    SelectModule
  ],
  declarations: [
  	RelatorioFinanceiroDentalvidasComponent
  ],
  providers: [
  	RelatorioFinanceiroDentalvidasService,
    NotifyService,
    UnidadeAtendimentoService,
    TipoTratamentoService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class RelatorioFinanceiroDentalvidasModule { }
