import { atorService } from '../container';

export const atorQueryResolvers = {
    Query: {
        atores: async () => {
            return atorService.findAll();
        },
        ator: async (_: any, { id }: { id: number }) => {
            return atorService.findById(id);
        },
    },
};