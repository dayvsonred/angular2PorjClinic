import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TratamentoDentalvidasNotaFiscalComponent } from './tratamento-dentalvidas-nota-fiscal.component';

const routes: Routes = [
  {
    path: '',
    component: TratamentoDentalvidasNotaFiscalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoDentalvidasNotaFiscalRoutingModule { }
