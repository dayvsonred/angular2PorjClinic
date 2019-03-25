import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { TratamentoDentalvidasRoutingModule } from './tratamento-dentalvidas-routing.module';
import { TratamentoDentalvidasComponent } from './tratamento-dentalvidas.component';
import { TratamentoDentalvidasService } from './tratamento-dentalvidas.service';
import { UnidadeAtendimentoService } from '../../shared/services/unidade-atendimento.service';

import { NotifyService } from '../../shared/services/notify.service';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'angular2-select';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TratamentoDentalvidasRoutingModule,
    MyDatePickerModule,
    BrMasker4Module,
    SelectModule
  ],
  declarations: [
  	TratamentoDentalvidasComponent
  ],
  providers: [
  	TratamentoDentalvidasService,
    NotifyService,
    UnidadeAtendimentoService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class TratamentoDentalvidasModule { }
