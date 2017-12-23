import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Category} from "../shared/category";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
  categories:Category[];
  activeCategory:Category;
  activeSubCategory:Category;
  activeSubCategories:Category[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService:CategoryProvider,public actionSheetCtrl: ActionSheetController ) {
    categoryService.get().then((data)=>{
      this.categories = data;
      this.activeCategory = this.categories[0];
    }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }
  selectCategory(category){
    this.activeCategory = category;
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '编辑分类',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
