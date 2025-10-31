import { atorQueryResolvers } from "../ator/ator.queries";
import { atorMutationsResolvers } from "../ator/ator.mutation";

export const atorResolvers = {
    ...atorQueryResolvers,
    ...atorMutationsResolvers,
};