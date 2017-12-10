import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditShopPage} from "../edit-shop/edit-shop";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ToastProvider} from "../../providers/toast/toast";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  editShopPage :any = EditShopPage;
  userInfo = {
    shopName:'',
    email:'',
    phone:'',
    password:'',
    shopNamePhone:'',
    shopShortName:'',
    shopUserName:'',
    aboutUs:'',
    registerDate:'',
    shopType:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:LocalStorageProvider,
              private toastProvider:ToastProvider) {
    this.userInfo = this.storage.get('UserSession',null);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }



}
