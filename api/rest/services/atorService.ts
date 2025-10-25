import { AtorRepository } from '../repositories/atorRepository.js';
import type { Ator } from '../models/index.js';

export class AtorService {
  constructor(private atorRepo: AtorRepository) {}

  getAllAtores(): Ator[] {
    return this.atorRepo.findAll().map((ator, index) => {
        return { ...ator, id: index + 1 };
    });
  }

  getAtorById(id: number): Ator | undefined {
    return this.atorRepo.findById(id);
  }

  createAtor(ator: Omit<Ator, 'id'>): Ator {
    return this.atorRepo.create(ator);
  }

  updateAtor(id: number, ator: Partial<Ator>): Ator | undefined {
    return this.atorRepo.update(id, ator);
  }

  deleteAtor(id: number): boolean {
    return this.atorRepo.delete(id);
  }
}