import { Component } from '@angular/core';
import {
  AlertController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';

import { PersonProvider } from '../../provider/person.provider/person.provider';
import { AddPage } from '../add/add';
import { PeopleList } from './../../model/peopleList';
import { TabsPage } from './../tabs/tabs';

@Component({
  selector: 'page-to-view',
  templateUrl: 'to-view.html'
})
export class ToViewPage {
  item: PeopleList;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _personProvider: PersonProvider,
    private _toastCtrl: ToastController
  ) {
    this.item = { key: navParams.get('key'), people: navParams.get('people') };
    console.log(this.item.people.date);
  }

  editHandle(item: PeopleList) {
    this.navCtrl.setRoot(AddPage, { key: item.key, people: item.people });
  }

  private _presentToast(msg: string): void {
    let toast = this._toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {});

    toast.present();
  }

  removeHandle(item: PeopleList) {
    let alert = this._alertCtrl.create({
      title: 'Confirmar remoção',
      message: 'Tem certeza que quer deletar esse cadastro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Deletar',
          handler: () => {
            this.removeContact(item);
          }
        }
      ]
    });
    alert.present();
  }

  removeContact(item: PeopleList) {
    this._personProvider.remove(item.key).then(() => {
      this._presentToast('Removido com sucesso!');
      setTimeout(() => {
        this.navCtrl.setRoot(TabsPage);
      }, 2000);
    });
  }
}
