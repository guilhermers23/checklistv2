export interface IGrupo {
    _id: string;
    nome: string;
  }
  
  export interface ISubGrupo {
    _id: string;
    nome: string;
    grupo: string; // Assumindo que 'grupo' é uma referência ao ID do grupo
  }
  
  export interface ITeste {
    _id: string;
    grupo: IGrupo;
    subGrupo: ISubGrupo;
    description: string;
    resultado: string;
    completed: string[]; // Tipo 'any' por enquanto, ajuste conforme necessário
    observacao: string;
  }
