import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAddSubPage } from './category-add-sub';

@NgModule({
  declarations: [
    CategoryAddSubPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAddSubPage),
  ],
})
export class CategoryAddSubPageModule {}
