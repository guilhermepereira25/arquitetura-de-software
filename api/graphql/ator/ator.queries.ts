import { findAllAtores, findAtorById } from "../ator/ator.service";

export const atorQueryResolvers = {
    Query: {
        atores: () => {
            return findAllAtores();
        },
        ator: (_: any, { id }: { id: string }) => {
            return findAtorById(id);
        },
    },
};