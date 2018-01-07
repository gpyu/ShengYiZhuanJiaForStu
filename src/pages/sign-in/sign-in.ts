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
  }
  ionViewDidLoad() {
    console.log('进入登录页面');
    console.log('ionViewDidLoad SignInPage');
  }
  login(){
    console.log("登录");
    let msg = '帐号或密码错误';
    let flag = false;
    let user = {
      phone:'',
      shopName:'',
      shopShortName:'',
      shopNamePhone:'',
      shopType:'',
      shopUserName:'',
      email:'',
      password:'',
      aboutUs:'',
      loginDate:null,
      registerDate:null
    };
    let userlist:any = this.storage.get('userlist',null);
    if(null != userlist){
      for(var i=0;i<userlist.length;i++){
        if((this.signin.phone==userlist[i].phone) && Md5.hashStr(this.signin.password)==userlist[i].password){
          user.phone = userlist[i].phone;
          user.shopName = userlist[i].shopName;
          user.shopShortName = userlist[i].shopShortName;
          user.shopNamePhone=userlist[i].shopNamePhone,
          user.shopType=userlist[i].shopType;
          user.shopUserName=userlist[i].shopUserName;
          user.email = userlist[i].email;
          user.loginDate = userlist[i].loginDate;
          user.password = userlist[i].password;
          user.registerDate = userlist[i].registerDate;
          user.aboutUs = userlist[i].aboutUs;
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
      loginDate:currDate.getTime(),
      shopName:user.shopName,
      shopNamePhone:user.shopNamePhone,
      shopShortName:user.shopShortName,
      shopType:'',
      shopUserName:'',
      password:user.password,
      email:user.email,
      aboutUs:user.aboutUs,
      registerDate:user.registerDate
    }

    console.log(flag);
    if(flag){
      this.storage.set("UserSession",userSession);
      console.log(userSession);
      this.navCtrl.setRoot(HomePage);
    }
/*
    let toast = this.toastCtrl.create({
      message:msg,
      duration:3000
    });
    toast.present();
    */
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
