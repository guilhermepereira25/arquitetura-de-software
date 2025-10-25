import { Request, Response } from "express";
import { FilmeService } from "../services/filmeService.js";

export class FilmeController {
  private readonly filmeService: FilmeService;

  constructor(service: FilmeService) {
    this.filmeService = service;
  }

  getAll = (req: Request, res: Response) => {
    const filmes = this.filmeService.getAllFilmes();
    res.json(filmes);
  };

  getById = (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    const id = parseInt(req.params.id);
    const filme = this.filmeService.getFilmeById(id);
    if (filme) {
      res.json(filme);
    } else {
      res.status(404).json({ message: "Filme not found" });
    }
  };

  create = (req: Request, res: Response) => {
    const filme = req.body;
    const newFilme = this.filmeService.createFilme(filme);
    res.status(201).json(newFilme);
  };

  update = (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    const id = parseInt(req.params.id);
    const filme = req.body;
    const updatedFilme = this.filmeService.updateFilme(id, filme);
    if (updatedFilme) {
      res.json(updatedFilme);
    } else {
      res.status(404).json({ message: "Filme not found" });
    }
  };

  delete = (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    const id = parseInt(req.params.id);
    const deleted = this.filmeService.deleteFilme(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Filme not found" });
    }
  };

  getAtores = (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    const id = parseInt(req.params.id);
    const atores = this.filmeService.getAtoresByFilmeId(id);
    res.json(atores);
  };

  addAtor = (req: Request, res: Response) => {
    if (!req.params.filmeId) {
      res.status(400).json({ message: "Filme ID is required" });
      return;
    }
    const filmeId = parseInt(req.params.filmeId);
    const { atorId } = req.body;
    const added = this.filmeService.addAtorToFilme(filmeId, atorId);
    if (added) {
      res.status(201).json({ message: "Ator added to filme" });
    } else {
      res.status(400).json({ message: "Invalid filme or ator" });
    }
  };
}
