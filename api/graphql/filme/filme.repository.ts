import { Filme, CriarFilmeInput } from "../types";

const filmes: Filme[] = [
    { id: 1, titulo: "Inception", diretor: "Christopher Nolan", anoLancamento: 2010 },
    { id: 2, titulo: "The Dark Knight", diretor: "Christopher Nolan", anoLancamento: 2008 },
    { id: 3, titulo: "Interstellar", diretor: "Christopher Nolan", anoLancamento: 2014 },
];

export function findAllFilmes(): Filme[] {
    return filmes;
}

export function findFilmeById(id: string): Filme | null {
    const filme = filmes.find((f) => f.id.toString() === id);
    return filme || null;
}

export function createFilme(filme: Omit<Filme, "id">): Filme {
    const index = filmes.length + 1;
    const newFilme: Filme = {
        id: index,
        ...filme,
    };
    filmes.push(newFilme);
    return newFilme; 
}

export function updateFilme(id: string, filmeData: CriarFilmeInput): Filme | null {
    const filmeIndex = filmes.findIndex((f) => f.id.toString() === id);
    if (filmeIndex === -1) {
        return null;
    }
    const updatedFilme = { ...filmes[filmeIndex], ...filmeData };
    filmes[filmeIndex] = updatedFilme;
    return updatedFilme;
}

export function deleteFilme(id: string): boolean {
    const filmeIndex = filmes.findIndex((f) => f.id.toString() === id);
    if (filmeIndex === -1) {
        return false;
    }
    filmes.splice(filmeIndex, 1);
    return true;
}