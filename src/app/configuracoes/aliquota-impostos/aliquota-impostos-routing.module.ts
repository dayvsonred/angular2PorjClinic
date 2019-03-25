import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AliquotaImpostosComponent } from './aliquota-impostos.component';

const routes: Routes = [
  {
    path: '',
    component: AliquotaImpostosComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AliquotaImpostosRoutingModule { }
