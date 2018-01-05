import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Product} from "../../pages/shared/product";
import {AlertController} from "ionic-angular";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {UUID} from 'angular2-uuid';
import {HomePage} from "../../pages/home/home";
/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  products :  Array<Product>=[];
  constructor(public http: Http, public alertCtrl: AlertController,private storage: LocalStorageProvider) {
    console.log('Hello ProductProvider Provider');
    this.products = storage.get("products",[]);
  }

  add(input: Product) {
    //return new Promise((resolve, reject) => {
    input.id = UUID.UUID();
    this.products.push(input);
    this.storage.set("products",this.products)
    //});


  }
}
