import { Request, Response } from 'express';
import { GeneroService } from '../services/generoService.js';

export class GeneroController {
  constructor(private generoService: GeneroService) {}

  getAll = (req: Request, res: Response) => {
    const generos = this.generoService.getAllGeneros();
    res.json(generos);
  };

  getById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const genero = this.generoService.getGeneroById(id);
    if (genero) {
      res.json(genero);
    } else {
      res.status(404).json({ message: 'Genero not found' });
    }
  };

  create = (req: Request, res: Response) => {
    const genero = req.body;
    const newGenero = this.generoService.createGenero(genero);
    res.status(201).json(newGenero);
  };

  update = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const genero = req.body;
    const updatedGenero = this.generoService.updateGenero(id, genero);
    if (updatedGenero) {
      res.json(updatedGenero);
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