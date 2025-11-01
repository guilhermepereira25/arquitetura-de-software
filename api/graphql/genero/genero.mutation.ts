import { GeneroInput } from "../types";
import { generoService, filmeService } from '../container';

export const generoMutationsResolvers = {
    Mutation: {
        criarGenero: async (_: any, { input }: { input: GeneroInput }) => {
            return generoService.create(input);
        },
        atualizarGenero: async (_: any, { id, input }: { id: number, input: Partial<GeneroInput> }) => {
            return generoService.update(id, input);
        },
        excluirGenero: async (_: any, { id }: { id: number }) => {
            return generoService.delete(id);
        },
        adicionarGenerosEmFilme: async (_: any, { filmeId, generoIds }: { filmeId: number, generoIds: number[] }) => {
            for (const generoId of generoIds) {
                await filmeService.addGenero(filmeId, generoId);
            }
            return filmeService.findById(filmeId);
        },
    }
}