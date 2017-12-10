import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {Md5} from "../../util/md5";
import {ToastProvider} from "../../providers/toast/toast";
import {HomePage} from "../home/home";


/**
 * Generated class for the EditShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shop',
  templateUrl: 'edit-shop.html',
})
export class EditShopPage {
  title:string;
  property:string;
  value:string;
  userInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:LocalStorageProvider,
              private toastProvider:ToastProvider) {
    this.title = navParams.get('title');
    this.property = navParams.get('property');
    this.userInfo = this.storage.get('UserSession',null);
    this.value = this.userInfo[this.property];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShopPage');
  }
  save(){
    //修改Session中的信息
    let userInfo = this.storage.get('UserSession',{});
    userInfo[this.property] = this.value;
    this.storage.set('UserSession',userInfo);
    this.toastProvider.show('店铺名称修改完成', 'success')
    this.changeUserlist(this.property,this.value)
    this.navCtrl.goToRoot(HomePage)
  }
  private changeUserlist(propertyName,value){
    //修改用户列表中的值
    let newUser = null;
    let userlist: any = this.storage.get('userlist', null);
    for(var i = 0; i < userlist.length; i++){
      if(userlist[i].phone == this.userInfo.phone){
        userlist[i][propertyName] = value;
        break;
      }
    }
    this.storage.set('userlist', userlist);

  }
}
