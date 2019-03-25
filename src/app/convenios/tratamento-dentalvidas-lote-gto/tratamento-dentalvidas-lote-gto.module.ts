import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { TratamentoDentalvidasLoteGtoRoutingModule } from './tratamento-dentalvidas-lote-gto-routing.module';
import { TratamentoDentalvidasLoteGtoComponent } from './tratamento-dentalvidas-lote-gto.component';
import { TratamentoDentalvidasLoteGtoService } from './tratamento-dentalvidas-lote-gto.service';
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
    TratamentoDentalvidasLoteGtoRoutingModule,
    MyDatePickerModule,
    BrMasker4Module,
    CurrencyMaskModule,
    SelectModule
  ],
  declarations: [
  	TratamentoDentalvidasLoteGtoComponent
  ],
  providers: [
  	TratamentoDentalvidasLoteGtoService,
    NotifyService,
    UnidadeAtendimentoService,
    TipoTratamentoService,
    PrestadorService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class TratamentoDentalvidasLoteGtoModule { }
