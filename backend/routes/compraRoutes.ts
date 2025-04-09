import { Router } from 'express';
import * as compraCtrl from '../controllers/compraController';
import { verificarToken } from '../middleware/auth';

const router = Router();

router.get('/', verificarToken, compraCtrl.listar);
router.get('/:id', verificarToken, compraCtrl.obtener);
router.post('/', verificarToken, compraCtrl.crear);
router.delete('/:id', verificarToken, compraCtrl.eliminar);

export default router;