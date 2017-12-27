import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {CategoryAddPage} from "../category-add/category-add";
import {CategoryAddSubPage} from "../category-add-sub/category-add-sub";
import {CategoryEditPage} from "../category-edit/category-edit";
import {Category} from "../shared/category";

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
  categories:Array<Category>;
  activeCategory:Category;
  activeSubCategories:Array<Category>;
  activeSubCategory:Category;

  categoriesLength:number;
  activeSubCategoriesLength:number;
  activeCategoryId:number;

  isFirstEnter:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryService: CategoryProvider, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
    this.isFirstEnter = false;
  }

  ionViewDidEnter(){
    this.refresh();
    this.isFirstEnter = true;
  }

  presentActionSheet(mtitle:string){
    let actionSheet = this.actionSheetCtrl.create({
      title: mtitle,
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            this.gotoAddSubCategory();
          }
        },{
          text: '编辑分类',
          handler: () => {
            this.gotoEditSubCategory();
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

  selectCategory(category:Category){
    this.activeCategory = category;
    let i:number;
    for(i=0;i<this.categories.length;i++){
      if(this.activeCategory.id == this.categories[i].id) {
        this.activeCategoryId = i;
        this.activeSubCategories = this.categories[i].children;
        this.activeSubCategoriesLength = this.activeSubCategories.length;
        break;
      }
    }
  }

  gotoAddSubCategory(){
    this.navCtrl.push(CategoryAddSubPage,{
      id:this.activeCategoryId,
      name:this.categories[this.activeCategoryId].name
    });
  }

  gotoEditSubCategory(){
    this.navCtrl.push(CategoryEditPage,{
      id:this.activeCategoryId,
      name:this.categories[this.activeCategoryId].name
    });
  }

  gotoAddCategory(){
    this.navCtrl.push(CategoryAddPage);
  }

  selectSubCategory(category:Category){
    this.activeSubCategory = category;
    this.navCtrl.pop();
  }

  refresh(){
    if(!this.isFirstEnter){
      this.categoryService.get().then((data)=>{
        this.categories = data;
        this.activeCategoryId = 0;
        this.activeSubCategories = this.categories[0].children;
        this.activeSubCategoriesLength = this.activeSubCategories.length;
      })
    }
    else{
      this.categoryService.get().then((data)=>{
        this.categories = data;
        this.activeSubCategories = this.categories[this.activeCategoryId].children;
        this.activeSubCategoriesLength = this.activeSubCategories.length;
      })
    }
  }
}
