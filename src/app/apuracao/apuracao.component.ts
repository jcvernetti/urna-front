import { Apuracao } from './../../../models/apuracao.models';
import { ApuracaoGeral } from './../../../models/apuracaoGeral.models';
import { DadosService } from './../service/dados.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apuracao',
  templateUrl: './apuracao.component.html',
  styleUrls: ['./apuracao.component.css']
})
export class ApuracaoComponent implements OnInit {

 apuracao: ApuracaoGeral = {_validos: [], _nulos: 0, _brancos: 0, _total: 0, _totalValidos: 0};

  constructor(private service: DadosService) { }

  ngOnInit() {
    this.service.getApuracaoGeral().subscribe((resultado: ApuracaoGeral) => {
      this.apuracao = resultado;
      this.apuracao._validos = this.apuracao._validos.sort(this.ordenarpuracao)

      console.log(this.apuracao._validos);
    })
  }

  public ordenarpuracao(a: any,b:any): number{
    if (a._qtde > b._qtde){
      return -1
    }
    if(b._qtde > a._qtde){
      return 1
    }
    else return 0
  }

}
