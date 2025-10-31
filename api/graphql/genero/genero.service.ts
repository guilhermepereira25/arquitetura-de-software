import * as generoRepository from "../genero/genero.repository";
import { Genero, GeneroInput } from "../types";

export const findAllGeneros = (): Genero[] => {
    return generoRepository.findAllGeneros();
}

export const findGeneroById = (id: string): Genero | null => {
    return generoRepository.findGeneroById(id);
}

export const createGenero = (input: GeneroInput): Genero => {
    return generoRepository.createGenero(input);
}

export const updateGenero = (id: string, input: GeneroInput): Genero | null => {
    return generoRepository.updateGenero(id, input);
}

export const deleteGenero = (id: string): boolean => {
    return generoRepository.deleteGenero(id);
}