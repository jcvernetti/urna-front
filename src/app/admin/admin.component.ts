import { Component, OnInit } from '@angular/core';
import { DadosService } from '../service/dados.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: DadosService) { }

  nome: string = "";
  numero: number = 0;

  public adicionarCandidato(){
    let candidato ={
      nome: this.nome,
      numero: this.numero
    }
    this.service.enviarCandidato(candidato).subscribe(resultado =>{
      console.log(resultado);

    })

  }





  ngOnInit() {
  }

}
