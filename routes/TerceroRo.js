import routerx from 'express-promise-router';
import TerceroCont from '../controllers/TerceroCon';

const router = routerx();

router.post('/guardar', TerceroCont.Guardar);


export default router;