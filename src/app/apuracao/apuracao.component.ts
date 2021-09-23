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
 porcentagemBrancos: number = 0;
 porcentagemNulos: number = 0;


  constructor(private service: DadosService) { }

  ngOnInit() {
    this.service.getApuracaoGeral().subscribe((resultado: ApuracaoGeral) => {
      this.apuracao = resultado;
      this.apuracao._validos = this.apuracao._validos.sort(this.ordenarApuracao)

      console.log(this.apuracao._validos);

      this.porcentagemBrancos = this.calcularPorcentagem(this.apuracao._brancos)
      this.porcentagemNulos = this.calcularPorcentagem(this.apuracao._nulos)
    })
  }


  private ordenarApuracao(a: any,b:any): number{
    if (a._qtde > b._qtde){
      return -1
    }
    if(b._qtde > a._qtde){
      return 1
    }
    else return 0
  }

  private calcularPorcentagem(voto: number): number{
    let tipoVoto = voto
    let porcentagem = (tipoVoto/ this.apuracao._total) * 100
    return porcentagem
  }

}
