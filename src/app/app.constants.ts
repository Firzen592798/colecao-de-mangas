import { Injectable } from "@angular/core";

@Injectable()
export class AppConstants {
  /*DESENVOLVIMENTO*/
  //public apiUrl = "http://localhost/index.php";
  public apiUrl = "http://10.7.56.10/index.php";
  public showAD = false;
  public isTestingAD = true;
  public tamanhoSenha = 3;
  /*PRODUÇÃO*/
  //public apiUrl = "https://colecaodemangas.000webhostapp.com/index.php";
  //public showAD = true;
  //public isTestingAD = false;
  //public tamanhoSenha = 6;
}