//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenticationCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationCodeProvider {
  //用于保存验证码
  private code:string;
  //存放验证码的过期时间
  private deadline:number;
  constructor() {
    console.log('Hello AuthenticationCodeProvider Provider');
    this.code = '';
  }
  //生成指定长度的随机数字
  createCode(count:number):string{
    this.code = '';
    this.deadline = Date.now() + 60 * 10 * 1000;
    for(let i = 0; i < count; i++){
      let num =Math.floor(Math.random() * 10);
      this.code += num.toString();
    }
    return this.code;
  }
  //验证用户输入的短信验证码是否一致，是否过期
  validate(value:string){
    let now = Date.now();
    return value==this.code && now < this.deadline;
  }
}
