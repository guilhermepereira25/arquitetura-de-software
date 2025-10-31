import { FilmeGenero } from "../types";

const filmeGenero: FilmeGenero[] = [
    { filmeId: 1, generoId: 1 },
    { filmeId: 2, generoId: 1 },
    { filmeId: 3, generoId: 2 },
];

export function findGenerosByFilmeId(filmeId: string): number[] {
    return filmeGenero.filter(fg => fg.filmeId.toString() === filmeId).map(fg => fg.generoId);
}

export function findFilmesByGeneroId(generoId: string): number[] {
    return filmeGenero.filter(fg => fg.generoId.toString() === generoId).map(fg => fg.filmeId);
}

export function addGenerosToFilme(filmeId: string, generoIds: string[]): void {
    const existing = filmeGenero.filter(fg => fg.filmeId.toString() === filmeId && generoIds.includes(fg.generoId.toString()));
    const toAdd = generoIds.filter(generoId => !existing.some(fg => fg.generoId.toString() === generoId));
    toAdd.forEach(generoId => {
        filmeGenero.push({ filmeId: parseInt(filmeId), generoId: parseInt(generoId) });
    });
}

export function removeGeneroFromFilme(filmeId: string, generoId: string): void {
    const index = filmeGenero.findIndex(fg => fg.filmeId.toString() === filmeId && fg.generoId.toString() === generoId);
    if (index !== -1) {
        filmeGenero.splice(index, 1);
    }
}