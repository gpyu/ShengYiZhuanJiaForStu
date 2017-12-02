import {Component, Input} from '@angular/core';
/**
 * Generated class for the CopyrightComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'copyright',
  templateUrl: 'copyright.html'
})
export class CopyrightComponent {
  @Input()bottom:string;
  text: string;

  constructor() {
    console.log('Hello CopyrightComponent Component');
    let year = (new Date()).getFullYear();
    this.text = `2010-${year} 生意专家`;
    this.bottom = '20px';
  }

}
