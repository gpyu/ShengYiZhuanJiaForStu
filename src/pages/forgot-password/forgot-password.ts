import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastProvider} from "../../providers/toast/toast";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {AccountValidator} from "../../validators/account";
import {Md5} from "../../util/md5";
import {SignInPage} from "../sign-in/sign-in";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public isTimerStart: boolean = false;
  public timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;
  private registerForm: FormGroup;




  @ViewChild('registerSlides') registerSlides:any;
  constructor(public navCtrl: NavController,
              private toastProvider: ToastProvider,
              private formBuilder: FormBuilder,
              private storage:LocalStorageProvider,
              private authenticationCodeService:AuthenticationCodeProvider) {
    this.registerForm = this.formBuilder.group({
      'username':['', [Validators.required, AccountValidator.isValid]],
      'confirmPassword': ['', [Validators.required, AccountValidator.isEqual]],
      'code': ['', [Validators.required]],
      'password': ['', [Validators.required, AccountValidator.isPasswordValid]]
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  forgetPW(){
    console.log(this.registerForm.controls.username.value)
    if (!this.registerForm.controls.username.valid || this.registerForm.controls.username.errors) {
      this.toastProvider.show('请输入正确的手机号或邮箱', 'error')
      return;
    }
    let flag = false;
    let userlist: any = this.storage.get('userlist', null);
    for (var i = 0; i < userlist.length; i++) {
      if (this.registerForm.controls.username.value == userlist[i].phone||this.registerForm.controls.username.value == userlist[i].email) {
        flag = true;
        break;
      }
    }
    if(!flag){
      this.toastProvider.show('不存在该手机号码或者邮箱号', 'error')
      return;
    }


    this.next();
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
  forgetPWFinish(){
    if (!this.registerForm.controls.password.valid) {
      this.toastProvider.show('请输入密码（6-16位并由数字、英文或者字符至少两种构成）', 'error')
      return;
    }
    if (this.registerForm.controls.confirmPassword.value!=this.registerForm.controls.password.value) {
      this.toastProvider.show('两次密码不一致', 'error')
      return;
    }
    let userlist: any = this.storage.get('userlist', null);
    for(var i = 0; i < userlist.length; i++){
        if(this.registerForm.controls.username.value == userlist[i].phone || this.registerForm.controls.username.value == userlist[i].email){
          userlist[i]['password'] = Md5.hashStr(this.registerForm.controls.password.value).toString();
          break;
        }
    }
    this.storage.set('userlist', userlist);
    this.toastProvider.show('密码修改完成', 'success')
    this.navCtrl.push(SignInPage);

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

  sendCode(){
      console.log(this.authenticationCodeService.createCode(4));
      //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
      this.toastProvider.show('验证码已发送，请注意查收', 'success')
      this.isTimerStart = true;
      this.timerTracker();
  }
  validateCode(){
    if (!this.registerForm.controls.code.valid) {
      this.toastProvider.show('请输入验证码', 'error')
      return;
    }
    if(this.authenticationCodeService.validate(this.registerForm.controls.code.value)){
      this.next();
    }else{
      this.toastProvider.show('短信验证码不正确或者已过期', 'error')
    }
  }





}
