import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensalidadeDentalvidasComponent } from './mensalidade-dentalvidas.component';

const routes: Routes = [
  {
    path: '',
    component: MensalidadeDentalvidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensalidadeDentalvidasRoutingModule { }
