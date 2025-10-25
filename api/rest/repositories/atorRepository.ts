import type { Ator } from '../models/index.js';

let atores: Ator[] = [];

export class AtorRepository {
  findAll(): Ator[] {
    return atores;
  }

  findById(id: number): Ator | undefined {
    return atores.find(a => a.id === id);
  }

  create(ator: Omit<Ator, 'id'>): Ator {
    const newId = Math.max(atores.length + 1, 1);
    const newAtor = { ...ator, id: newId };
    atores.push(newAtor);
    return newAtor;
  }

  update(id: number, ator: Partial<Ator>): Ator | undefined {
    const index = atores.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    atores[index] = { ...atores[index], ...ator, id } as Ator;
    return atores[index];
  }

  delete(id: number): boolean {
    const index = atores.findIndex(a => a.id === id);
    if (index === -1) return false;
    atores.splice(index, 1);
    return true;
  }
}