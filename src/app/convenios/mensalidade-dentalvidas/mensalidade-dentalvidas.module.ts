import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { MensalidadeDentalvidasRoutingModule } from './mensalidade-dentalvidas-routing.module';
import { MensalidadeDentalvidasComponent } from './mensalidade-dentalvidas.component';
import { MensalidadeDentalvidasService } from './mensalidade-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';
import { NotifyService } from '../../shared/services/notify.service';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'angular2-select';
//import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MensalidadeDentalvidasRoutingModule,
    MyDatePickerModule,
    BrMasker4Module,
    SelectModule
  ],
  declarations: [
  	MensalidadeDentalvidasComponent,
  	//FormatCurrencyPipe
  ],
  providers: [
    MensalidadeDentalvidasService,
    NotifyService,
    UnidadeAtendimentoService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class MensalidadeDentalvidasModule { }
