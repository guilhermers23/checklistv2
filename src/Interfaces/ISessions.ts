import { ITeste } from "./ITestes";

export interface IDadosSessao {
  _id?: string;
  grupoId: string;
  subGrupoId: string;
  tecnico: string | undefined;
  testes: ITeste[];
}
