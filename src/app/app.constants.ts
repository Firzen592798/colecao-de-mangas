import { Injectable } from "@angular/core";

@Injectable()
export class AppConstants {
  /*DESENVOLVIMENTO*/
  //public apiUrl = "http://localhost/index.php";
  public showAD = false;
  public isTestingAD = true;
  
  /*PRODUÇÃO*/
  public apiUrl = "https://colecaodemangas.000webhostapp.com/index.php";
  //public showAD = true;
  //public isTestingAD = false;
}