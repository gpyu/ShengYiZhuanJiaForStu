import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {Category} from "../shared/category";
import {ToastProvider} from "../../providers/toast/toast";

/**
 * Generated class for the CategoryAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-add',
  templateUrl: 'category-add.html',
})
export class CategoryAddPage {

  categories:Array<Category>;

  categoryToAdd:Category;
  subCategory:Category;
  subCategoriesList:Array<Category>;
  subCategoriesLength:number;

  constructor(private toastProvider:ToastProvider,public navCtrl: NavController, public navParams: NavParams, private categoryService: CategoryProvider) {
    categoryService.get().then((data)=>{
      this.categories = data;
      this.subCategoriesLength = 0;
      this.categoryToAdd = {
        id:this.categories.length + 1,
        name:'',
        children:[]
      };
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryAddPage');
    this.addSubCategory();
  }

  addSubCategory(){
    let sub:Category = {
      id:this.categoryToAdd.id * 10 + this.subCategoriesLength + 1,
      name:'',
      children:[]
    };
    this.subCategory = sub;
    this.categoryToAdd.children.push(this.subCategory);
    this.subCategoriesList = this.categoryToAdd.children;
    this.subCategoriesLength += 1;
  }

  save(){
    if(this.categoryToAdd.name == '' || this.categoryToAdd.name == null){
      this.toastProvider.show("请输入大分类名称","success");
    }
    else{
      let i:number;
      for(i=0;i<this.subCategoriesLength;i++){
        if(this.subCategoriesList[i].name == '' || this.subCategoriesList[i].name == null){
          this.toastProvider.show("每个小分类名称都不能为空","error");
          return;
        }
        else{
          this.categoryToAdd.children[i].name = this.subCategoriesList[i].name;
        }
      }
      this.categories.push(this.categoryToAdd);
      this.categoryService.set(this.categories);
      this.toastProvider.show("添加商品分类成功","success");
      this.navCtrl.pop();
    }
  }

}
