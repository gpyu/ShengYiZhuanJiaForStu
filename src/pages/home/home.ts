import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todayNumData = {
    num1:0,
    num2:0,
    num3:0,
    num1add:0,
    num2add:0,
    num3add:0
  }

  constructor(public navCtrl: NavController,
              private storage:LocalStorageProvider) {
    let lastDayNum = storage.get("todayNum",null);
    let newNum = {
      num1:100*Math.random(),
      num2:1000*Math.random(),
      num3:10000*Math.random(),
      num1add:0,
      num2add:0,
      num3add:0,
    }

   if(null==lastDayNum){
      console.log(1)
     this.todayNumData = newNum;
     storage.set('todayNum',newNum);
   }else{
     console.log(2)
     let temp = {
       num1:100*Math.random(),
       num2:1000*Math.random(),
       num3:10000*Math.random(),
       num1add:0,
       num2add:0,
       num3add:0,
     }
    let nowNum = {
      num1:temp.num1,
      num2:temp.num2,
      num3:temp.num3,
      num1add:temp.num1 - lastDayNum.num1,
      num2add:temp.num2 - lastDayNum.num2,
      num3add:temp.num3 - lastDayNum.num3,
    }
     this.todayNumData = nowNum;
     storage.set('todayNum',nowNum);
   }
  }
  }
