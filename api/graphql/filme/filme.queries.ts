import { filmeService } from '../container';

export const filmeQueryResolvers = {
    Query: {
        filmes: async () => {
            return filmeService.findAll();
        },
        filme: async (_: any, { id }: { id: number }) => {
            return filmeService.findById(id);
        },
    },
};
