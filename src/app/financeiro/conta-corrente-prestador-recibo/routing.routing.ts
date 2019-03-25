import { Routes, RouterModule } from '@angular/router';
import { ContaCorrentePrestadorReciboComponent } from './conta-corrente-prestador-recibo.component';


const ROUTES: Routes = [
  {  path: '', component: ContaCorrentePrestadorReciboComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

