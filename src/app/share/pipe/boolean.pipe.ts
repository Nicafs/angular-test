import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean',
  standalone: true,
})
export class BooleanPipe implements PipeTransform {
  transform(value: any): any {
    return value ? 'Yes' : 'No';
  }
}
