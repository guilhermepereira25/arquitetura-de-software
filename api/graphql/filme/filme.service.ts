import { CriarFilmeInput, Filme } from "../types";
import * as filmeRepository from "../filme/filme.repository";
import * as filmeGeneroRepository from "../repositories/filme-genero.repository";
import * as filmeAtorRepository from "../repositories/filme-ator.repository";

export const createFilme = (input: CriarFilmeInput) => {
    const filme: Omit<Filme, "id"> = {
        titulo: input.titulo,
        diretor: input.diretor,
        anoLancamento: input.anoLancamento,
    };
    return filmeRepository.createFilme(filme);
}

export const addGeneroToFilme = (filmeId: string, generoId: number) => {
    const filme = filmeRepository.findFilmeById(filmeId);
    if (!filme) {
        throw new Error("Filme not found");
    }
    filmeGeneroRepository.addGenerosToFilme(filme.id.toString(), [generoId.toString()]);
    return filme;
}

export const addAtoresToFilme = (filmeId: string, atorIds: number[]) => {
    const filme = filmeRepository.findFilmeById(filmeId);
    if (!filme) {
        throw new Error("Filme not found");
    }
    filmeAtorRepository.addAtoresToFilme(filmeId, atorIds.map(id => id.toString()));
    return filme;
}

export const removeAtorFromFilme = (filmeId: string, atorId: number) => {
    const filme = filmeRepository.findFilmeById(filmeId);
    if (!filme) {
        throw new Error("Filme not found");
    }
    filmeAtorRepository.removeAtorFromFilme(filmeId, atorId.toString());
    return filme;
}

export const removeGeneroFromFilme = (filmeId: string, generoId: number) => {
    const filme = filmeRepository.findFilmeById(filmeId);
    if (!filme) {
        throw new Error("Filme not found");
    }
    filmeGeneroRepository.removeGeneroFromFilme(filmeId, generoId.toString());
    return filme;
}

export const findAllFilmes = (): Filme[] => {
    return filmeRepository.findAllFilmes();
}

export const findFilmeById = (id: string): Filme | null => {
    return filmeRepository.findFilmeById(id);
}

export const updateFilme = (id: string, input: CriarFilmeInput): Filme | null => {
    return filmeRepository.updateFilme(id, input);
}

export const deleteFilme = (id: string): boolean => {
    return filmeRepository.deleteFilme(id);
}