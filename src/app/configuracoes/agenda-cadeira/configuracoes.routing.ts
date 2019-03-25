import { Routes, RouterModule } from '@angular/router';
import { AgendaCadeiraComponent } from './agenda-cadeira.component';


const CONFIGURACOES_CADE_ROUTES: Routes = [
  {  
    path: '', component: AgendaCadeiraComponent, 
  }
];

 
export const configuracoesRouting = RouterModule.forChild(CONFIGURACOES_CADE_ROUTES);
 
