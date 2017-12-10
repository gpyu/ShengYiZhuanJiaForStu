import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastProvider} from "../../providers/toast/toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {Md5} from "../../util/md5";
import {SignInPage} from "../sign-in/sign-in";
import {AccountValidator} from "../../validators/account";

/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {
  private registerForm: FormGroup;
  constructor(public navCtrl: NavController,
              private toastProvider: ToastProvider,
              private formBuilder: FormBuilder,
              private storage:LocalStorageProvider,
              private authenticationCodeService:AuthenticationCodeProvider) {
    this.registerForm = this.formBuilder.group({
      'confirmPassword': ['', [Validators.required, AccountValidator.isEqual]],
      'password': ['', [Validators.required, AccountValidator.isPasswordValid]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }
  forgetPWFinish(){
    let userInfo = this.storage.get('UserSession',null);
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
      if(userInfo.phone == userlist[i].phone){
        userlist[i]['password'] = Md5.hashStr(this.registerForm.controls.password.value).toString();
        break;
      }
    }
    this.storage.set('userlist', userlist);
    this.toastProvider.show('密码修改完成', 'success')

  }
}
