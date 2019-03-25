import { Routes, RouterModule } from '@angular/router';
import { ContaCorrenteClinicaComponent } from './conta-corrente-clinica.component';


const ROUTES: Routes = [
  {  path: '', component: ContaCorrenteClinicaComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

