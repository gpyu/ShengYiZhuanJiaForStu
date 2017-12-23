import {Component, ViewChild} from '@angular/core';
import { NavController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {ToastProvider} from "../../providers/toast/toast";
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {SignInPage} from "../sign-in/sign-in";
import {AccountValidator} from "../../validators/account";
import alicloudSMS from "@alicloud/sms-sdk"
import {Md5} from "../../util/md5";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public isTimerStart: boolean = false;
  public timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;
  private registerForm: FormGroup;

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
              private toastProvider: ToastProvider,
              private formBuilder: FormBuilder,
              private storage:LocalStorageProvider,
              private authenticationCodeService:AuthenticationCodeProvider) {
    this.registerForm = this.formBuilder.group({
      'phone':['', [Validators.required, AccountValidator.isPhoneValid]],
      'confirmPassword': ['', [Validators.required, AccountValidator.isEqual]],
      'email': ['',[Validators.required, AccountValidator.isEmailValid]],
      'code': ['', [Validators.required]],
      'shopName': ['', [Validators.required,AccountValidator.isShopNameValid]],
      'password': ['', [Validators.required, AccountValidator.isPasswordValid]]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.registerSlides.lockSwipeToNext(true);
  }

  send(){
    console.log(this.authenticationCodeService.createCode(4));
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
    this.toastProvider.show('验证码已发送，请注意查收', 'success')
    this.isTimerStart = true;
    this.timerTracker();





  }


  timerTracker() {
    setTimeout(() => {
     //console.log(this.timerRemainSeconds);
      if (this.timerRemainSeconds > 0) {
        this.timerRemainSeconds--;
        this.timerText = this.timerRemainSeconds + "s后再次发送";
        this.timerTracker();
      }
      else {
        this.timerText = "再次发送";
        this.timerRemainSeconds = 60;
        this.isTimerStart = false;
      }
    }, 1000);
  }

  fillPhoneNum($event){
    if (!this.registerForm.controls.phone.valid || this.registerForm.controls.phone.errors) {
      this.toastProvider.show('请输入正确的手机号', 'error')
      return;
    }else {
      let flag = true;
      let userlist: any = this.storage.get('userlist', null);
      if (null != userlist) {
        for (var i = 0; i < userlist.length; i++) {
          if (this.registerForm.controls.phone.value == userlist[i].phone) {
            console.log("true");
            flag = false;
            break;
          }
        }
      }
      if (!flag) {
        this.toastProvider.show('该手机号已注册，请直接登录或修改手机号', 'error');
        return;
      }
    }
    this.next();
  }

  sendCode($event) {
    if (!this.registerForm.controls.phone.valid || this.registerForm.controls.phone.errors) {
      this.toastProvider.show('请输入正确的手机号码或邮箱', 'error')
      return;
    }
    this.send();
  }


  next(){
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipeToNext(true);
  }
  previous() {
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipeToNext(true);
  }


  validateCode(){
    if (!this.registerForm.controls.code.valid) {
      this.toastProvider.show('请输入验证码', 'error')
      return;
    }
    if(this.authenticationCodeService.validate(this.registerForm.controls.code.value)){
      this.next();
      //this.storage.set('userConfig',userConfig);
      //this.navCtrl.push(SignInPage);
    }else{
      this.toastProvider.show('短信验证码不正确或者已过期', 'error')
    }
  }

  fillAccounrInfo(){
    if (!this.registerForm.controls.shopName.valid) {
      this.toastProvider.show('请输入店铺的名字(少于八位)', 'error')
      return;
    }
    if (!this.registerForm.controls.email.valid) {
      this.toastProvider.show('邮箱格式不正确', 'error')
      return;
    }
    if (!this.registerForm.controls.password.valid) {
      this.toastProvider.show('请输入密码（6-16位并由数字、英文或者字符至少两种构成）', 'error')
      return;
    }

    if (this.registerForm.controls.confirmPassword.value!=this.registerForm.controls.password.value) {
      this.toastProvider.show('两次密码不一致', 'error')
      return;
    }
    this.next();
  }

  saveUserInfo(){

    let userConfig = {
      phone:this.registerForm.controls.phone.value,
      email:this.registerForm.controls.email.value,
      shopNamePhone:'',
      shopUserName:'',
      shopShortName:'',
      shopType:'',
      aboutUs:'',
      registerDate:new Date(),
      shopName:this.registerForm.controls.shopName.value,
      password:Md5.hashStr(this.registerForm.controls.password.value),
      flag:true
    }


    let userlist:any = this.storage.get('userlist',null);
    if(null == userlist){
      let arrayObj = new Array();
      arrayObj.push(userConfig);
      this.storage.set('userlist',arrayObj);
    }else{
      userlist.push(userConfig);
      this.storage.set('userlist',userlist);
    }
    this.navCtrl.push(SignInPage);
  }
}
