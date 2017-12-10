import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {WelcomePage} from "../pages/welcome/welcome";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SettingPage} from "../pages/setting/setting";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  userInfo = {
    phone:"",
    email:"",
    shopName:"",
    password:"",
    flag:true
  };
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private storage:LocalStorageProvider) {
    this.initializeApp();

    let appConfig:any = this.storage.get('APP',{
      isRun:false,
      version:'1.0.0'
    });

    if(appConfig.isRun == false){
      this.rootPage = WelcomePage;
      appConfig.isRun = true;
      this.storage.set('APP',appConfig);
    }else{

      let userSession:any = this.storage.get('UserSession',null);
      if(userSession!=null){
        console.log("用户登录过")
        let lastLoginDate = userSession.loginDate;
        var days=Math.floor((new Date().getTime()-lastLoginDate)/(24*3600*1000));
        if(days>7){
          console.log("用户登录超过7天，已过期，重新登录")
          this.storage.remove('UserSession');
          this.rootPage = SignInPage;
        }else{
          console.log("用户登录未失效，直接进入首页")
          this.userInfo = userSession;
          this.rootPage = HomePage  ;
        }
      }else{
        console.log("用户未登录")
        this.rootPage = SignInPage;
      }
    }
    this.pages = [
      { title: '开店论坛', component: HomePage, icon: 'chatboxes' },
      { title: '手机橱窗', component: ListPage, icon: 'create' },
      { title: '邀请有礼', component: ListPage, icon: 'git-merge' },
      { title: '资金账户', component: ListPage, icon: 'cash' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  gotoSettingPage(){
    this.nav.push(SettingPage);
  }

}
