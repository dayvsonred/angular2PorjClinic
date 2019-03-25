import { NgModule } from '@angular/core';
// import {  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaCorrentePacienteComponent } from './conta-corrente-paciente.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SelectModule } from 'angular2-select';

// import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule} from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { FormatCurrencyPipe } from '../.././pipes/format-currency.pipe';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule }  from '@angular/router';
// import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Routing } from './routing.routing';


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
    AccordionModule.forRoot(),
    

  ],
  declarations: [ ContaCorrentePacienteComponent ]
  // , providers: [   ]
})

export class ContaCorrentePacienteModule{}
