import { DadosService } from './../service/dados.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'models/admin.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  senha: string = "";
  isLoginInvalido: boolean = false;

  constructor(private service: DadosService, private router: Router ) { }

  public logar(){

    this.service.verificarLogin(this.usuario, this.senha).subscribe((dadosAcesso: any) => {
      if(dadosAcesso.autorizado){
        this.router.navigate(["/", "admin"])
        localStorage.removeItem("isLogado");
        localStorage.setItem("isLogado", "true");
      }
      else{
        localStorage.removeItem("isLogado");
        localStorage.setItem("isLogado", "false");
        this.isLoginInvalido = true;
      }
    })
  }

  public isLogado(){
    if (localStorage.getItem("isLogado") == "true") {
      this.router.navigate(["/", "admin"])
    }
    return false
  }

  ngOnInit() {
  }

}
