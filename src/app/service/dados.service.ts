import { ApuracaoGeral } from './../../../models/apuracaoGeral.models';
import { Candidato } from '../../../models/candidato.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'models/admin.models';
import { Observable } from 'rxjs';
import { Iniciarvotacao } from 'models/iniciareleicao.models';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private _isLogado: boolean = false;
  private url = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public verificarLogin(usuario: string, senha: string): Observable<Admin[]>{
    return this.httpClient.post<Admin[]>(this.url + "login", {usuario, senha})
  }

  public enviarCandidato(candidato: Candidato): Observable<Object>{
    return this.httpClient.post<Object>(this.url+"candidatos", candidato)
  }

  public enviarVoto(voto: Object): Observable<object>{
    return this.httpClient.post<Object>(this.url + "votacao", voto);
  }

  public configEleicao(config: Iniciarvotacao): Observable<Object>{
    return this.httpClient.post<Object>(this.url + "iniciarvotacao", config)
  }

  public getAllCandidatos(): Observable<Array<Candidato>>{
    return this.httpClient.get<Array<Candidato>>(this.url + "candidatos",)
  }

  public getApuracaoGeral(): Observable<ApuracaoGeral>{
    return this.httpClient.get<ApuracaoGeral>(this.url + "apuracao")
  }

  public getInicioVotacao(): Observable<any>{
    return this. httpClient.get<any>(this.url + "datainicio")
  }

  public getFimVotacao(): Observable<any> {
    return this.httpClient.get<any>(this.url + "datafim")
  }

  public alterarLocalStorage(chave: string, valor: string){
    localStorage.removeItem(chave)
    localStorage.setItem(chave, valor)
  }

  public get isLogado(): boolean {
    return this._isLogado;
  }
  public set isLogado(value: boolean) {
    this._isLogado = value;
  }
}
