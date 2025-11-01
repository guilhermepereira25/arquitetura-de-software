import { Ator, AtorInput } from '../../types';
import { IAtorRepository } from '../interfaces';

export class InMemoryAtorRepository implements IAtorRepository {
  private atores: Ator[] = [
    { id: 1, nome: "Leonardo DiCaprio", dataNascimento: "1974-11-11", nacionalidade: "Americano" },
    { id: 2, nome: "Christian Bale", dataNascimento: "1974-01-30", nacionalidade: "Britânico"},
    { id: 3, nome: "Matthew McConaughey", dataNascimento: "1969-11-04", nacionalidade: "Americano" },
  ];

  private filmeAtor: { filmeId: number; atorId: number }[] = [
    { filmeId: 1, atorId: 1 },
    { filmeId: 2, atorId: 2 },
    { filmeId: 3, atorId: 3 },
  ];

  async findAll(): Promise<Ator[]> {
    return this.atores;
  }

  async findById(id: number): Promise<Ator | null> {
    return this.atores.find(a => a.id === id) || null;
  }

  async create(atorData: AtorInput): Promise<Ator> {
    const newAtor: Ator = {
      id: this.atores.length + 1,
      ...atorData,
    };
    this.atores.push(newAtor);
    return newAtor;
  }

  async update(id: number, atorData: Partial<AtorInput>): Promise<Ator | null> {
    const atorIndex = this.atores.findIndex(a => a.id === id);
    if (atorIndex === -1) return null;
    this.atores[atorIndex] = { ...this.atores[atorIndex], ...atorData };
    return this.atores[atorIndex];
  }

  async delete(id: number): Promise<boolean> {
    const atorIndex = this.atores.findIndex(a => a.id === id);
    if (atorIndex === -1) return false;
    this.atores.splice(atorIndex, 1);
    this.filmeAtor = this.filmeAtor.filter(fa => fa.atorId !== id);
    return true;
  }

  async getFilmeIds(atorId: number): Promise<number[]> {
    return this.filmeAtor.filter(fa => fa.atorId === atorId).map(fa => fa.filmeId);
  }
}