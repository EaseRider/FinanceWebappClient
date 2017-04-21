/**
 * Created by Galaxus on 04.04.2017.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mycurrency'
})
export class MyCurrencyPipe implements PipeTransform {
  transform(value: any): string {
    return value + ' CHF';
  }
}
