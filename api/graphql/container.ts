import { InMemoryAtorRepository } from "./repositories/in-memory/InMemoryAtorRepository";
import { InMemoryFilmeRepository } from "./repositories/in-memory/InMemoryFilmeRepository";
import { InMemoryGeneroRepository } from "./repositories/in-memory/InMemoryGeneroRepository";
import { AtorService } from "./ator/ator.service";
import { FilmeService } from "./filme/filme.service";
import { GeneroService } from "./genero/genero.service";
import {
  IAtorRepository,
  IFilmeRepository,
  IGeneroRepository,
} from "./repositories/interfaces";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaAtorRepository } from "./repositories/prisma/PrismaAtorRepository";
import { PrismaFilmeRepository } from "./repositories/prisma/PrismaFilmeRepository";
import { PrismaGeneroRepository } from "./repositories/prisma/PrismaGeneroRepository";

let atorRepository: IAtorRepository;
let filmeRepository: IFilmeRepository;
let generoRepository: IGeneroRepository;
if (process.env.USE_PRISMA === "true") {
  // Prisma repositories would be instantiated here
  const prisma = new PrismaClient();
  atorRepository = new PrismaAtorRepository(prisma);
  filmeRepository = new PrismaFilmeRepository(prisma);
  generoRepository = new PrismaGeneroRepository(prisma);
} else {
  atorRepository = new InMemoryAtorRepository();
  filmeRepository = new InMemoryFilmeRepository();
  generoRepository = new InMemoryGeneroRepository();
}

export const filmeService = new FilmeService(filmeRepository);
export const generoService = new GeneroService(generoRepository);
export const atorService = new AtorService(atorRepository, filmeService);
