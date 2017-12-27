import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CATEGORIES} from "../../pages/shared/mock.categories";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {HttpClient} from "@angular/common/http";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(public http: Http,private storage:LocalStorageProvider,) {
    console.log('Hello CategoryProvider Provider');
  }

  get(){
    return Promise.resolve(this.storage.get('Category', CATEGORIES));
  }

  set(Categories:any){
    this.storage.set('Category',Categories);
  }

}
