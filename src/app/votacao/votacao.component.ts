import { Candidato } from './../../../models/candidato.models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosService } from '../service/dados.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {

  nomeCandidato: string = "";
  numeroCandidato: string = "";
  private elementoDesabilitado: Boolean = false;
  private _candidatos: Array<Candidato> = [];

  constructor(private service: DadosService, private router: Router) { }

  ngOnInit() {
    this.service.getAllCandidatos().subscribe((auxCandidatos: Array<Candidato>) => {
      this.candidatos = auxCandidatos;
    });
  }

  public get candidatos(): Array<Candidato>  {
		return this._candidatos;
	}

	public set candidatos(value: Array<Candidato> ) {
		this._candidatos = value;
	}

  public getNomeCandidato(){
    let auxCandidato: any = this.candidatos.find(candidato => candidato._numero == Number(this.numeroCandidato));

    if(this.numeroCandidato == "") {
      this.nomeCandidato = "";
    } else {
      this.nomeCandidato = auxCandidato == undefined ? "Candidao não encontrado": auxCandidato._nome;
    }
  }

  public isLogado(){
    return localStorage.getItem("isLogado") == "true";
  }

  public votar(){
    let nome: string = this.nomeCandidato == undefined ? "Nulo": this.nomeCandidato;
    let numero: number =  isNaN(Number(this.numeroCandidato)) ? -1: Number(this.numeroCandidato);
    let dataVoto: Date = new Date();

    let voto: object = {nomeCandidato: nome, numeroCandidato: numero, dataVoto};
    
    this.enviarVoto(voto);
  }

  private enviarVoto(voto: Object): void{
    this.service.enviarVoto(voto).subscribe((resposta) => {
      console.log(resposta);
    });
  }

  public limparTela(){
    this.nomeCandidato = "";
    this.numeroCandidato = "";
  }
}
