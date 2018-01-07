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

  activeSubCategoriesLength:number;
  activeCategoryId:number;

  isFirstEnter:boolean;
  categoryToAdd:Category;
  subCategoriesLength:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoryService: CategoryProvider, public actionSheetCtrl: ActionSheetController) {
    categoryService.get().then((data)=>{
      this.categories = data;
      this.activeCategory = this.categories[0];
      this.subCategoriesLength = 0;
      this.categoryToAdd = {
        id:this.categories.length + 1,
        name:'',
        children:[]
      };
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
    this.isFirstEnter = false;
    console.log(this.navCtrl.getPrevious().name)
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

  /**
   * 选择大类别
   * @param {Category} category
   */
  selectCategory(category:Category){
    this.activeCategory = category;
    this.activeCategoryId = category.id;
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
  /**
   * 使用Events
   * 选择小类别
   */
  selectSubCategory(category:Category){
    console.log(category.id)
    if(null == category){
      category = this.categories[0];
    }
    this.categoryService.updateActiveCategory(category);
    this.activeSubCategory = category;
    this.navCtrl.pop();
  }

  /**
   * 使用subject
   * @param {Category} category
   */
  selectSubCategory1(category:Category){
    this.categoryService.updateActiveCategory1(category)
    this.activeSubCategory = category;
    this.navCtrl.pop();
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
