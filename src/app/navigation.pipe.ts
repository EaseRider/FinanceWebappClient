/**
 * Created by Galaxus on 04.04.2017.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'isactivenav'
})
export class NavigationPipe implements PipeTransform {
  transform(current: string, expected: string): string {
    if (expected && expected == current) {
      return 'active';
    } else {
      return '';
    }
  }
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];
    return items.filter(it => {
      return value.indexOf(it[field]) >= 0;
    });
  }
}
