import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TratamentoDentalvidasLoteGtoComponent } from './tratamento-dentalvidas-lote-gto.component';

const routes: Routes = [
  {
    path: '',
    component: TratamentoDentalvidasLoteGtoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoDentalvidasLoteGtoRoutingModule { }
