declare interface IGrupo {
  _id?: string;
  nome: string;
};

declare interface ISubGrupo {
  _id?: string;
  nome: string;
  grupoId: string; // Assumindo que 'grupo' é uma referência ao ID do grupo
  grupo?: IGrupo;
};

declare interface ITeste {
  _id: string;
  grupo: IGrupo;
  subGrupo: ISubGrupo;
  description: string;
  resultado: string;
  completed?: string[];
  observacao?: string;
  files: string;
};

declare interface IUser {
  _id?: string;
  name: string;
  email: string;
  readonly password: string;
  admin?: boolean;
};

declare interface IDadosSessao {
  _id?: string;
  grupo: string;
  subGrupo: string;
  tecnico: IUser;
  testes: ITeste[];
  dataInicio: string;
  dataFim: string;
};
