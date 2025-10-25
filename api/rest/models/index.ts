export interface Filme {
  id: number;
  titulo: string;
  anoLancamento: number;
  generoId: number;
}

export interface Ator {
  id: number;
  nome: string;
  dataNascimento: string;
}

export interface Genero {
  id: number;
  nome: string;
}

export interface FilmeAtor {
  filmeId: number;
  atorId: number;
}