import { findAllFilmes, findFilmeById, createFilme, updateFilme, deleteFilme } from "../filme/filme.repository";
import { addAtoresToFilme, removeAtorFromFilme } from "../repositories/filme-ator.repository";
import { CriarFilmeInput } from "../types";

export const filmeResolvers = {
    Query: {
        filmes: () => {
            return findAllFilmes();
        },
        filme: (_: any, { id }: { id: string }) => {
            return findFilmeById(id);
        },
    },
    Mutation: {
        criarFilme: (_: any, { input }: { input: CriarFilmeInput }) => {
            const filme = createFilme(input);
            // Note: generos are added via separate mutation
            return filme;
        },
        atualizarFilme: (_: any, { id, input }: { id: string, input: CriarFilmeInput }) => {
            const filme = updateFilme(id, input);
            if (filme) {
                // Update relationships
                // For simplicity, remove all and add new
                // In real app, diff the changes
            }
            return filme;
        },
        excluirFilme: (_: any, { id }: { id: string }) => {
            return deleteFilme(id);
        },
        adicionarAtoresEmFilme: (_: any, { filmeId, atorIds }: { filmeId: string, atorIds: string[] }) => {
            addAtoresToFilme(filmeId, atorIds);
            return findFilmeById(filmeId);
        },
        removerAtorDeFilme: (_: any, { filmeId, atorId }: { filmeId: string, atorId: string }) => {
            removeAtorFromFilme(filmeId, atorId);
            return findFilmeById(filmeId);
        },
    },
};