import { Router } from 'express';
import { generoController } from '../container.js';

const router = Router();

router.get('/generos', generoController.getAll);
router.get('/generos/:id', generoController.getById);
router.post('/generos', generoController.create);
router.put('/generos/:id', generoController.update);
router.delete('/generos/:id', generoController.delete);

export default router;