import { Filme, CriarFilmeInput } from '../../types';
import { IFilmeRepository } from '../interfaces';

export class InMemoryFilmeRepository implements IFilmeRepository {
  private filmes: Filme[] = [
    { id: 1, titulo: "Inception", diretor: "Christopher Nolan", anoLancamento: 2010 },
    { id: 2, titulo: "The Dark Knight", diretor: "Christopher Nolan", anoLancamento: 2008 },
    { id: 3, titulo: "Interstellar", diretor: "Christopher Nolan", anoLancamento: 2014 },
  ];

  private filmeAtor: { filmeId: number; atorId: number }[] = [
    { filmeId: 1, atorId: 1 },
    { filmeId: 2, atorId: 2 },
    { filmeId: 3, atorId: 3 },
  ];

  private filmeGenero: { filmeId: number; generoId: number }[] = [
    { filmeId: 1, generoId: 1 },
    { filmeId: 2, generoId: 2 },
    { filmeId: 3, generoId: 3 },
  ];

  async findAll(): Promise<Filme[]> {
    return this.filmes;
  }

  async findById(id: number): Promise<Filme | null> {
    return this.filmes.find(f => f.id === id) || null;
  }

  async create(filmeData: CriarFilmeInput): Promise<Filme> {
    const newFilme: Filme = {
      id: this.filmes.length + 1,
      titulo: filmeData.titulo,
      diretor: filmeData.diretor,
      anoLancamento: filmeData.anoLancamento,
    };
    this.filmes.push(newFilme);
    // Add relationships
    filmeData.atorIds.forEach(atorId => this.filmeAtor.push({ filmeId: newFilme.id, atorId }));
    filmeData.generoIds.forEach(generoId => this.filmeGenero.push({ filmeId: newFilme.id, generoId }));
    return newFilme;
  }

  async update(id: number, filmeData: Partial<CriarFilmeInput>): Promise<Filme | null> {
    const filmeIndex = this.filmes.findIndex(f => f.id === id);
    if (filmeIndex === -1) return null;
    this.filmes[filmeIndex] = { ...this.filmes[filmeIndex], ...filmeData };
    return this.filmes[filmeIndex];
  }

  async delete(id: number): Promise<boolean> {
    const filmeIndex = this.filmes.findIndex(f => f.id === id);
    if (filmeIndex === -1) return false;
    this.filmes.splice(filmeIndex, 1);
    // Remove relationships
    this.filmeAtor = this.filmeAtor.filter(fa => fa.filmeId !== id);
    this.filmeGenero = this.filmeGenero.filter(fg => fg.filmeId !== id);
    return true;
  }

  async addAtor(filmeId: number, atorId: number): Promise<void> {
    if (!this.filmeAtor.some(fa => fa.filmeId === filmeId && fa.atorId === atorId)) {
      this.filmeAtor.push({ filmeId, atorId });
    }
  }

  async removeAtor(filmeId: number, atorId: number): Promise<void> {
    this.filmeAtor = this.filmeAtor.filter(fa => !(fa.filmeId === filmeId && fa.atorId === atorId));
  }

  async addGenero(filmeId: number, generoId: number): Promise<void> {
    if (!this.filmeGenero.some(fg => fg.filmeId === filmeId && fg.generoId === generoId)) {
      this.filmeGenero.push({ filmeId, generoId });
    }
  }

  async removeGenero(filmeId: number, generoId: number): Promise<void> {
    this.filmeGenero = this.filmeGenero.filter(fg => !(fg.filmeId === filmeId && fg.generoId === generoId));
  }

  async getAtorIds(filmeId: number): Promise<number[]> {
    return this.filmeAtor.filter(fa => fa.filmeId === filmeId).map(fa => fa.atorId);
  }

  async getGeneroIds(filmeId: number): Promise<number[]> {
    return this.filmeGenero.filter(fg => fg.filmeId === filmeId).map(fg => fg.generoId);
  }
}
