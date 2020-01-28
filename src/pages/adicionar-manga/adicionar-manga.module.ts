import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarMangaPage } from './adicionar-manga';

@NgModule({
  declarations: [
    AdicionarMangaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarMangaPage),
  ],
})
export class AdicionarMangaPageModule {}
