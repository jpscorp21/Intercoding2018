import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'suspensivo',
})
export class SuspensivoPipe implements PipeTransform {

  transform(value: string, ...args) {
    let limite = args[0] || 50;

    if (value.length >= limite) {
      return value.slice(0, limite) + '...';
    }
  }

}
