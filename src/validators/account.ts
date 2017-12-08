import {FormControl} from '@angular/forms';

export class AccountValidator {

  static isValid(control: FormControl) {

    if (control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
      return null;
    }

    if (control.value.match(/^1[3|4|5|7|8][0-9]{9}$/)) {
      return null;

    }

    return {invalidAccount: true};
  }

  static isPhoneValid(control: FormControl) {


    if (control.value.match(/^1[3|4|5|7|8][0-9]{9}$/)) {
      return null;

    }

    return {invalidAccount: true};
  }

  static isEmailValid(control: FormControl) {


    if (control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
      return null;

    }

    return {invalidAccount: true};
  }

  static isPasswordValid(control: FormControl) {


    if (control.value.match(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/)) {
      return null;

    }

    return {invalidAccount: true};
  }

  static isEqual(control: FormControl) {

    if (control.value == control.root.value['confirmPassword']) {
      console.log('passwords  match');
      return null;
    } else {
      return { isEqual: true };
    }
  }

  static isShopNameValid(control: FormControl) {


    if (control.value.match(/^[\s\S]{1,8}$/)) {
      return null;

    }

    return {invalidAccount: true};
  }


}
