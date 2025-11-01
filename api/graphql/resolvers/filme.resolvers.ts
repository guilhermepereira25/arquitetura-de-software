import { filmeMutationsResolvers } from "../filme/filme.mutation";
import { filmeQueryResolvers } from "../filme/filme.queries";

export const filmeResolvers = {
   ...filmeQueryResolvers,
   ...filmeMutationsResolvers 
};