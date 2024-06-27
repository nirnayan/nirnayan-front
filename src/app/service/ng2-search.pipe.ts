import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ng2Search'
})
export class Ng2SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Customize this condition based on your object structure
      return JSON.stringify(item).toLowerCase().includes(searchText);
    });
  }
}
