import { PrismaClient } from '../../generated/prisma/client';
import { Filme, CriarFilmeInput } from '../../types';
import { IFilmeRepository } from '../interfaces';

export class PrismaFilmeRepository implements IFilmeRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Filme[]> {
    return this.prisma.filme.findMany();
  }

  async findById(id: number): Promise<Filme | null> {
    return this.prisma.filme.findUnique({ where: { id } });
  }

  async create(filmeData: CriarFilmeInput): Promise<Filme> {
    return this.prisma.filme.create({
      data: {
        titulo: filmeData.titulo,
        diretor: filmeData.diretor,
        anoLancamento: filmeData.anoLancamento,
        ...(filmeData.atorIds?.length && {
          atores: {
            create: filmeData.atorIds.map(atorId => ({ atorId: Number(atorId) })),
          },
        }),
        ...(filmeData.generoIds?.length && {
          generos: {
            create: filmeData.generoIds.map(generoId => ({ generoId: Number(generoId) })),
          },
        }),
      },
    });
  }

  async update(id: number, filmeData: Partial<CriarFilmeInput>): Promise<Filme | null> {
    try {
      return await this.prisma.filme.update({
        where: { id },
        data: {
          titulo: filmeData.titulo,
          diretor: filmeData.diretor,
          anoLancamento: filmeData.anoLancamento,
          ...(filmeData.atorIds && {
            atores: {
              deleteMany: {},
              create: filmeData.atorIds.map(atorId => ({ atorId: Number(atorId) })),
            },
          }),
          ...(filmeData.generoIds && {
            generos: {
              deleteMany: {},
              create: filmeData.generoIds.map(generoId => ({ generoId: Number(generoId) })),
            },
          }),
        },
      });
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.filme.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async addAtor(filmeId: number, atorId: number): Promise<void> {
    await this.prisma.filmeAtor.create({ data: { filmeId, atorId } });
  }

  async removeAtor(filmeId: number, atorId: number): Promise<void> {
    await this.prisma.filmeAtor.deleteMany({
      where: { filmeId, atorId },
    });
  }

  async addGenero(filmeId: number, generoId: number): Promise<void> {
    await this.prisma.filmeGenero.create({ data: { filmeId, generoId } });
  }

  async removeGenero(filmeId: number, generoId: number): Promise<void> {
    await this.prisma.filmeGenero.deleteMany({
      where: { filmeId, generoId },
    });
  }

  async getAtorIds(filmeId: number): Promise<number[]> {
    const filmeAtors = await this.prisma.filmeAtor.findMany({
      where: { filmeId },
      select: { atorId: true },
    });
    return filmeAtors.map(fa => fa.atorId);
  }

  async getGeneroIds(filmeId: number): Promise<number[]> {
    const filmeGeneros = await this.prisma.filmeGenero.findMany({
      where: { filmeId },
      select: { generoId: true },
    });
    return filmeGeneros.map(fg => fg.generoId);
  }
}