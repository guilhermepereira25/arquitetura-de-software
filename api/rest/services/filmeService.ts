import { FilmeRepository } from '../repositories/filmeRepository.js';
import { FilmeAtorRepository } from '../repositories/filmeAtorRepository.js';
import { AtorRepository } from '../repositories/atorRepository.js';
import type { Filme, Ator } from '../models/index.js';

export class FilmeService {
  constructor(
    private filmeRepo: FilmeRepository,
    private filmeAtorRepo: FilmeAtorRepository,
    private atorRepo: AtorRepository
  ) {}

  getAllFilmes(): Filme[] {
    return this.filmeRepo.findAll();
  }

  getFilmeById(id: number): Filme | undefined {
    return this.filmeRepo.findById(id);
  }

  createFilme(filme: Omit<Filme, 'id'>): Filme {
    return this.filmeRepo.create(filme);
  }

  updateFilme(id: number, filme: Partial<Filme>): Filme | undefined {
    return this.filmeRepo.update(id, filme);
  }

  deleteFilme(id: number): boolean {
    return this.filmeRepo.delete(id);
  }

  getAtoresByFilmeId(filmeId: number): Ator[] {
    const filmeAtores = this.filmeAtorRepo.findByFilmeId(filmeId);
    return filmeAtores.map(fa => this.atorRepo.findById(fa.atorId)).filter(a => a) as Ator[];
  }

  addAtorToFilme(filmeId: number, atorId: number): boolean {
    const filme = this.filmeRepo.findById(filmeId);
    const ator = this.atorRepo.findById(atorId);
    if (!filme || !ator) return false;
    this.filmeAtorRepo.create({ filmeId, atorId });
    return true;
  }
}