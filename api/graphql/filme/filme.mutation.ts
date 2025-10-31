import { CriarFilmeInput } from "../types";
import { createFilme, addGeneroToFilme, deleteFilme, addAtoresToFilme, removeAtorFromFilme, removeGeneroFromFilme, updateFilme } from "../filme/filme.service";

export const filmeMutationsResolvers = {
    Mutation: {
        criarFilme: (_: any, input: CriarFilmeInput) => {
            return createFilme(input);
        },
        adicionarGeneroEmFilme: (_: any, { filmeId, generoId }: { filmeId: string, generoId: number }) => {
            return addGeneroToFilme(filmeId, generoId);
        },
        atualizarFilme: (_: any, { id, input }: { id: string, input: CriarFilmeInput }) => {
            return updateFilme(id, input);
        },
        excluirFilme: (_: any, { id }: { id: string }) => {
            return deleteFilme(id);
        },
        adicionarAtoresEmFilme: (_: any, { filmeId, atorIds }: { filmeId: string, atorIds: number[] }) => {
            return addAtoresToFilme(filmeId, atorIds);
        },
        removerAtorDeFilme: (_: any, { filmeId, atorId }: { filmeId: string, atorId: number }) => {
            return removeAtorFromFilme(filmeId, atorId);
        },
        removerGeneroDeFilme: (_: any, { filmeId, generoId }: { filmeId: string, generoId: number }) => {
            return removeGeneroFromFilme(filmeId, generoId);
        },
    }
}