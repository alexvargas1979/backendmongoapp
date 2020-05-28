import routerx from 'express-promise-router';
import MovimientoCont from '../controllers/MovimientoCon';

const router = routerx();

router.post('/guardar', MovimientoCont.Guardar);
router.get('/listar', MovimientoCont.listar);
router.post('/BuscarMovimientos', MovimientoCont.BuscarMovimientos);
router.post('/EliminarMovimientos', MovimientoCont.EliminarMovimientos);
router.get('/BuscarMovimientosDetalles', MovimientoCont.list);
router.post('/BuscarId', MovimientoCont.BuscarId);
router.post('/mostrarTraslados', MovimientoCont.mostrarTraslados);
router.post('/eliminarTraslados', MovimientoCont.EliminarMovimientos);
router.post('/eliminarXDocumento', MovimientoCont.EliminarXDocumento);
router.put('/actualizarMovimiento', MovimientoCont.actualizarDocumento);
router.get('/recuperarUltimoRegistro', MovimientoCont.recuperarUltimoRegistro);
router.delete('/remove', MovimientoCont.remove);
router.put('/update', MovimientoCont.update);
router.put('/cambiarEstado', MovimientoCont.cambiarEstado);
router.post('/mostrarMovimientos', MovimientoCont.mostrarMovimientos);
router.post('/mostrarMovimientosweb', MovimientoCont.mostrarMovimientosWeb);
router.post('/buscarXNumeroDocumento', MovimientoCont.buscarXNumeroDocumento);
router.put('/actualizarObservaciones', MovimientoCont.actualizarObservaciones);
router.post('/filtrarfecha', MovimientoCont.filtrarMovimientosFecha);


export default router;

