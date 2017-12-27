import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from "../pages/welcome/welcome";
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { RegisterPage} from "../pages/register/register";
import {FormsModule} from "@angular/forms";
import { AuthenticationCodeProvider } from '../providers/authentication-code/authentication-code';
import {SignInPage} from "../pages/sign-in/sign-in";
import {CopyrightComponent} from "../components/copyright/copyright";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import { ToastProvider } from '../providers/toast/toast';
import { HttpProvider } from '../providers/http/http';
import { HttpModule} from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { SmsProvider } from '../providers/sms/sms';
import {ShopPage} from "../pages/shop/shop";
import {SettingPage} from "../pages/setting/setting";
import {EditShopPage} from "../pages/edit-shop/edit-shop";
import {EditPasswordPage} from "../pages/edit-password/edit-password";
import {AboutUsPage} from "../pages/about-us/about-us";
import {CategoryListPage} from "../pages/category-list/category-list";
import {CategoryProvider} from "../providers/category/category";
import {CategoryAddPage} from "../pages/category-add/category-add";
import {CategoryAddSubPage} from "../pages/category-add-sub/category-add-sub";
import {CategoryEditPage} from "../pages/category-edit/category-edit";
import {CategoryNameEditPage} from "../pages/category-name-edit/category-name-edit";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    SignInPage,
    ShopPage,
    EditShopPage,
    SettingPage,
    CopyrightComponent,
    ForgotPasswordPage,
    EditPasswordPage,
    AboutUsPage,
    CategoryListPage,
    CategoryAddPage,
    CategoryAddSubPage,
    CategoryEditPage,
    CategoryNameEditPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回',
      //backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标
    }),
    FormsModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    SignInPage,
    ShopPage,
    SettingPage,
    EditShopPage,
    ForgotPasswordPage,
    EditPasswordPage,
    AboutUsPage,
    CategoryListPage,
    CategoryAddPage,
    CategoryAddSubPage,
    CategoryEditPage,
    CategoryNameEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    AuthenticationCodeProvider,
    ToastProvider,
    HttpProvider,
    SmsProvider,
    CategoryProvider,
  ]
})
export class AppModule {}
