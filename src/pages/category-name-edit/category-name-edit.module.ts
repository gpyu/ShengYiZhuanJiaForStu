import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryNameEditPage } from './category-name-edit';

@NgModule({
  declarations: [
    CategoryNameEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryNameEditPage),
  ],
})
export class CategoryNameEditPageModule {}
