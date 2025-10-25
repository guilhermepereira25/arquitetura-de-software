import { Response } from 'express';
import { GeneroService } from '../services/generoService.js';
import { addGeneroLinks } from '../helpers/hateoasHelper.js';
import { AppRequest as Request } from '../types.js';

export class GeneroController {
  constructor(private generoService: GeneroService) {}

  getAll = (req: Request, res: Response) => {
    const generos = this.generoService.getAllGeneros();
    res.json(generos.map(g => addGeneroLinks(g, req.hateoasBase)));
  };

  getById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const genero = this.generoService.getGeneroById(id);
    if (genero) {
      res.json(addGeneroLinks(genero, req.hateoasBase));
    } else {
      res.status(404).json({ message: 'Genero not found' });
    }
  };

  create = (req: Request, res: Response) => {
    const genero = req.body;
    const newGenero = this.generoService.createGenero(genero);
    res.status(201).json(addGeneroLinks(newGenero, req.hateoasBase));
  };

  update = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const genero = req.body;
    const updatedGenero = this.generoService.updateGenero(id, genero);
    if (updatedGenero) {
      res.json(addGeneroLinks(updatedGenero, req.hateoasBase));
    } else {
      res.status(404).json({ message: 'Genero not found' });
    }
  };

  delete = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const deleted = this.generoService.deleteGenero(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Genero not found' });
    }
  };
}