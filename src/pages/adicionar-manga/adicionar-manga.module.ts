import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { AdicionarMangaPage } from './adicionar-manga';

@NgModule({
  declarations: [
    AdicionarMangaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarMangaPage),
    IonicImageLoader.forRoot(),
  ],
})
export class AdicionarMangaPageModule {}
