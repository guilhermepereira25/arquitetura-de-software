import { generoService } from '../container';

export const generoQueryResolvers = {
    Query: {
        generos: async () => {
            return generoService.findAll();
        },
        genero: async (_: any, { id }: { id: number }) => {
            return generoService.findById(id);
        },
    },
};