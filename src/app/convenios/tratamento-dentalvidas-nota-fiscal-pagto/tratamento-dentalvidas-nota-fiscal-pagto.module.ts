import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { TratamentoDentalvidasNotaFiscalPagtoRoutingModule } from './tratamento-dentalvidas-nota-fiscal-pagto-routing.module';
import { TratamentoDentalvidasNotaFiscalPagtoComponent } from './tratamento-dentalvidas-nota-fiscal-pagto.component';
import { TratamentoDentalvidasNotaFiscalPagtoService } from './tratamento-dentalvidas-nota-fiscal-pagto.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { PrestadorService } from '../../shared/services/prestador.service';

import { NotifyService } from '../../shared/services/notify.service';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'angular2-select';

registerLocaleData(localePt);

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    TratamentoDentalvidasNotaFiscalPagtoRoutingModule,
    MyDatePickerModule,
    BrMasker4Module,
    //CurrencyMaskModule,
    SelectModule
  ],
  declarations: [
  	TratamentoDentalvidasNotaFiscalPagtoComponent
  ],
  providers: [
  	TratamentoDentalvidasNotaFiscalPagtoService,
    NotifyService,
    UnidadeAtendimentoService,
    TipoTratamentoService,
    PrestadorService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class TratamentoDentalvidasNotaFiscalPagtoModule { }
