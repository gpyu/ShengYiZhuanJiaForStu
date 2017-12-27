import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the CategoryNameEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-name-edit',
  templateUrl: 'category-name-edit.html',
})
export class CategoryNameEditPage {
  name: string;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryNameEditPage');
  }
  dismiss() {
    this.viewCtrl.dismiss({name: this.navParams.get('name')});
  }


  save(){
    this.viewCtrl.dismiss({name: this.name});
  }
}
