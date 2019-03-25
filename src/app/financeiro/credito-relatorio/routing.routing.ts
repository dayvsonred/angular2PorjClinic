import { Routes, RouterModule } from '@angular/router';
import { CreditoRelatorioComponent } from './credito-relatorio.component';


const ROUTES: Routes = [
  {  path: '', component: CreditoRelatorioComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

