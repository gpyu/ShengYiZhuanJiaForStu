import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {Category} from "../shared/category";
import {CategoryNameEditPage} from "../category-name-edit/category-name-edit";

/**
 * Generated class for the CategoryEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-edit',
  templateUrl: 'category-edit.html',
})
export class CategoryEditPage {

  categories:Array<Category>;
  activeSubCategories:Array<Category>;
  activeCategory:Category;

  activeCategoryId:number;
  activeSubCategoryId:number;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController, private categoryService:CategoryProvider, public alert:AlertController) {
    categoryService.get().then((data)=>{
      this.categories = data;
      this.activeCategoryId = navParams.get('id');
      this.activeCategory = this.categories[this.activeCategoryId];
      this.activeSubCategories = this.activeCategory.children;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryEditPage');
  }

  showConfirm(index:number) {
    let confirm = this.alert.create({
      title: '你确认要删除吗？',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: '确认',
          handler: () => {
            if(index == -1){
              this.categories.splice(this.activeCategoryId,1);
            }
            else{
              this.deleteCategory();
              this.categories[this.activeCategoryId].children.splice(index,1);
            }
          }
        }
      ]
    });
    confirm.present();
  }
  save(){
    this.categoryService.set(this.categories);
    this.viewCtrl.dismiss();
  }
  deleteCategory(){
  }
  presentModal(index:number) {
    if(index == -1) {
      let modal = this.modalCtrl.create(CategoryNameEditPage, {name: this.activeCategory.name});
      modal.onDidDismiss(data => {
        this.activeCategory.name = data.name;
        this.categories[this.activeCategoryId].name = this.activeCategory.name;
        this.categoryService.set(this.categories);
      });
      modal.present();
    }
    else{
      let modal = this.modalCtrl.create(CategoryNameEditPage, {name: this.activeSubCategories[index].name});
      modal.onDidDismiss(data => {
        this.activeSubCategories[index].name = data.name;
        this.categories[this.activeCategoryId].children[index].name = this.activeSubCategories[index].name;
        this.categoryService.set(this.categories);
      });
      modal.present();
    }
  }
}

