import { AtorInput } from "../types";
import { createAtor, updateAtor, deleteAtor } from "../ator/ator.service";

export const atorMutationsResolvers = {
    Mutation: {
        criarAtor: (_: any, { input }: { input: AtorInput }) => {
            return createAtor(input);
        },
        atualizarAtor: (_: any, { id, input }: { id: string, input: AtorInput }) => {
            return updateAtor(id, input);
        },
        excluirAtor: (_: any, { id }: { id: string }) => {
            return deleteAtor(id);
        },
    }
}