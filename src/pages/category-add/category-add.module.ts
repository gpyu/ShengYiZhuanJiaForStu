import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAddPage } from './category-add';

@NgModule({
  declarations: [
    CategoryAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAddPage),
  ],
})
export class CategoryAddPageModule {}
