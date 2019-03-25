import { Routes, RouterModule } from '@angular/router';
import { ContaCorrentePrestadorComponent } from './conta-corrente-prestador.component';


const ROUTES: Routes = [
  {  path: '', component: ContaCorrentePrestadorComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

