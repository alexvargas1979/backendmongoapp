import routerx from 'express-promise-router';
import ProductoCont from '../controllers/ProductoCon';

const router = routerx();

router.post('/guardar', ProductoCont.Guardar);
router.get('/buscarxCodigo', ProductoCont.buscarxCodigo);
router.post('/buscarPorId', ProductoCont.buscarPorId);
router.put('/ActualizarCantRerservada', ProductoCont.ActualizarCantReservada);
router.put('/update', ProductoCont.update);
router.delete('/remove', ProductoCont.remove);


export default router;