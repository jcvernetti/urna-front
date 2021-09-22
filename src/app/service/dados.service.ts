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

  constructor(private httpClient: HttpClient) { }

  private url = "http://localhost:8080/"

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

  public get isLogado(): boolean {
    return this._isLogado;
  }
  public set isLogado(value: boolean) {
    this._isLogado = value;
  }
}
