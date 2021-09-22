import { Candidato } from './../../../models/candidato.models';
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
  resultado: any = 0;

  tipoEleicao: string = "";
  dtInicio: Date = new Date();
  timeInicio: Date = new Date();
  dtFim: Date = new Date();
  timeFim: Date = new Date();

  public adicionarCandidato(){
    let candidato: Candidato ={
      _nome: this.nome,
      _numero: this.numero
    }
    this.service.enviarCandidato(candidato).subscribe(resultado =>{
      this.resultado = resultado;
      setTimeout(()=>{
        this.resultado = "";
    }, 1000);
      //console.log(this.resultado.mensagem);
    })

  }



  public configurarEleicao(){
    let config = {
      _tipoEleicao: this.tipoEleicao,
      _dtInicio: this.dtInicio,
      _timeInicio: this.timeInicio,
      _dtFim: this.dtFim,
      _timeFim: this.timeFim
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
