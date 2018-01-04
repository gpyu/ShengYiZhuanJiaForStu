import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {CategoryListPage} from "../category-list/category-list";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  categoryList:CategoryListPage;
  pr

  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService:CategoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
