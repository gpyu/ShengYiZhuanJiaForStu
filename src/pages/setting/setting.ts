import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignInPage} from "../sign-in/sign-in";
import {ShopPage} from "../shop/shop";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {EditPasswordPage} from "../edit-password/edit-password";
import {AboutUsPage} from "../about-us/about-us";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})

export class SettingPage {
  loginPage:any;
  shopPage :any = ShopPage;
  editPasswordPage :any = EditPasswordPage;
  aboutUsPage:any = AboutUsPage;
  APP;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:LocalStorageProvider,
              ) {
    this.loginPage = SignInPage;
    this.APP = this.storage.get('APP',{});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  logout(){
    this.storage.remove("UserSession");
    this.navCtrl.push(SignInPage)
  }


}
