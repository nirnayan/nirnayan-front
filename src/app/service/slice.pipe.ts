import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice'
})
export class CustomSlicePipe implements PipeTransform {

  transform(array: any[], start: number, end?: number): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.slice(start, end);
  }

}
