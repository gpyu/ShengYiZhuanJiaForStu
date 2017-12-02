import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('registerSlides') registerSlides:any;
  register = {
    phone:'',
    email:'',
    shopName:'',
    password:'',
    confirmPassword:'',
    code:''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private authenticationCodeService:AuthenticationCodeProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.registerSlides.lockSwipeToNext(true);
  }
  next(){
    console.log("进入next");
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipeToNext(true);
  }
  previous() {
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipeToNext(true);
  }
  send(){
    console.log(this.authenticationCodeService.createCode(4));
    this.next();
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
  }
  validateCode(){
    if(this.authenticationCodeService.validate(this.register.code)){
      this.next();

    }
    else{
      console.log('短信验证码不正确或者已过期');
    }
  }
}
