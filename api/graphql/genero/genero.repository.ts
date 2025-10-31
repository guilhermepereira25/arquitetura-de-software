import { Genero, GeneroInput } from "../types.js";

const generos: Genero[] = [
    { id: 1, nome: "Ação" },
    { id: 2, nome: "Ficção Científica" },
    { id: 3, nome: "Drama" },
];

export function findAllGeneros(): Genero[] {
    return generos;
}

export function findGeneroById(id: string): Genero | null {
    const genero = generos.find((g) => g.id.toString() === id);
    return genero || null;
}

export function createGenero(generoData: GeneroInput): Genero {
    const newGenero: Genero = {
        id: generos.length + 1,
        ...generoData,
    };
    generos.push(newGenero);
    return newGenero;
}

export const findAllGenerosByIds = (ids: number[]): Genero[] => {
    return generos.filter(genero => ids.includes(genero.id));
}

export function updateGenero(id: string, generoData: GeneroInput): Genero | null {
    const generoIndex = generos.findIndex((g) => g.id.toString() === id);
    if (generoIndex === -1) {
        return null;
    }
    const updatedGenero = { ...generos[generoIndex], ...generoData };
    generos[generoIndex] = updatedGenero;
    return updatedGenero;
}

export function deleteGenero(id: string): boolean {
    const generoIndex = generos.findIndex((g) => g.id.toString() === id);
    if (generoIndex === -1) {
        return false;
    }
    generos.splice(generoIndex, 1);
    return true;
}