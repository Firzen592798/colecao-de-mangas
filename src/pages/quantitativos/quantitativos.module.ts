import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuantitativosPage } from './quantitativos';

@NgModule({
  declarations: [
    QuantitativosPage,
  ],
  imports: [
    IonicPageModule.forChild(QuantitativosPage),
  ],
})
export class QuantitativosPageModule {}
