import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, NavController, NavParams} from 'ionic-angular';
import {Product} from "../shared/product";
import {CategoryListPage} from "../category-list/category-list";
import {CategoryProvider} from "../../providers/category/category";
import {ProductProvider} from "../../providers/product/product";

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  //@ViewChild('addProductForm') addProductForm:any;

  product:Product;

  categoryList:any;
  subscription:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService:CategoryProvider,
  private events:Events, public alertCtrl: AlertController,private productService:ProductProvider) {
    this.categoryList = CategoryListPage;
    this.product = new Product();
    this.product.categoryId = categoryService.activeCategory.id;
    this.product.categoryName = categoryService.activeCategory.name;
    events.subscribe('category:update', (data)=>{
      console.log('events',data);
      this.product.categoryId = data.id;
      this.product.categoryName = data.name;
    })

    this.subscription = this.categoryService.getCategorySubject().subscribe((data)=>{
      console.log('subject:',data);
      this.product.categoryId = data.id;
      this.product.categoryName = data.name;
    },(error)=>{

    },()=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  /*ionViewDidLeave(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }*/

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '新增供货商',
      inputs: [
        {
          name: 'name',
          placeholder: '名称'
        },
        {
          name: 'phone',
          placeholder: '电话'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  add(){
    this.productService.add(this.product);
  }
  saveAndNew(){

  }
}