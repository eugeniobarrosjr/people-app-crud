import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { AddPage } from '../add/add';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor(public navCtrl: NavController) {
    console.log(navCtrl.canGoBack());
    console.log(navCtrl.canSwipeBack());
    console.log(navCtrl.getType());
    console.log(navCtrl.getActive());
  }

  addPerson() {
    this.navCtrl.push(AddPage);
  }
}
