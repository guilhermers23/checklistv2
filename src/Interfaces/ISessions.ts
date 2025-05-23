import { ITeste } from "./ITestes";
import { IUser } from "./IUser";

export interface IDadosSessao {
  _id?: string;
  grupo: string;
  subGrupo: string;
  tecnico: IUser;
  testes: ITeste[];
  dataFim?: string;
  dataInicio?: string;
}
