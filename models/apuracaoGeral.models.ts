import { Apuracao } from "./apuracao.models";

export interface ApuracaoGeral {
  _nulos: number;
  _brancos: number;
  _validos: Array<Apuracao>;
  _totalValidos: number;
  _total: number;

}
