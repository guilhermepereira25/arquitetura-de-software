import type { Filme } from '../models/index.js';

let filmes: Filme[] = [];

export class FilmeRepository {
  findAll(): Filme[] {
    return filmes;
  }

  findById(id: number): Filme | undefined {
    return filmes.find(f => f.id === id);
  }

  create(filme: Omit<Filme, 'id'>): Filme {
    const newId = Math.max(filmes.length + 1, 1);
    const newFilme = { ...filme, id: newId };
    filmes.push(newFilme);
    return newFilme;
  }

  update(id: number, filme: Partial<Filme>): Filme | undefined {
    const index = filmes.findIndex(f => f.id === id);
    if (index === -1) return undefined;
    filmes[index] = { ...filmes[index], ...filme, id } as Filme;
    return filmes[index];
  }

  delete(id: number): boolean {
    const index = filmes.findIndex(f => f.id === id);
    if (index === -1) return false;
    filmes.splice(index, 1);
    return true;
  }
}