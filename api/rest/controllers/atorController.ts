import { Response } from 'express';
import { AtorService } from '../services/atorService.js';
import { addAtorLinks } from '../helpers/hateoasHelper.js';
import { AppRequest as Request } from '../types.js';

export class AtorController {
  constructor(private atorService: AtorService) {}

  getAll = (req: Request, res: Response) => {
    const atores = this.atorService.getAllAtores();
    res.json(atores.map(a => addAtorLinks(a, req.hateoasBase)));
  };

  getById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const ator = this.atorService.getAtorById(id);
    if (ator) {
      res.json(addAtorLinks(ator, req.hateoasBase));
    } else {
      res.status(404).json({ message: 'Ator not found' });
    }
  };

  create = (req: Request, res: Response) => {
    const ator = req.body;
    const newAtor = this.atorService.createAtor(ator);
    res.status(201).json(addAtorLinks(newAtor, req.hateoasBase));
  };

  update = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const ator = req.body;
    const updatedAtor = this.atorService.updateAtor(id, ator);
    if (updatedAtor) {
      res.json(addAtorLinks(updatedAtor, req.hateoasBase));
    } else {
      res.status(404).json({ message: 'Ator not found' });
    }
  };

  delete = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const deleted = this.atorService.deleteAtor(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ator not found' });
    }
  };
}