import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PeopleList } from '../../model/peopleList';
import { PersonProvider } from '../../provider/person.provider/person.provider';
import { ToViewPage } from './../to-view/to-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  persons: PeopleList[] = [];
  queryText: string;

  constructor(
    public navCtrl: NavController,
    private personProvider: PersonProvider
  ) {}

  ionViewDidEnter() {
    this.personProvider.getAll().then(result => {
      this.persons = result;
    });
  }

  goToView(item: PeopleList) {
    this.navCtrl.push(ToViewPage, { key: item.key, people: item.people });
  }

  onInput(event) {
    this.queryText = event.target.value;
  }

  getIcon(sex: string) {
    return sex == 'Masculino' ? 'man' : 'woman';
  }
}
