import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-trans-login',
  templateUrl: './trans-login.component.html'
  //styleUrls: ['./trans-login.component.css']
})

export class TransLoginComponent implements OnInit {

  DadosUser         : any;

  constructor(
    private router: Router,
    private routerURl: ActivatedRoute,
    private authService: AuthService
  ){  }

  ngOnInit() {
    // console.log("TransLoginComponent");
    // this.authService.UserValid('aaaaaaaaa');
    // this.authService.UserValid('aaaaaa').subscribe(res=>this.DadosUser=res );
    // console.log(this.routerURl.snapshot.params);
    if(Object.keys(this.routerURl.snapshot.params).length){
      let toke = this.routerURl.snapshot.params['toke'];
      let rota = this.routerURl.snapshot.params['rota'];
      let val1 = this.routerURl.snapshot.params['val1'];
      // console.log('val1');console.log(val1);
      // console.log('VALIDADANDO');
      sessionStorage.removeItem('toke');
      sessionStorage.removeItem('rota');
      this.authService.UserValid(toke).subscribe(data => {  
        this.DadosUser=data; 
        // console.log("logado UserValid");
        // console.log(this.DadosUser);
        sessionStorage.setItem('toke' , JSON.stringify(toke));
        sessionStorage.setItem('rota' , JSON.stringify(rota));
        // sessionStorage.setItem('USER' , JSON.stringify(this.DadosUser[0]));
        // this.showVars();
        this.authService.RESVal1 = val1 != undefined ? val1 : null ;
        //if(data.cd_unidade_atendimento == null )
        // console.log('Go rota', rota);
        this.router.navigate(['/'+rota]);  
      });
    }else{
      // console.log("logado USER ELSE");
      let toke = JSON.parse(sessionStorage.getItem('toke'));
      let rota = JSON.parse(sessionStorage.getItem('rota'));
      // console.log(toke);
      // console.log(rota);
      if(toke != null ){
          // console.log("verificar usuario ativo");
          // console.log('authService', this.authService.URLBASE);
          this.router.navigate(['/'+rota]);  
        //   this.authService.UserValid(toke).subscribe(data => {  
        //   this.DadosUser=data; 
        //   console.log('Go rota', rota);
        //   this.router.navigate(['/'+rota]);  
        // });
      }
    }
    //this.router.navigate(['/signin']);
  }


  showVars(){
    console.log("showVars");
    console.log(this.DadosUser);
    console.log(this.authService.RESUserValid);
  }

}
