import {Pipe, PipeTransform} from '@angular/core';
import {Invest} from '../_models/invest';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Invest[], value: string): any[] {
    if (!items || !value) {
      return items;
    }
    return items.filter(e => e.nazwa.toLowerCase().includes(value.toLocaleLowerCase()));
  }
}
