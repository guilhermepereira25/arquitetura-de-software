import { Router } from 'express';
import { filmeController } from '../container.js';

const router = Router();

router.get('/filmes', filmeController.getAll);
router.get('/filmes/:id', filmeController.getById);
router.post('/filmes', filmeController.create);
router.put('/filmes/:id', filmeController.update);
router.delete('/filmes/:id', filmeController.delete);
router.get('/filmes/:id/atores', filmeController.getAtores);
router.post('/filmes/:filmeId/atores', filmeController.addAtor);

export default router;