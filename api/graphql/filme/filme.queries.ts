import { findAllFilmes, findFilmeById } from "../filme/filme.service.js";

export const filmeQueryResolvers = {
    Query: {
        filmes: () => {
            return findAllFilmes();
        },
        filme: (_: any, { id }: { id: string }) => {
            return findFilmeById(id);
        },
    },
};
