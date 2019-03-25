import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

import { MensalidadeDentalvidasNotaFiscalRoutingModule } from './mensalidade-dentalvidas-nota-fiscal-routing.module';
import { MensalidadeDentalvidasNotaFiscalComponent } from './mensalidade-dentalvidas-nota-fiscal.component';
import { MensalidadeDentalvidasNotaFiscalService } from './mensalidade-dentalvidas-nota-fiscal.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { PrestadorService } from '../../shared/services/prestador.service';

import { NotifyService } from '../../shared/services/notify.service';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'angular2-select';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    MensalidadeDentalvidasNotaFiscalRoutingModule,
    FormsModule,
    MyDatePickerModule,
    BrMasker4Module,
    SelectModule
  ],
  declarations: [
  	MensalidadeDentalvidasNotaFiscalComponent
  ],
  providers: [
  	MensalidadeDentalvidasNotaFiscalService,
    NotifyService,
    UnidadeAtendimentoService,
    PrestadorService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class MensalidadeDentalvidasNotaFiscalModule { }
