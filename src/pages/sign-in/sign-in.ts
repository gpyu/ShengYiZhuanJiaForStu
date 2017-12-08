import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";
import {Md5} from "../../util/md5";
import {WelcomePage} from "../welcome/welcome";

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
  @ViewChild('signinForm') signinForm:any;
  signin = {
    phone:'',
    password:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:LocalStorageProvider,
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

    let msg = '帐号或密码错误';
    let flag = false;
    let userlist:any = this.storage.get('userlist',null);
    if(null != userlist){
      for(var i=0;i<userlist.length;i++){
        if((this.signin.phone==userlist[i].phone) && Md5.hashStr(this.signin.password)==userlist[i].password){
          flag = true;
        }
      }
      if(flag){
        msg = "登录成功";
      }
    }
    let currDate=new Date();
    let userSession = {
      phone:this.signin.phone,
      loginDate:currDate.getTime()
    }
    this.storage.set("UserSession",userSession);

    let toast = this.toastCtrl.create({
      message:msg,
      duration:3000
    });
    toast.present();
    if(msg == "登录成功"){
      this.navCtrl.push(HomePage);
    }
    //
  }
  //点击忘记密码时调用
  toForgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }
  toRegister(){
    this.navCtrl.push(RegisterPage);
  }
  toWelcomePage(){
    this.navCtrl.push(WelcomePage);
  }

}
