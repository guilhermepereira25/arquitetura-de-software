import { IFilmeRepository } from '../repositories/interfaces';
import { CriarFilmeInput, Filme } from '../types';

export class FilmeService {
  constructor(private filmeRepository: IFilmeRepository) {}

  async findAll(): Promise<Filme[]> {
    return this.filmeRepository.findAll();
  }

  async findById(id: number): Promise<Filme | null> {
    return this.filmeRepository.findById(id);
  }

  async create(input: CriarFilmeInput): Promise<Filme> {
    return this.filmeRepository.create(input);
  }

  async update(id: number, input: Partial<CriarFilmeInput>): Promise<Filme | null> {
    return this.filmeRepository.update(id, input);
  }

  async delete(id: number): Promise<boolean> {
    return this.filmeRepository.delete(id);
  }

  async addAtor(filmeId: number, atorId: number): Promise<void> {
    return this.filmeRepository.addAtor(filmeId, atorId);
  }

  async removeAtor(filmeId: number, atorId: number): Promise<void> {
    return this.filmeRepository.removeAtor(filmeId, atorId);
  }

  async addGenero(filmeId: number, generoId: number): Promise<void> {
    return this.filmeRepository.addGenero(filmeId, generoId);
  }

  async removeGenero(filmeId: number, generoId: number): Promise<void> {
    return this.filmeRepository.removeGenero(filmeId, generoId);
  }

  async getAtorIds(filmeId: number): Promise<number[]> {
    return this.filmeRepository.getAtorIds(filmeId);
  }

  async getGeneroIds(filmeId: number): Promise<number[]> {
    return this.filmeRepository.getGeneroIds(filmeId);
  }
}