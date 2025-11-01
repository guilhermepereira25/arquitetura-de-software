import { AtorInput } from "../types";
import { atorService } from '../container';

export const atorMutationsResolvers = {
    Mutation: {
        criarAtor: async (_: any, { input }: { input: AtorInput }) => {
            return atorService.create(input);
        },
        atualizarAtor: async (_: any, { id, input }: { id: number, input: Partial<AtorInput> }) => {
            return atorService.update(id, input);
        },
        excluirAtor: async (_: any, { id }: { id: number }) => {
            return atorService.delete(id);
        },
    }
}