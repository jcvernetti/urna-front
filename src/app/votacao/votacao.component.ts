import { Candidato } from './../../../models/candidato.models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosService } from '../service/dados.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.scss']
})
export class VotacaoComponent implements OnInit {

  nomeCandidato: string = "";
  numeroCandidato: string = "";
  private _elementoDesabilitado: Boolean = false;
  private _candidatos: Array<Candidato> = [];
  dataTime: Date = new Date();

  constructor(private service: DadosService, private router: Router) { }

  ngOnInit() {
    this.service.getAllCandidatos().subscribe((auxCandidatos: Array<Candidato>) => {
      this.candidatos = auxCandidatos;
    });
    this.getFimVotacao()
    this.getInicioVotacao()
  }

  public get candidatos(): Array<Candidato>  {
		return this._candidatos;
	}

	public set candidatos(value: Array<Candidato> ) {
		this._candidatos = value;
	}

  public get elementoDesabilitado(): Boolean  {
		return this._elementoDesabilitado;
	}

  public set elementoDesabilitado(value: Boolean ) {
		this._elementoDesabilitado = value;
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
    this.nomeCandidato = this.nomeCandidato == undefined ? "Nulo": this.nomeCandidato;
    this.numeroCandidato =  isNaN(Number(this.numeroCandidato)) ? "-1": this.numeroCandidato;
    let dataVoto: Date = new Date();

    let voto: object = {nomeCandidato: this.nomeCandidato, numeroCandidato: Number(this.numeroCandidato), dataVoto};

    this.enviarVoto(voto);
  }

  public votarBranco(){
    this.nomeCandidato = "Branco";
    this.numeroCandidato = "0";
    let dataVoto: Date = new Date();

    let voto: object = {nomeCandidato: this.nomeCandidato, numeroCandidato: Number(this.numeroCandidato), dataVoto};

    this.enviarVoto(voto);
  }

  private enviarVoto(voto: Object): void{
    this.elementoDesabilitado = true;

    setTimeout(() => {
      this.service.enviarVoto(voto).subscribe((resposta) => {
        console.log(resposta);
      });

      this.limparTela();
      this.elementoDesabilitado = false ;
    }, 2000);
  }

  public limparTela(){
    this.nomeCandidato = "";
    this.numeroCandidato = "";
  }

  public getInicioVotacao(){
    this.service.getInicioVotacao().subscribe(resultado => {
      this.dataTime = new Date(`${resultado.dtInicio} ${resultado.timeInicio}`)

      let timeDif = this.dataTime.valueOf() - new Date().valueOf()
      console.log(timeDif);
      if (timeDif > 0 ) {
        this.service.alterarLocalStorage("espera", "true")
        setTimeout(() => {
          console.log("votacao iniciada");

          this.service.alterarLocalStorage("espera", "false")
          this.service.alterarLocalStorage("votacao","true")
          this.service.alterarLocalStorage("resultado","false")
        }, timeDif);
      }
    })
  }

  public getFimVotacao(){
    this.service.getFimVotacao().subscribe(resultado => {
      let dataTime = new Date(`${resultado.dtFim} ${resultado.timeFim}`)
      let timeDif = dataTime.valueOf() - new Date().valueOf()
      setTimeout(() => {
        this.service.alterarLocalStorage("espera", "false")
        this.service.alterarLocalStorage("votacao","false")
        this.service.alterarLocalStorage("resultado","true")
      }, timeDif);
    })
  }

  public isEspera(){
    return localStorage.getItem("espera") == "true"
  }

  public isVotacao(){
    return localStorage.getItem("votacao") == "true"
  }

  public isResultado(){
    return localStorage.getItem("resultado") == "true"
  }
}
