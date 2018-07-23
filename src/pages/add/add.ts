import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { People } from '../../model/people';
import { PersonProvider } from '../../provider/person.provider/person.provider';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  people: People;
  key: string;
  peopleForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private _personProvider: PersonProvider,
    private _toastCtrl: ToastController
  ) {
    if (this.navParams.data.people && this.navParams.data.key) {
      this.people = this.navParams.data.people;
      this.key = this.navParams.data.key;
    } else {
      this.people = new People();
    }
    this.peopleForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required])],
      sex: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(value: any): void {
    if (this.peopleForm.valid) {
      this.save();
    }
  }

  save() {
    this._savePeople()
      .then(res => {
        this._presentToast('Salvo com sucesso');
        setTimeout(() => {
          this.navCtrl.setRoot(TabsPage);
        }, 2000);
      })
      .catch(error => {
        this._presentToast('Erro ao salvar');
      });
  }

  private _savePeople() {
    if (this.key) {
      return this._personProvider.update(this.key, this.people);
    } else {
      return this._personProvider.insert(this.people);
    }
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
}
