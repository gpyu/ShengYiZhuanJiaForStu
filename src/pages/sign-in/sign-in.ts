import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
//AlertController,
import {RegisterPage} from "../register/register";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl:ToastController) {
//private alertCtrl:AlertController
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  username:string = '';//视图模型的属性账号，双向绑定
  password:string = '';//视图模型的属性密码，双向绑定
  //...其他省略
  //点击登录按钮时调用
  login(){
    let toast = this.toastCtrl.create({
      message:'用户名不能为空',
      duration:3000
    });
    toast.present();
    //
  }
  //点击忘记密码时调用
  toForgotPassword(){
    //进入找回密码页面
    /*let alert = this.alertCtrl.create({
      title: '提示',
      message:'用户名或者密码不正确',
      buttons:['确定']
    });
    alert.present();*/

  }
  toRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
