import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

import { TratamentoDentalvidasNotaFiscalRoutingModule } from './tratamento-dentalvidas-nota-fiscal-routing.module';
import { TratamentoDentalvidasNotaFiscalComponent } from './tratamento-dentalvidas-nota-fiscal.component';
import { TratamentoDentalvidasNotaFiscalService } from './tratamento-dentalvidas-nota-fiscal.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { TipoTratamentoService } from '../../shared/services/tipo-tratamento.service';
import { PrestadorService } from '../../shared/services/prestador.service';

import { NotifyService } from '../../shared/services/notify.service';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'angular2-select';
import { CurrencyMaskModule } from "ng2-currency-mask";

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TratamentoDentalvidasNotaFiscalRoutingModule,
    MyDatePickerModule,
    BrMasker4Module,
    CurrencyMaskModule,
    SelectModule,
    HttpClientModule
  ],
  declarations: [
  	TratamentoDentalvidasNotaFiscalComponent
  ],
  providers: [
  	TratamentoDentalvidasNotaFiscalService,
    NotifyService,
    UnidadeAtendimentoService,
    TipoTratamentoService,
    PrestadorService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class TratamentoDentalvidasNotaFiscalModule { }
