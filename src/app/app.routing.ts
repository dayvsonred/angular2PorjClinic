import { TransLoginComponent } from './trans-login/trans-login.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TblImprimirComponent } from './tbl-imprimir/tbl-imprimir.component';
import { AgendaCadeiraRelatorioComponent } from './configuracoes/agenda-cadeira-relatorio/agenda-cadeira-relatorio.component';
// import { ContaCorrentePrestadorComponent } from './financeiro/conta-corrente-prestador/conta-corrente-prestador.component';
// import { AppComponent } from './app.component';
// import { FinanceiroComponent } from './financeiro/financeiro.component';
// import { AgendaCadeiraComponent } from './configuracoes/agenda-cadeira/agenda-cadeira.component';
// import { ContaCorrenteClinicaComponent } from "./financeiro/conta-corrente-clinica/conta-corrente-clinica.component";
// import { CreditoComponent } from './financeiro/credito/credito.component';
// import { CreditoRelatorioComponent } from './financeiro/credito-relatorio/credito-relatorio.component';
// import { ContaCorrentePacienteComponent } from './financeiro/conta-corrente-paciente/conta-corrente-paciente.component';

const appRoutes: Routes = [
  { path: 'configuracao_cadeira',
    loadChildren: 'app/configuracoes/agenda-cadeira/configuracoes.module#ConfiguracoesModule',
    canActivate: [AuthGuard]
  },
  { path: 'financ',  
    loadChildren: 'app/financeiro/conta-corrente-clinica/conta-corrente-clinica.module#ContaCorrenteClinicaModule',
    canActivate: [AuthGuard]
  },
  { path: 'financPacient',  
    loadChildren: 'app/financeiro/conta-corrente-paciente/conta-corrente-paciente.module#ContaCorrentePacienteModule',
    canActivate: [AuthGuard]
  },
  { path: 'financCredtRelat',  
    loadChildren: 'app/financeiro/credito-relatorio/credito-relatorio.module#CreditoRelatorioModule',
    canActivate: [AuthGuard]
  },
  { path: 'financDetalheCredt',  
    loadChildren: 'app/financeiro/credito/credito.module#CreditoModule',
    canActivate: [AuthGuard]
  },
  { path: 'financPrestador',  
    loadChildren: 'app/financeiro/conta-corrente-prestador/conta-corrente-prestador.module#CreditoModule',
    canActivate: [AuthGuard]
  },
  { path: 'financPrestadorImp',  
    loadChildren: 'app/financeiro/conta-corrente-prestador-recibo/conta-corrente-prestador-recibo.module#FinacReciboModule',
    canActivate: [AuthGuard]
  },
  { path: 'financPrestadorPNL',  
    loadChildren: 'app/financeiro/conta-corrente-prestador-painel/conta-corrente-prestador-painel.module#PrestadorPainelModule',
    canActivate: [AuthGuard]
  },

  // { path: 'financPacient', component: ContaCorrentePacienteComponent , canActivate: [AuthGuard] },
  // { path: 'financCredtRelat', component: CreditoRelatorioComponent, canActivate: [AuthGuard] },
  // { path: 'financDetalheCredt', component: CreditoComponent, canActivate: [AuthGuard] },
  // { path: 'financ', component: ContaCorrenteClinicaComponent, canActivate: [AuthGuard] },
  // { path: 'configuracao_cadeira', component: AgendaCadeiraComponent,  canActivate: [AuthGuard]  },
  { path: 'loginFast/:toke/:rota', component: TransLoginComponent  },
  { path: 'loginFast/:toke/:rota/:val1', component: TransLoginComponent  },
  { path: 'Imprimir/:pg', component: TblImprimirComponent , canActivate: [AuthGuard] },
  { path: 'cadeiraRelatorio', component: AgendaCadeiraRelatorioComponent, canActivate: [AuthGuard]   },
  { path: '', pathMatch: 'full', component: TransLoginComponent  },
  { path: 'signin', component: TransLoginComponent  },
  { path: '**', redirectTo: 'loginFast' },
  { path: 'mensalidadedentalvidas', loadChildren: './convenios/mensalidade-dentalvidas/mensalidade-dentalvidas.module#MensalidadeDentalvidasModule', canActivate: [AuthGuard] },
  { path: 'mensalidadedentalvidasnotafiscal', loadChildren: './convenios/mensalidade-dentalvidas-nota-fiscal/mensalidade-dentalvidas-nota-fiscal.module#MensalidadeDentalvidasNotaFiscalModule', canActivate: [AuthGuard] },
  { path: 'tratamentodentalvidasenvio', loadChildren: './convenios/tratamento-dentalvidas/tratamento-dentalvidas.module#TratamentoDentalvidasModule', canActivate: [AuthGuard] },
  { path: 'relatoriofinancdentalvidas', loadChildren: './convenios/relatorio-financeiro-dentalvidas/relatorio-financeiro-dentalvidas.module#RelatorioFinanceiroDentalvidasModule', canActivate: [AuthGuard] },
  { path: 'tratamentodentalvidaslotegto', loadChildren: './convenios/tratamento-dentalvidas-lote-gto/tratamento-dentalvidas-lote-gto.module#TratamentoDentalvidasLoteGtoModule', canActivate: [AuthGuard] },
  { path: 'tratamentodentalvidasnotafiscal', loadChildren: './convenios/tratamento-dentalvidas-nota-fiscal/tratamento-dentalvidas-nota-fiscal.module#TratamentoDentalvidasNotaFiscalModule', canActivate: [AuthGuard] },
  { path: 'tratamentodentalvidasnotafiscalpagto', loadChildren: './convenios/tratamento-dentalvidas-nota-fiscal-pagto/tratamento-dentalvidas-nota-fiscal-pagto.module#TratamentoDentalvidasNotaFiscalPagtoModule', canActivate: [AuthGuard] },
  { path: 'relatoriorecebdentalvidas', loadChildren: './convenios/relatorio-recebimento-dentalvidas/relatorio-recebimento-dentalvidas.module#RelatorioRecebimentoDentalvidasModule', canActivate: [AuthGuard] },
  { path: 'relatoriopagtodentalvidas', loadChildren: './convenios/relatorio-pagamento-dentalvidas/relatorio-pagamento-dentalvidas.module#RelatorioPagamentoDentalvidasModule', canActivate: [AuthGuard] },
  { path: 'aliquotaimpostos', loadChildren: './configuracoes/aliquota-impostos/aliquota-impostos.module#AliquotaImpostosModule', canActivate: [AuthGuard] }
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
