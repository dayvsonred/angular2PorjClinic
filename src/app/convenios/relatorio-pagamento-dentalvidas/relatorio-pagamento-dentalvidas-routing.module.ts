import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioPagamentoDentalvidasComponent } from './relatorio-pagamento-dentalvidas.component';

const routes: Routes = [
  {
    path: '',
    component: RelatorioPagamentoDentalvidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioPagamentoDentalvidasRoutingModule { }
