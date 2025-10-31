import { atorResolvers } from "./ator.resolvers";
import { generoResolvers } from "./genero.resolvers";
import { findAtoresByFilmeId, findFilmesByAtorId } from "../repositories/filme-ator.repository";
import { findGenerosByFilmeId, findFilmesByGeneroId } from "../repositories/filme-genero.repository";
import { findAtorById } from "../ator/ator.repository";
import { findGeneroById } from "../genero/genero.repository";
import { findFilmeById } from "../filme/filme.repository";
import { filmeQueryResolvers } from "../filme/filme.queries";
import { filmeMutationsResolvers } from "../filme/filme.mutation";

export const resolvers = {
    Query: {
        ...filmeQueryResolvers.Query,
        ...atorResolvers.Query,
        ...generoResolvers.Query,
    },
    Mutation: {
        ...filmeMutationsResolvers.Mutation,
        ...atorResolvers.Mutation,
        ...generoResolvers.Mutation,
    },
    Filme: {
        atores: (parent: any) => {
            const atorIds = findAtoresByFilmeId(parent.id.toString());
            const atores = [];
            for (const atorId of atorIds) {
                const ator = findAtorById(atorId.toString());
                if (ator) atores.push(ator);
            }
            return atores;
        },
        generos: (parent: any) => {
            const generoIds = findGenerosByFilmeId(parent.id.toString());
            const generos = [];
            for (const generoId of generoIds) {
                const genero = findGeneroById(generoId.toString());
                if (genero) generos.push(genero);
            }
            return generos;
        },
    },
    Ator: {
        filmes: (parent: any) => {
            const filmeIds = findFilmesByAtorId(parent.id.toString());
            const filmes = [];
            for (const filmeId of filmeIds) {
                const filme = findFilmeById(filmeId.toString());
                if (filme) filmes.push(filme);
            }
            return filmes;
        },
    },
    Genero: {
        filmes: (parent: any) => {
            const filmeIds = findFilmesByGeneroId(parent.id.toString());
            const filmes = [];
            for (const filmeId of filmeIds) {
                const filme = findFilmeById(filmeId.toString());
                if (filme) filmes.push(filme);
            }
            return filmes;
        },
    },
};