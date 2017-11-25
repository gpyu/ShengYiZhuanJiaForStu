import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {
  private storage = window.localStorage;
  constructor() {
    console.log('Hello LocalStorageProvider Provider');
  }


  get (key:string, defaultValue:any):any{
    let value:any = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    }catch (error){
      value = null;
    }
    if(value==null && defaultValue){
      value = defaultValue;
    }
    return value;
  }

  set (key:string, value:any){
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove (key:string){
    this.storage.removeItem(key);
  }


}
