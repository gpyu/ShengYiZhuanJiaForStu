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
  shopName:string;
  email:string;
  phone:string;
  password:string;
  shopNamePhone:string;
  shopShortName:string;
  shopUserName:string;
  aboutUs:string;
  registerDate:string;
  shopType:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:LocalStorageProvider,
              private toastProvider:ToastProvider) {
    let userInfo = this.storage.get('UserSession',null);
    this.shopName = userInfo.shopName;
    this.email = userInfo.email;
    this.phone = userInfo.phone;
    this.password = userInfo.password;
    this.shopNamePhone = userInfo.shopNamePhone;
    this.shopShortName = userInfo.shopShortName;
    this.shopUserName = userInfo.shopUserName;
    this.aboutUs = userInfo.aboutUs;
    this.registerDate = userInfo.registerDate;
    this.shopType = userInfo.shopType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }



}
