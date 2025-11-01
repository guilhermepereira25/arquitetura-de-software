import { Ator, Filme, Genero, AtorInput, CriarFilmeInput, GeneroInput } from '../types';

export interface IAtorRepository {
  findAll(): Promise<Ator[]>;
  findById(id: number): Promise<Ator | null>;
  create(ator: AtorInput): Promise<Ator>;
  update(id: number, atorData: Partial<AtorInput>): Promise<Ator | null>;
  delete(id: number): Promise<boolean>;
  getFilmeIds(atorId: number): Promise<number[]>;
}

export interface IFilmeRepository {
  findAll(): Promise<Filme[]>;
  findById(id: number): Promise<Filme | null>;
  create(filme: CriarFilmeInput): Promise<Filme>;
  update(id: number, filme: Partial<CriarFilmeInput>): Promise<Filme | null>;
  delete(id: number): Promise<boolean>;
  addAtor(filmeId: number, atorId: number): Promise<void>;
  removeAtor(filmeId: number, atorId: number): Promise<void>;
  addGenero(filmeId: number, generoId: number): Promise<void>;
  removeGenero(filmeId: number, generoId: number): Promise<void>;
  getAtorIds(filmeId: number): Promise<number[]>;
  getGeneroIds(filmeId: number): Promise<number[]>;
}

export interface IGeneroRepository {
  findAll(): Promise<Genero[]>;
  findById(id: number): Promise<Genero | null>;
  create(genero: GeneroInput): Promise<Genero>;
  update(id: number, genero: Partial<GeneroInput>): Promise<Genero | null>;
  delete(id: number): Promise<boolean>;
  getFilmeIds(generoId: number): Promise<number[]>;
}