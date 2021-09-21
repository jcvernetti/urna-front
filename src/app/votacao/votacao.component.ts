import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosService } from '../service/dados.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {

  constructor(private service: DadosService, private router: Router) { }


  public isLogado(){

    return localStorage.getItem("isLogado") == "true";

  }

  ngOnInit() {
  }

}
