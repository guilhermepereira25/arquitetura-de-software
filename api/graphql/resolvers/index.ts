import { filmeResolvers } from "./filme.resolvers";
import { filmeService } from "../container";
import { atorService } from "../container";
import { generoService } from "../container";
import { generoResolvers } from "./genero.resolvers";
import { atorResolvers } from "./ator.resolvers";

export const resolvers = {
    Query: {
        ...filmeResolvers.Query,
        ...atorResolvers.Query,
        ...generoResolvers.Query,
    },
    Mutation: {
        ...filmeResolvers.Mutation,
        ...atorResolvers.Mutation,
        ...generoResolvers.Mutation,
    },
  Filme: {
    atores: async (parent: any) => {
      const atorIds = await filmeService.getAtorIds(parent.id);
      const atores = [];
      for (const atorId of atorIds) {
        const ator = await atorService.findById(atorId);
        if (ator) atores.push(ator);
      }
      return atores;
    },
    generos: async (parent: any) => {
      const generoIds = await filmeService.getGeneroIds(parent.id);
      const generos = [];
      for (const generoId of generoIds) {
        const genero = await generoService.findById(generoId);
        if (genero) generos.push(genero);
      }
      return generos;
    },
  },
  Ator: {
    filmes: async (parent: any) => {
      const filmeIds = await atorService.getFilmeIds(parent.id);
      const filmes = [];
      for (const filmeId of filmeIds) {
        const filme = await filmeService.findById(filmeId);
        if (filme) filmes.push(filme);
      }
      return filmes;
    },
  },
  Genero: {
    filmes: async (parent: any) => {
      const filmeIds = await generoService.getFilmeIds(parent.id);
      const filmes = [];
      for (const filmeId of filmeIds) {
        const filme = await filmeService.findById(filmeId);
        if (filme) filmes.push(filme);
      }
      return filmes;
    },
  },
};