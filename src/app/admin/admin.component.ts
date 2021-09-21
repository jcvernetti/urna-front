import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../service/dados.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: DadosService, private router: Router) { }

  nome: string = "";
  numero: number = 0;
  resultado: any;

  tipoEleicao: string = "";
  dtInicio: Date = new Date();
  timeInicio: Date = new Date();
  dtFim: Date = new Date();
  timeFim: Date = new Date();

  public adicionarCandidato(){
    let candidato ={
      nome: this.nome,
      numero: this.numero
    }
    this.service.enviarCandidato(candidato).subscribe(resultado =>{
      this.resultado = resultado
    })

  }

  public configurarEleicao(){
    let config = {
      tipoEleicao: this.tipoEleicao,
      dtInicio: this.dtInicio,
      timeInicio: this.timeInicio,
      dtFim: this.dtFim,
      timeFim: this.timeFim
    }

    this.service.configEleicao(config).subscribe(resultado => {
      console.log(resultado);
      this.router.navigate(["/", "votacao"])
    })
  }

  public isLogado(){
    if (localStorage.getItem("isLogado") != "true") {
      this.router.navigate(["/", "login"])
    }
    return true
  }

  public sair(){
    localStorage.removeItem("isLogado");
    localStorage.setItem("isLogado", "false");
    this.router.navigate(["/", "login"])
  }

  ngOnInit() {
  }

}
