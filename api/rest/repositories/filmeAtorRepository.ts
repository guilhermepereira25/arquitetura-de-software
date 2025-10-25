import type { FilmeAtor } from '../models/index.js';

let filmeAtores: FilmeAtor[] = [];

export class FilmeAtorRepository {
  findAll(): FilmeAtor[] {
    return filmeAtores;
  }

  findByFilmeId(filmeId: number): FilmeAtor[] {
    return filmeAtores.filter(fa => fa.filmeId === filmeId);
  }

  create(filmeAtor: FilmeAtor): FilmeAtor {
    filmeAtores.push(filmeAtor);
    return filmeAtor;
  }

  delete(filmeId: number, atorId: number): boolean {
    const index = filmeAtores.findIndex(fa => fa.filmeId === filmeId && fa.atorId === atorId);
    if (index === -1) return false;
    filmeAtores.splice(index, 1);
    return true;
  }
}