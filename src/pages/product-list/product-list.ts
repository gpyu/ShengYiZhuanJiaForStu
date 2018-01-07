import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";
import {Product} from "../shared/product";
import {CategoryListPage} from "../category-list/category-list";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})

export class ProductListPage {
  loader: any;
  private pageIndex = 1;
  products: Product[];
  categoryListPage : CategoryListPage;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public navParams: NavParams, private productService: ProductProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
    this.load();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "正在加载数据，请稍候..."
    });
    this.loader.present();
  }

  load() {
    this.presentLoading();
    this.productService.get(this.pageIndex).then((data) => {
      this.loader.dismiss();
      this.products = data;
      console.log(this.products);
    }, (error) => {

    });
  }

  doRefresh(event) {
    this.pageIndex = 1;
    this.productService.get(this.pageIndex).then((data)=>{
      this.products = data;
      event.complete();
    },(error)=>{

    });
  }

  onInput(event){
    let value = event.target.value;
    if(!value){
      return ;
    }
    value = value.trim();
    if(value.length!=0){
      this.productService.getByName(value).then((data)=>{
        this.products = data;
        //event.complete();
      },(error)=>{

      });
    }
  }

  doInfinite(event){
    this.pageIndex ++;
    this.productService.get(this.pageIndex).then((data)=>{
      this.products = this.products.concat(data);
      event.complete();
    },(error)=>{

    });
  }

}
