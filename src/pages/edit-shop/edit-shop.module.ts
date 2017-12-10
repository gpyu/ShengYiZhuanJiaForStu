import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShopPage } from './edit-shop';

@NgModule({
  declarations: [
    EditShopPage,
  ],
  imports: [
    IonicPageModule.forChild(EditShopPage),
  ],
})
export class EditShopPageModule {}
