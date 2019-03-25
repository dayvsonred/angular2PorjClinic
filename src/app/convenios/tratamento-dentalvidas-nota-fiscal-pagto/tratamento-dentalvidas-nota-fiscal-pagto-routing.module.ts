import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TratamentoDentalvidasNotaFiscalPagtoComponent } from './tratamento-dentalvidas-nota-fiscal-pagto.component';

const routes: Routes = [
  {
    path: '',
    component: TratamentoDentalvidasNotaFiscalPagtoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoDentalvidasNotaFiscalPagtoRoutingModule { }
