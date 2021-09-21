import { DadosService } from './../service/dados.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'models/admin.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: DadosService) { }

  usuario: string = "";
  senha: string = "";


  public logar(){

    this.service.verificarLogin(this.usuario, this.senha).subscribe((dadosAcesso: object) => {
      console.log(dadosAcesso);


    })


  }

  ngOnInit() {
  }

}
