import { Filme, Ator, Genero } from '../models/index.js';

interface Link {
  rel: string;
  href: string;
  method?: string;
}

export function addFilmeLinks(filme: Filme, base?: string): Filme & { _links: Link[] } {
  const links: Link[] = [
    { rel: 'self', href: `/filmes/${filme.id}` },
    { rel: 'create', method: 'POST', href: `/filmes` },
    { rel: 'update', method: 'PUT', href: `/filmes/${filme.id}` },
    { rel: 'delete', method: 'DELETE', href: `/filmes/${filme.id}` },
    { rel: 'genero', href: `/generos/${filme.generoId}` },
    { rel: 'atores', href: `/filmes/${filme.id}/atores` }
  ];
  return {
    ...filme,
    _links: links.map(link => ({ ...link, href: `${base || ''}${link.href}` }))
  };
}

export function addAtorLinks(ator: Ator, base?: string): Ator & { _links: Link[] } {
  const links: Link[] = [
    { rel: 'self', method: "GET", href: `/atores/${ator.id}` },
    { rel: 'create', method: "POST", href: `/atores` },
    { rel: 'update', method: "PUT", href: `/atores/${ator.id}` },
    { rel: 'delete', method: "DELETE", href: `/atores/${ator.id}` },
    { rel: 'filmes', href: `/atores/${ator.id}/filmes` }
  ];
  return {
    ...ator,
    _links: links.map(link => ({ ...link, href: `${base || ''}${link.href}` }))
  };
}

export function addGeneroLinks(genero: Genero, base?: string): Genero & { _links: Link[] } {
  const links: Link[] = [
    { rel: 'self', href: `/generos/${genero.id}` },
    { rel: 'create', method: 'POST', href: `/generos` },
    { rel: 'update', method: 'PUT', href: `/generos/${genero.id}` },
    { rel: 'delete', method: 'DELETE', href: `/generos/${genero.id}` },
    { rel: 'filmes', href: `/generos/${genero.id}/filmes` }
  ];
  return {
    ...genero,
    _links: links.map(link => ({ ...link, href: `${base || ''}${link.href}` }))
  };
}