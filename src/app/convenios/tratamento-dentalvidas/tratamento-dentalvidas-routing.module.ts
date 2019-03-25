import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TratamentoDentalvidasComponent } from './tratamento-dentalvidas.component';

const routes: Routes = [
  {
    path: '',
    component: TratamentoDentalvidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoDentalvidasRoutingModule { }
