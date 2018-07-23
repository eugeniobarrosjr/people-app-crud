import 'rxjs/add/operator/map';

import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { People } from '../../model/people';
import { PeopleList } from '../../model/peopleList';

@Injectable()
export class PersonProvider {
  constructor(private _storage: Storage, private _datepipe: DatePipe) {}

  public getAll() {
    let persons: PeopleList[] = [];

    return this._storage
      .forEach((value: People, key: string, iterationNumber: Number) => {
        let people = new PeopleList();
        people.key = key;
        people.people = value;
        persons.push(people);
      })
      .then(() => {
        return Promise.resolve(persons);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  public insert(people: People) {
    let key = this._datepipe.transform(new Date(), 'ddMMyyyyHHmmss');
    return this._save(key, people);
  }

  public update(key: string, people: People) {
    return this._save(key, people);
  }

  private _save(key: string, people: People) {
    return this._storage.set(key, people);
  }

  public remove(key: string) {
    return this._storage.remove(key);
  }
}
