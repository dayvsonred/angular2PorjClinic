import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'angular2-select';
import { BrMasker4Module } from 'brmasker4';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { routing } from './app.routing';
import { VarsProd } from './app.varsprod';

import { SharedModule } from './shared/shared.module';
import { NumberOnlyDirective } from './diretivas/number-only.directive';
import { Select2Component } from './financeiro/conta-corrente-clinica/select2/select2.component';

import { AppComponent } from './app.component';
import { TransLoginComponent } from './trans-login/trans-login.component';
// import { FinanceiroComponent } from './financeiro/financeiro.component';
// import { ContaCorrenteClinicaComponent } from './financeiro/conta-corrente-clinica/conta-corrente-clinica.component';
import { ContaCorrenteClinicaService } from './financeiro/conta-corrente-clinica/conta-corrente-clinica.service';
// import { AgendaCadeiraComponent } from './configuracoes/agenda-cadeira/agenda-cadeira.component';
import { AgendaConfigCadeiraService } from './configuracoes/agenda-cadeira/agenda-cadeira.service';
// import { CreditoComponent } from './financeiro/credito/credito.component';
import { CreditoService } from './financeiro/credito/credito.service';
// import { CreditoRelatorioComponent } from './financeiro/credito-relatorio/credito-relatorio.component';
import { CreditoRelatorioService } from './financeiro/credito-relatorio/credito-relatorio.service';

// import { ContaCorrentePacienteComponent } from './financeiro/conta-corrente-paciente/conta-corrente-paciente.component';
import { ContaCorrentePacienteService } from './financeiro/conta-corrente-paciente/conta-corrente-paciente.service';
import { TblImprimirComponent } from './tbl-imprimir/tbl-imprimir.component';
import { TblImprimirService } from './tbl-imprimir/tbl-imprimir.service';
import { AgendaCadeiraRelatorioComponent } from './configuracoes/agenda-cadeira-relatorio/agenda-cadeira-relatorio.component';
import { AgendaCadeiraRelatorioService } from './configuracoes/agenda-cadeira-relatorio/agenda-cadeira-relatorio.service';

import { AllService } from './all.service';
// import { ContaCorrentePrestadorComponent } from './conta-corrente-prestador/conta-corrente-prestador.component';
// import { ClienteComponent } from './cliente/cliente.component';
// import { MeuPrimeiro2Component } from './meu-primeiro2/meu-primeiro2.component';
// import { CursosModule } from './cursos/cursos.module';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    // ClienteComponent,
    // MeuPrimeiro2Component,
    // FinanceiroComponent,
    // ContaCorrenteClinicaComponent,
    // FormatCurrencyPipe,
    // AgendaCadeiraComponent,
    // CreditoComponent,
    // CreditoRelatorioComponent,
    // ContaCorrentePacienteComponent,
    NumberOnlyDirective,
    AppComponent,
    Select2Component,
    TransLoginComponent,
    TblImprimirComponent,
    AgendaCadeiraRelatorioComponent,
    // ContaCorrentePrestadorComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    // HttpModule,
    MyDatePickerModule,
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    // AlertModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    SelectModule,
    BrMasker4Module,
    CurrencyMaskModule,
    routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // FormatCurrencyPipe.forRoot(),
    // CursosModule,
    // DatePickerModule,
    /*ReactiveFormModule,
    OverlayModule,
    ,*/
  ],
  // exports: [ FormatCurrencyPipe ],
   providers: [AllService, AgendaCadeiraRelatorioService, ContaCorrentePacienteService, CreditoRelatorioService, CreditoService, ContaCorrenteClinicaService, AgendaConfigCadeiraService, TblImprimirService,  AuthGuard, AuthService, VarsProd], 
   //providers: [ AuthGuard, AuthService], 
  
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MyTestAppModule {}
// export class FormatCurrencyPipe { }