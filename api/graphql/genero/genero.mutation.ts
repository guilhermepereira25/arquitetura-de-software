import { GeneroInput } from "../types";
import { createGenero, updateGenero, deleteGenero } from "../genero/genero.service";
import { addGenerosToFilme } from "../repositories/filme-genero.repository";
import { findFilmeById } from "../filme/filme.repository";

export const generoMutationsResolvers = {
    Mutation: {
        criarGenero: (_: any, { input }: { input: GeneroInput }) => {
            return createGenero(input);
        },
        atualizarGenero: (_: any, { id, input }: { id: string, input: GeneroInput }) => {
            return updateGenero(id, input);
        },
        excluirGenero: (_: any, { id }: { id: string }) => {
            return deleteGenero(id);
        },
        adicionarGenerosEmFilme: (_: any, { filmeId, generoIds }: { filmeId: string, generoIds: string[] }) => {
            addGenerosToFilme(filmeId, generoIds);
            return findFilmeById(filmeId);
        },
    }
}