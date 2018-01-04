import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {CATEGORIES} from "../../pages/shared/mock.categories";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {Events} from "ionic-angular";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
  activeCategory: any;
  categorySubject = new Subject<any>();
  constructor(public http: Http, private storage: LocalStorageProvider,private events:Events) {
    console.log('Hello CategoryProvider Provider');
    this.activeCategory = {id: 5, name: '默认类别'};
  }

  get() {
    return Promise.resolve(this.storage.get('Category', CATEGORIES));
  }

  set(Categories: any) {
    this.storage.set('Category', Categories);
  }

  updateActiveCategory(category):void {
    this.activeCategory.id = category.id;
    this.activeCategory.name = category.name;
    this.events.publish('category:update',this.activeCategory);
  }
  updateActiveCategory1(category):void {
    this.activeCategory.id = category.id;
    this.activeCategory.name = category.name;
    this.categorySubject.next(this.activeCategory);
  }
  getCategorySubject(){
    return this.categorySubject.asObservable();
  }

}

