import { Routes, RouterModule } from '@angular/router';
import { CreditoComponent } from './credito.component';


const ROUTES: Routes = [
  {  path: '', component: CreditoComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

