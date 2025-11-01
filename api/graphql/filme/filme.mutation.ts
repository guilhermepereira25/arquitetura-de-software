import { CriarFilmeInput } from "../types";
import { filmeService } from '../container';

export const filmeMutationsResolvers = {
    Mutation: {
        criarFilme: async (_: any, { input }: { input: CriarFilmeInput }) => {
            return filmeService.create(input)
        },
        adicionarGeneroEmFilme: async (_: any, { filmeId, generoId }: { filmeId: number, generoId: number }) => {
            await filmeService.addGenero(filmeId, generoId);
            return filmeService.findById(filmeId);
        },
        atualizarFilme: async (_: any, { id, input }: { id: number, input: Partial<CriarFilmeInput> }) => {
            return filmeService.update(id, input);
        },
        excluirFilme: async (_: any, { id }: { id: number }) => {
            return filmeService.delete(id);
        },
        adicionarAtoresEmFilme: async (_: any, { filmeId, atorIds }: { filmeId: number, atorIds: number[] }) => {
            for (const atorId of atorIds) {
                await filmeService.addAtor(filmeId, atorId);
            }
            return filmeService.findById(filmeId);
        },
        removerAtorDeFilme: async (_: any, { filmeId, atorId }: { filmeId: number, atorId: number }) => {
            await filmeService.removeAtor(filmeId, atorId);
            return filmeService.findById(filmeId);
        },
        removerGeneroDeFilme: async (_: any, { filmeId, generoId }: { filmeId: number, generoId: number }) => {
            await filmeService.removeGenero(filmeId, generoId);
            return filmeService.findById(filmeId);
        },
    }
}