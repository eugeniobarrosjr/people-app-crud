import { Pipe, PipeTransform } from '@angular/core';

import { PeopleList } from '../model/peopleList';

@Pipe({
  name: 'filterPeople'
})
export class FilterPeople implements PipeTransform {
  transform(persons: PeopleList[], searchTerm: string): PeopleList[] {
    if (searchTerm || searchTerm === '') {
      searchTerm = searchTerm.toLowerCase();
      return persons.filter(
        item =>
          item.people.name.toLowerCase().includes(searchTerm) ||
          item.people.cpf.includes(searchTerm)
      );
    } else {
      return persons;
    }
  }
}
