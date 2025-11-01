import { PrismaClient } from '../../generated/prisma/client';
import { Ator, AtorInput } from '../../types';
import { IAtorRepository } from '../interfaces';

export class PrismaAtorRepository implements IAtorRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Ator[]> {
    return this.prisma.ator.findMany();
  }

  async findById(id: number): Promise<Ator | null> {
    return this.prisma.ator.findUnique({ where: { id } });
  }

  async create(atorData: AtorInput): Promise<Ator> {
    return this.prisma.ator.create({ data: atorData });
  }

  async update(id: number, atorData: Partial<AtorInput>): Promise<Ator | null> {
    try {
      return await this.prisma.ator.update({ where: { id }, data: atorData });
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.ator.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async getFilmeIds(atorId: number): Promise<number[]> {
    const filmeAtors = await this.prisma.filmeAtor.findMany({
      where: { atorId },
      select: { filmeId: true },
    });
    return filmeAtors.map(fa => fa.filmeId);
  }
}