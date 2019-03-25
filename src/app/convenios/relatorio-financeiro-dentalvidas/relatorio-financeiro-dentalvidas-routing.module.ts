import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioFinanceiroDentalvidasComponent } from './relatorio-financeiro-dentalvidas.component';

const routes: Routes = [
  {
    path: '',
    component: RelatorioFinanceiroDentalvidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioFinanceiroDentalvidasRoutingModule { }
