import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
  ],
})
export class ProductListPageModule {}
