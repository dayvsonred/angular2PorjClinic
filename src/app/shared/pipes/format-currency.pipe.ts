import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //console.log(args);
    // return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value);
  }

}