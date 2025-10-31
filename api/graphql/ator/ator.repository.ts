import { Ator, AtorInput } from "../types";

const atores: Ator[] = [
    { id: 1, nome: "Leonardo DiCaprio", dataNascimento: "1974-11-11", nacionalidade: "Americano" },
    { id: 2, nome: "Christian Bale", dataNascimento: "1974-01-30", nacionalidade: "Britânico"},
    { id: 3, nome: "Matthew McConaughey", dataNascimento: "1969-11-04", nacionalidade: "Americano" },
];

export function findAllAtores(): Ator[] {
    return atores;
}

export function findAtorById(id: string): Ator | null {
    const ator = atores.find((a) => a.id.toString() === id);
    return ator || null;
}

export function createAtor(atorData: AtorInput): Ator {
    const newAtor: Ator = {
        id: atores.length + 1,
        ...atorData,
    };
    atores.push(newAtor);
    return newAtor;
}

export function updateAtor(id: string, atorData: AtorInput): Ator | null {
    const atorIndex = atores.findIndex((a) => a.id.toString() === id);
    if (atorIndex === -1) {
        return null;
    }
    const updatedAtor = { ...atores[atorIndex], ...atorData };
    atores[atorIndex] = updatedAtor;
    return updatedAtor;
}

export function deleteAtor(id: string): boolean {
    const atorIndex = atores.findIndex((a) => a.id.toString() === id);
    if (atorIndex === -1) {
        return false;
    }
    atores.splice(atorIndex, 1);
    return true;
}

export const findAllAtoresByIds = (ids: number[]): Ator[] => {
    return atores.filter(ator => ids.includes(ator.id));
}