import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {ToastProvider} from "../../providers/toast/toast";
import {Category} from "../shared/category";

/**
 * Generated class for the CategoryAddSubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-add-sub',
  templateUrl: 'category-add-sub.html',
})
export class CategoryAddSubPage {

  categories:Array<Category>;

  currentCategoryId:number;
  currentCategoryChildrenSize:number;

  subCategory:Category;
  subCategoriesList:Array<Category> = [];
  subCategoriesLength:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryService: CategoryProvider, private toastProvider:ToastProvider) {
    categoryService.get().then((data)=>{
      this.categories = data;
      this.subCategoriesLength = 0;
      this.currentCategoryId = navParams.get('id');
      this.currentCategoryChildrenSize = this.categories[this.currentCategoryId].children.length;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryAddSubPage');
    this.addSubCategory();
  }

  addSubCategory(){
    let sub:Category = {
      id:(this.currentCategoryId + 1) * 10 + this.subCategoriesLength + 1 + this.currentCategoryChildrenSize,
      name:'',
      children:[]
    };
    this.subCategory = sub;
    this.subCategoriesList.push(this.subCategory);
    this.subCategoriesLength += 1;
  }

  save(){
    let i:number;
    for(i=0;i<this.subCategoriesLength;i++){
      if(this.subCategoriesList[i].name == '' || this.subCategoriesList[i].name == null){
        this.toastProvider.show('每个小分类名称都不能为空','error');
        return;
      }
      else{
        this.categories[this.currentCategoryId].children.push(this.subCategoriesList[i]);
      }
    }
    this.categoryService.set(this.categories);
    this.toastProvider.show('添加商品小分类成功','success');
    this.navCtrl.pop();
  }
}
