import { NgModule } from '@angular/core';
// import {  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaCorrentePrestadorReciboComponent } from './conta-corrente-prestador-recibo.component';
import { SelectModule } from 'angular2-select';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule }  from '@angular/router';
import { Routing } from './routing.routing';
// import { RouterModule, Router, ActivatedRoute } from '@angular/router';
// import { FormatCurrencyPipe } from '../.././pipes/format-currency.pipe';
// import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    SharedModule,
    MyDatePickerModule,
    BrMasker4Module,
    CurrencyMaskModule,
    TabsModule,
    RouterModule,
    Routing,
    // FormatCurrencyPipe,
    // TimepickerModule.forRoot(),

  ],
  declarations: [ ContaCorrentePrestadorReciboComponent ]
  // , providers: [   ]
})

export class FinacReciboModule{}


