import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { RelatorioRecebimentoDentalvidasRoutingModule } from './relatorio-recebimento-dentalvidas-routing.module';
import { RelatorioRecebimentoDentalvidasComponent } from './relatorio-recebimento-dentalvidas.component';
import { RelatorioRecebimentoDentalvidasService } from './relatorio-recebimento-dentalvidas.service';
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
    RelatorioRecebimentoDentalvidasRoutingModule,
    FormsModule,
    MyDatePickerModule,
    BrMasker4Module,
    SelectModule
  ],
  declarations: [
  	RelatorioRecebimentoDentalvidasComponent
  ],
  providers: [
  	RelatorioRecebimentoDentalvidasService,
    NotifyService,
    UnidadeAtendimentoService,
    TipoTratamentoService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class RelatorioRecebimentoDentalvidasModule { }
