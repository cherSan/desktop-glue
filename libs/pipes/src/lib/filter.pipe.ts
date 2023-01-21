import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T extends Object>(value: T[] | null, searchString: string, filterField: (keyof T)[]): T[]  {
    if (!searchString) return value || [];
    if (!value) return [];
    const searchStringCases = searchString.toLowerCase();
    return value.filter(v => filterField.some((field) => v[field]?.toString().toLowerCase().includes(searchStringCases)));
  }
}
