import routerx from 'express-promise-router';

import EmpresaRouter from './EmpresaRo';
import UsuarioRouter from './UsuarioRo';
import BodegaRouter from './BodegaRo';
import ProductoRouter from './ProductoRo';
import TerceroRouter from './TerceroRo';
import MovimientoRouter from './MovimientoRo';
import ResponsableRouter from './ResponsableRo';
import CentroCostosRouter from './CentroCostoRo';
import ActivosFijosRouter from './ActivosFijosRo';

const router = routerx();

router.use('/empresa', EmpresaRouter);
router.use('/usuario', UsuarioRouter);
router.use('/bodega', BodegaRouter);
router.use('/producto', ProductoRouter);
router.use('/tercero', TerceroRouter);
router.use('/Movimiento', MovimientoRouter);
router.use('/Responsable', ResponsableRouter);
router.use('/centroCosto', CentroCostosRouter);
router.use('/ActivosFijos', ActivosFijosRouter);

export default router;