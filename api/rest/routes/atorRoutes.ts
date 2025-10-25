import { Router } from 'express';
import { atorController } from '../container.js';

const router = Router();

router.get('/atores', atorController.getAll);
router.get('/atores/:id', atorController.getById);
router.post('/atores', atorController.create);
router.put('/atores/:id', atorController.update);
router.delete('/atores/:id', atorController.delete);

export default router;