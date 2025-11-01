import { PrismaClient } from '../../generated/prisma/client';
import { Genero, GeneroInput } from '../../types';
import { IGeneroRepository } from '../interfaces';

export class PrismaGeneroRepository implements IGeneroRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Genero[]> {
    return this.prisma.genero.findMany();
  }

  async findById(id: number): Promise<Genero | null> {
    return this.prisma.genero.findUnique({ where: { id } });
  }

  async create(generoData: GeneroInput): Promise<Genero> {
    return this.prisma.genero.create({ data: generoData });
  }

  async update(id: number, generoData: Partial<GeneroInput>): Promise<Genero | null> {
    try {
      return await this.prisma.genero.update({ where: { id }, data: generoData });
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.genero.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async getFilmeIds(generoId: number): Promise<number[]> {
    const filmeGeneros = await this.prisma.filmeGenero.findMany({
      where: { generoId },
      select: { filmeId: true },
    });
    return filmeGeneros.map(fg => fg.filmeId);
  }
}