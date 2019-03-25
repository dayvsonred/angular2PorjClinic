import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensalidadeDentalvidasNotaFiscalComponent } from './mensalidade-dentalvidas-nota-fiscal.component';

const routes: Routes = [
  {
    path: '',
    component: MensalidadeDentalvidasNotaFiscalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensalidadeDentalvidasNotaFiscalRoutingModule { }
