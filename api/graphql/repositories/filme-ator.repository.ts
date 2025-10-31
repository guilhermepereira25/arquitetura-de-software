import { FilmeAtor } from "../types";

const filmeAtor: FilmeAtor[] = [
    { filmeId: 1, atorId: 1 },
    { filmeId: 2, atorId: 2 },
    { filmeId: 3, atorId: 3 },
];

export function findAtoresByFilmeId(filmeId: string): number[] {
    return filmeAtor.filter(fa => fa.filmeId.toString() === filmeId).map(fa => fa.atorId);
}

export function findFilmesByAtorId(atorId: string): number[] {
    return filmeAtor.filter(fa => fa.atorId.toString() === atorId).map(fa => fa.filmeId);
}

export function addAtoresToFilme(filmeId: string, atorIds: string[]): void {
    const existing = filmeAtor.filter(fa => fa.filmeId.toString() === filmeId && atorIds.includes(fa.atorId.toString()));
    const toAdd = atorIds.filter(atorId => !existing.some(fa => fa.atorId.toString() === atorId));
    toAdd.forEach(atorId => {
        filmeAtor.push({ filmeId: parseInt(filmeId), atorId: parseInt(atorId) });
    });
}

export function removeAtorFromFilme(filmeId: string, atorId: string): void {
    const index = filmeAtor.findIndex(fa => fa.filmeId.toString() === filmeId && fa.atorId.toString() === atorId);
    if (index !== -1) {
        filmeAtor.splice(index, 1);
    }
}