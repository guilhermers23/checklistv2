import { ITeste } from "./ITestes";

export interface IDadosSessao {
  _id?: string;
  grupo: string;
  subgrupo: string;
  tecnico: string | undefined;
  testes: ITeste[];
  dataFim?: string;
  dataInicio?: string;
}
