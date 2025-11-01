import { FilmeService } from '../filme/filme.service';
import { IAtorRepository } from '../repositories/interfaces';
import { Ator, AtorInput, Filme } from '../types';

export class AtorService {
  constructor(private atorRepository: IAtorRepository, private filmeService: FilmeService) {} // TODO: inject FilmeService

  async findAll(): Promise<Ator[]> {
    return this.atorRepository.findAll();
  }

  async findById(id: number): Promise<Ator | null> {
    return this.atorRepository.findById(id);
  }

  async create(input: AtorInput): Promise<Ator> {
    return this.atorRepository.create(input);
  }

  async update(id: number, input: Partial<AtorInput>): Promise<Ator | null> {
    return this.atorRepository.update(id, input);
  }

  async delete(id: number): Promise<boolean> {
    return this.atorRepository.delete(id);
  }

  async getFilmes(atorId: number): Promise<Filme[]> {
    const filmeIds = await this.atorRepository.getFilmeIds(atorId);
    const filmes: Filme[] = [];
    for (const id of filmeIds) {
      const filme = await this.filmeService.findById(id);
      if (filme) filmes.push(filme);
    }
    return filmes;
  }

  async getFilmeIds(atorId: number): Promise<number[]> {
    return this.atorRepository.getFilmeIds(atorId);
  }
}