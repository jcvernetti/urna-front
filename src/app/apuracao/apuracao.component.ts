import { DadosService } from './../service/dados.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apuracao',
  templateUrl: './apuracao.component.html',
  styleUrls: ['./apuracao.component.css']
})
export class ApuracaoComponent implements OnInit {

  constructor(private service: DadosService) { }

  

  ngOnInit() {
  }

}
