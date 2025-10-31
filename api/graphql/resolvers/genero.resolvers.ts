import { generoQueryResolvers } from "../genero/genero.queries";
import { generoMutationsResolvers } from "../genero/genero.mutation";

export const generoResolvers = {
    ...generoQueryResolvers,
    ...generoMutationsResolvers,
};