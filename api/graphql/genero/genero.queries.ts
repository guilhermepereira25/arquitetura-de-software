import { findAllGeneros, findGeneroById } from "../genero/genero.service";

export const generoQueryResolvers = {
    Query: {
        generos: () => {
            return findAllGeneros();
        },
        genero: (_: any, { id }: { id: string }) => {
            return findGeneroById(id);
        },
    },
};