import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapitulosMangaPage } from './capitulos-manga';

@NgModule({
  declarations: [
    CapitulosMangaPage,
  ],
  imports: [
    IonicPageModule.forChild(CapitulosMangaPage),
  ],
})
export class CapitulosMangaPageModule {}
