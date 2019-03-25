import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { AliquotaImpostosRoutingModule } from './aliquota-impostos-routing.module';
import { AliquotaImpostosComponent } from './aliquota-impostos.component';
import { AliquotaImpostosService } from './aliquota-impostos.service';
import { PrestadorService } from '../../shared/services/prestador.service';

import { NotifyService } from '../../shared/services/notify.service';
import { SelectModule } from 'angular2-select';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AliquotaImpostosRoutingModule,
    SelectModule
  ],
  declarations: [
  	AliquotaImpostosComponent
  ],
  providers: [
    AliquotaImpostosService,
    NotifyService,
    PrestadorService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class AliquotaImpostosModule { }
