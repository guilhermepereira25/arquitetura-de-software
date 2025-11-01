import { Genero, GeneroInput } from '../../types';
import { IGeneroRepository } from '../interfaces';

export class InMemoryGeneroRepository implements IGeneroRepository {
  private generos: Genero[] = [
    { id: 1, nome: "Ação" },
    { id: 2, nome: "Ficção Científica" },
    { id: 3, nome: "Drama" },
  ];

  private filmeGenero: { filmeId: number; generoId: number }[] = [
    { filmeId: 1, generoId: 1 },
    { filmeId: 2, generoId: 2 },
    { filmeId: 3, generoId: 3 },
  ];

  async findAll(): Promise<Genero[]> {
    return this.generos;
  }

  async findById(id: number): Promise<Genero | null> {
    return this.generos.find(g => g.id === id) || null;
  }

  async create(generoData: GeneroInput): Promise<Genero> {
    const newGenero: Genero = {
      id: this.generos.length + 1,
      ...generoData,
    };
    this.generos.push(newGenero);
    return newGenero;
  }

  async update(id: number, generoData: Partial<GeneroInput>): Promise<Genero | null> {
    const generoIndex = this.generos.findIndex(g => g.id === id);
    if (generoIndex === -1) return null;
    this.generos[generoIndex] = { ...this.generos[generoIndex], ...generoData };
    return this.generos[generoIndex];
  }

  async delete(id: number): Promise<boolean> {
    const generoIndex = this.generos.findIndex(g => g.id === id);
    if (generoIndex === -1) return false;
    this.generos.splice(generoIndex, 1);
    this.filmeGenero = this.filmeGenero.filter(fg => fg.generoId !== id);
    return true;
  }

  async getFilmeIds(generoId: number): Promise<number[]> {
    return this.filmeGenero.filter(fg => fg.generoId === generoId).map(fg => fg.filmeId);
  }
}