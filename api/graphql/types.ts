export type Ator = {
    id: number;
    nome: string;
    dataNascimento: string;
    nacionalidade?: string;
}

export type Genero = {
    id: number;
    nome: string;
}

export type Filme = {
    id: number;
    titulo: string;
    diretor: string;
    anoLancamento: number;
}

export type FilmeAtor = {
    filmeId: number;
    atorId: number;
}

export type FilmeGenero = {
    filmeId: number;
    generoId: number;
}

export type CriarFilmeInput = {
    titulo: string;
    diretor: string;
    anoLancamento: number;
    generoIds: number[];
    atorIds: number[];
}

export type AtorInput = {
    nome: string;
    dataNascimento: string;
    nacionalidade?: string;
}

export type GeneroInput = {
    nome: string;
}
