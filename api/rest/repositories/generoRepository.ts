import type { Genero } from '../models/index.js';

let generos: Genero[] = [
    { id: 1, nome: 'Ação' },
    { id: 2, nome: 'Comédia' },
    { id: 3, nome: 'Drama' }
];

export class GeneroRepository {
  findAll(): Genero[] {
    return generos;
  }

  findById(id: number): Genero | undefined {
    return generos.find(g => g.id === id);
  }

  create(genero: Omit<Genero, 'id'>): Genero {
    const newId = Math.max(generos.length + 1, 1);
    const newGenero = { ...genero, id: newId };
    generos.push(newGenero);
    return newGenero;
  }

  update(id: number, genero: Partial<Genero>): Genero | undefined {
    const index = generos.findIndex(g => g.id === id);
    if (index === -1) return undefined;
    generos[index] = { ...generos[index], ...genero, id } as Genero;
    return generos[index];
  }

  delete(id: number): boolean {
    const index = generos.findIndex(g => g.id === id);
    if (index === -1) return false;
    generos.splice(index, 1);
    return true;
  }
}