import { Routes, RouterModule } from '@angular/router';
import { ContaCorrentePacienteComponent } from './conta-corrente-paciente.component';


const ROUTES: Routes = [
  {  path: '', component: ContaCorrentePacienteComponent, 
    //  path: '', //, component: AgendaCadeiraComponent, 
    
  }
];


export const Routing = RouterModule.forChild(ROUTES);

