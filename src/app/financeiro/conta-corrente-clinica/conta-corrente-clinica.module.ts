import { NgModule } from '@angular/core';
// import {  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaCorrenteClinicaComponent } from './conta-corrente-clinica.component';

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
    // TimepickerModule.forRoot(),
    FormsModule,
    // FormatCurrencyPipe,
    SharedModule,
    MyDatePickerModule,
    BrMasker4Module,
    CurrencyMaskModule,
    TabsModule,
    RouterModule,
    Routing,
    

  ],
  declarations: [ 
    //  FormatCurrencyPipe, 
     ContaCorrenteClinicaComponent ]
  // , providers: [ FormatCurrencyPipe  ]
})

export class ContaCorrenteClinicaModule{}

// export class ConfiguracoesModule implements OnInit {

//   constructor(private routerURl: ActivatedRoute,private router: Router,  ){ console.log("ConfiguracoesModule  %%%%%%%%%%%%%%%%%%%%%%%%%%%");  }

//   ngOnInit() {
   
//   //  console.log(this.routerURl.snapshot.params);
//   }
// }
