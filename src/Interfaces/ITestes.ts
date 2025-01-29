export interface IGrupo {
    _id?: string;
    nome: string;
  }
  
  export interface ISubGrupo {
    _id?: string;
    nome: string;
    grupoId: string; // Assumindo que 'grupo' é uma referência ao ID do grupo
    grupo?: IGrupo
  }
  
  export interface ITeste {
    _id: string;
    grupo: IGrupo;
    subGrupo: ISubGrupo;
    description: string;
    resultado: string;
    completed: string[];
    observacao: string;
  }
