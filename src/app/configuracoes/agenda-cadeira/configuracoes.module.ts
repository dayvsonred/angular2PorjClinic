import { NgModule } from '@angular/core';
// import {  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaCadeiraComponent } from './agenda-cadeira.component';

import { SelectModule } from 'angular2-select';

// import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule} from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { BrMasker4Module } from 'brmasker4';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TabsModule } from 'ngx-bootstrap/tabs';


import { RouterModule }  from '@angular/router';
// import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { configuracoesRouting } from './configuracoes.routing';


@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    // TimepickerModule.forRoot(),
    FormsModule,
    MyDatePickerModule,
    BrMasker4Module,
    CurrencyMaskModule,
    TabsModule,
    RouterModule,
    configuracoesRouting,
  ],
  declarations: [ AgendaCadeiraComponent ]
  // providers: [ ContactsService ]
})

export class ConfiguracoesModule{}

// export class ConfiguracoesModule implements OnInit {

//   constructor(private routerURl: ActivatedRoute,private router: Router,  ){ console.log("ConfiguracoesModule  %%%%%%%%%%%%%%%%%%%%%%%%%%%");  }

//   ngOnInit() {
   
//   //  console.log(this.routerURl.snapshot.params);
//   }
// }
