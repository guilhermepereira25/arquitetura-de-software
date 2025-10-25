import { FilmeRepository } from './repositories/filmeRepository.js';
import { AtorRepository } from './repositories/atorRepository.js';
import { GeneroRepository } from './repositories/generoRepository.js';
import { FilmeAtorRepository } from './repositories/filmeAtorRepository.js';
import { FilmeService } from './services/filmeService.js';
import { AtorService } from './services/atorService.js';
import { GeneroService } from './services/generoService.js';
import { FilmeController } from './controllers/filmeController.js';
import { AtorController } from './controllers/atorController.js';
import { GeneroController } from './controllers/generoController.js';

const filmeRepo = new FilmeRepository();
const atorRepo = new AtorRepository();
const generoRepo = new GeneroRepository();
const filmeAtorRepo = new FilmeAtorRepository();

const filmeService = new FilmeService(filmeRepo, filmeAtorRepo, atorRepo);
const atorService = new AtorService(atorRepo);
const generoService = new GeneroService(generoRepo);

const filmeController = new FilmeController(filmeService);
const atorController = new AtorController(atorService);
const generoController = new GeneroController(generoService);

console.log('Repositories, Services, and Controllers have been instantiated.');

export { filmeController, atorController, generoController };