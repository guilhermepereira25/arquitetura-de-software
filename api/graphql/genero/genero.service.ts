import { IGeneroRepository } from '../repositories/interfaces';
import { Genero, GeneroInput } from '../types';

export class GeneroService {
  constructor(private generoRepository: IGeneroRepository) {}

  async findAll(): Promise<Genero[]> {
    return this.generoRepository.findAll();
  }

  async findById(id: number): Promise<Genero | null> {
    return this.generoRepository.findById(id);
  }

  async create(input: GeneroInput): Promise<Genero> {
    return this.generoRepository.create(input);
  }

  async update(id: number, input: Partial<GeneroInput>): Promise<Genero | null> {
    return this.generoRepository.update(id, input);
  }

  async delete(id: number): Promise<boolean> {
    return this.generoRepository.delete(id);
  }

  async getFilmeIds(generoId: number): Promise<number[]> {
    return this.generoRepository.getFilmeIds(generoId);
  }
}