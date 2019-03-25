import { Routes, RouterModule } from '@angular/router';
import { ContaCorrentePrestadorPainelComponent } from './conta-corrente-prestador-painel.component';


const ROUTES: Routes = [
  {  path: '', component: ContaCorrentePrestadorPainelComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

