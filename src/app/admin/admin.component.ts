import { async } from '@angular/core/testing';
import { Candidato } from './../../../models/candidato.models';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../service/dados.service';
import { config } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service: DadosService, private router: Router, public datepipe: DatePipe) { }

  async ngOnInit(): Promise<void> {
    this.atualizarListaCandidatos();
    await this.votacaoEmCurso();

    if(!this.isVotacaoEmCurso){
      this.timeInicio.setMinutes(this.timeInicio.getMinutes() + (5 - this.timeInicio.getMinutes() % 5));
      this.timeFim.setMinutes(this.timeInicio.getMinutes() + 60);
    } else {
      await this.recuperarInfoVotacao();
    }
  }

  private _nome: string = "";
  private _numero: string = "";
  private _isVotacaoEmCurso: Boolean = false;
  private _isVotacaoTerminada: Boolean = false;
  private _isCandidatoInvalido: Boolean = false;
  private _isCandidatoExistente: Boolean = false;

  private _tipoEleicao: string = "";
  private _dtInicio: Date = new Date();
  private _timeInicio: Date = new Date();
  private _dtFim: Date = new Date();
  private _timeFim: Date = new Date();

  private _candidatos: Array<Candidato> = [];

  private isCandidatoNaoExistente(candidato: Candidato): Boolean{
    let candidatoExistente = this.candidatos.find(auxCand => auxCand._numero == candidato._numero);
    return candidatoExistente == undefined;
  }

  private atualizarListaCandidatos(){
    this.service.getAllCandidatos().subscribe(auxCandidatos =>{
      this.candidatos = auxCandidatos == undefined ? [] : auxCandidatos;
    });
  }

  private async votacaoEmCurso(): Promise<void> {
    let promice = await this.votacaoPromice();
    this.isVotacaoEmCurso = promice.isVotacaoCurso;
  }

  private votacaoPromice(): Promise<any> {
    return this.service.getStatusVotacao().toPromise();
  }

  private async recuperarInfoVotacao(): Promise<void> {
    let resposta = await this.recuperarInfoPromice();

    this.dtInicio = new Date(resposta.dtInicio);
    this.dtInicio.setDate(this.dtInicio.getDate() + 1);

    this.timeInicio = this.getHorasByString(this.timeInicio, resposta.timeInicio);

    this.dtFim = new Date(resposta.dtFim);
    this.dtFim.setDate(this.dtFim.getDate() + 1);

    this.timeFim = this.getHorasByString(this.timeFim, resposta.timeInicio);

    this.tipoEleicao = resposta.tipoEleicao;
  }

  private recuperarInfoPromice(): Promise<any> {
    return this.service.getInfoVotacao().toPromise();
  }

  private getHorasByString(time: Date, horas: string): Date{
    time.setHours(Number(horas.split(":")[0]));
    time.setMinutes(Number(horas.split(":")[1]));

    return time;
  }

  private getDadosForm(): any{
    let dados = {
      _tipoEleicao: this.tipoEleicao,
      _dtInicio:  this.formatarData(this.dtInicio),
      _timeInicio: this.timeInicio,
      _dtFim: this.formatarData(this.dtFim),
      _timeFim: this.timeFim
    }

    return dados;
  }

  public formatarTime(time: Date): string | null {
    return this.datepipe.transform(time, "HH:mm");
  }

  private formatarData(data: Date): string | null{
    return this.datepipe.transform(data, "yyyy-MM-dd");
  }

  public adicionarCandidato(){
    let nome = this.nome.trim();
    let numero = isNaN(Number(this.numero)) ? 0 : Number(this.numero)
    let candidato: Candidato = { _nome: nome, _numero: numero };

    if(nome == "" || numero == 0){
      this.isCandidatoInvalido = true;

      setTimeout(() => {
        this.isCandidatoInvalido = false;
      }, 2000);
    } else if(this.isCandidatoNaoExistente(candidato)){

      this.service.enviarCandidato(candidato).subscribe(() => {
        this.atualizarListaCandidatos();
        this.limparTela();
      });
    } else{
      this.isCandidatoExistente = true;

      setTimeout(() => {
        this.isCandidatoExistente = false;
      }, 2000);
    }
  }

  public salvarTimeInicio(time: string){
    this.timeInicio = this.getHorasByString(new Date(), time);
  }

  public salvarTimeFim(time: any){
    this.timeFim = this.getHorasByString(new Date(), time);
    return this.timeFim;
  }

  public configurarEleicao(){
    let config = this.getDadosForm();

    this.service.configEleicao(config).subscribe(async resultado => {
      await this.votacaoEmCurso();
      this.service.alterarLocalStorage("espera", "false")
      this.service.alterarLocalStorage("votacao","false")
      this.service.alterarLocalStorage("resultado","false")
      this.router.navigate(["/", "votacao"])
    })
  }

  public cancelarEleicao(){
    this.service.cancelarEleicao().subscribe(resposta => {
      this.isVotacaoEmCurso = false;
      window.location.href = "/admin";
    });
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

  public mutarButao(): string{
    let qtdCandidatos: number = this.candidatos.length == undefined ? 0 : this.candidatos.length;

    return qtdCandidatos >= 3 ? "nav-link" : "nav-link text-muted";
  }

  public limparTela(): void {
    this.nome = "";
    this.numero = "";
  }

  public get nome(): string  {
		return this._nome;
	}

	public set nome(value: string ) {
		this._nome = value;
	}

  public get numero(): string  {
		return this._numero;
	}

  public set numero(value: string ) {
		this._numero = value;
	}

  public get isVotacaoEmCurso(): Boolean  {
		return this._isVotacaoEmCurso;
	}

  public set isVotacaoEmCurso(value: Boolean ) {
		this._isVotacaoEmCurso = value;
	}

	public get isVotacaoTerminada(): Boolean  {
		return this._isVotacaoTerminada;
	}

	public set isVotacaoTerminada(value: Boolean ) {
		this._isVotacaoTerminada = value;
	}

	public get isCandidatoInvalido(): Boolean  {
		return this._isCandidatoInvalido;
	}

	public set isCandidatoInvalido(value: Boolean ) {
		this._isCandidatoInvalido = value;
	}

	public get isCandidatoExistente(): Boolean  {
		return this._isCandidatoExistente;
	}

  public set isCandidatoExistente(value: Boolean ) {
		this._isCandidatoExistente = value;
	}

	public get tipoEleicao(): string  {
		return this._tipoEleicao;
	}

	public set tipoEleicao(value: string ) {
		this._tipoEleicao = value;
	}

	public get dtInicio(): Date  {
		return this._dtInicio;
	}

	public set dtInicio(value: Date ) {
		this._dtInicio = value;
	}

	public get timeInicio(): Date  {
		return this._timeInicio;
	}

	public set timeInicio(value: Date ) {
		this._timeInicio = value;
	}


	public get dtFim(): Date  {
		return this._dtFim;
	}

	public set dtFim(value: Date ) {
		this._dtFim = value;
	}


	public get timeFim(): Date  {
		return this._timeFim;
	}

	public set timeFim(value: Date ) {
		this._timeFim = value;
	}

	public get candidatos(): Array<Candidato>  {
		return this._candidatos;
	}

	public set candidatos(value: Array<Candidato> ) {
		this._candidatos = value;
	}
}
