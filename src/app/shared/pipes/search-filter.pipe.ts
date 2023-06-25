import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'searchFilter',
})
export class SearchFilterPipe<T> implements PipeTransform {
  constructor() {}

  transform(list: T[], searchText: string, searchKey: string): T[] {
    console.log(searchText , searchKey);

    let filteredList: T[] = [];
    if (!searchText) {
      return list;
    } else {
      for (const item of list) {
        if (item[searchKey].toLowerCase().includes(searchText.toLowerCase())) {
          filteredList.push(item);
        }
      }
      return filteredList;
    }
  }
}
