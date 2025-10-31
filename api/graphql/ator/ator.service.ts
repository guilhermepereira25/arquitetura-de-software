import * as atorRepository from "../ator/ator.repository";
import { Ator, AtorInput } from "../types";

export const findAllAtores = (): Ator[] => {
    return atorRepository.findAllAtores();
}

export const findAtorById = (id: string): Ator | null => {
    return atorRepository.findAtorById(id);
}

export const createAtor = (input: AtorInput): Ator => {
    return atorRepository.createAtor(input);
}

export const updateAtor = (id: string, input: AtorInput): Ator | null => {
    return atorRepository.updateAtor(id, input);
}

export const deleteAtor = (id: string): boolean => {
    return atorRepository.deleteAtor(id);
}

export const findAtorByIds = (ids: number[]): Ator[] => {
    return atorRepository.findAllAtoresByIds(ids);
}