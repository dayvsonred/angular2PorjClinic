import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioRecebimentoDentalvidasComponent } from './relatorio-recebimento-dentalvidas.component';

const routes: Routes = [
  {
    path: '',
    component: RelatorioRecebimentoDentalvidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRecebimentoDentalvidasRoutingModule { }
