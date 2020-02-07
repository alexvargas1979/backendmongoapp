import routerx from 'express-promise-router';
import ActivosFijosCont from '../controllers/ActivosFijosCon';

const router=routerx();

router.post('/guardar',ActivosFijosCont.Guardar);
router.get('/list',ActivosFijosCont.list);
router.post('/buscarPorId',ActivosFijosCont.buscarPorId);
router.post('/BuscarAFxEmpresa',ActivosFijosCont.BuscarAFxEmpresa);
router.put('/update',ActivosFijosCont.update);
router.delete('/remove',ActivosFijosCont.remove);
router.put('/actualizaReserva',ActivosFijosCont.ActualizarReserva);
router.put('/procesar',ActivosFijosCont.procesar);
router.put('/cambiar',ActivosFijosCont.cambiar);
router.post('/mostrarProductos',ActivosFijosCont.mostrarProductos);
router.post('/comprobarCodigo',ActivosFijosCont.comprobarCodigo);


export default router;