import { GeneroRepository } from '../repositories/generoRepository.js';
import type { Genero } from '../models/index.js';

export class GeneroService {
  constructor(private generoRepo: GeneroRepository) {}

  getAllGeneros(): Genero[] {
    return this.generoRepo.findAll().map((genero, index) => {
        return { ...genero, id: index + 1 };
    });
  }

  getGeneroById(id: number): Genero | undefined {
    return this.generoRepo.findById(id);
  }

  createGenero(genero: Omit<Genero, 'id'>): Genero {
    return this.generoRepo.create(genero);
  }

  updateGenero(id: number, genero: Partial<Genero>): Genero | undefined {
    return this.generoRepo.update(id, genero);
  }

  deleteGenero(id: number): boolean {
    return this.generoRepo.delete(id);
  }
}