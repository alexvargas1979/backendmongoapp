import routerx from 'express-promise-router';
import BodegaCont from '../controllers/BodegaCon';

const router = routerx();

router.post('/guardar', BodegaCont.Guardar);
router.get('/query', BodegaCont.query);
router.get('/list', BodegaCont.list);
router.put('/update', BodegaCont.update);
router.delete('/remove', BodegaCont.remove);
router.put('/activate', BodegaCont.activate);
router.put('/deactivate', BodegaCont.deactivate);
router.post('/BuscarBodegaxEmpresa', BodegaCont.BuscarBodegaxEmpresa);
router.put('/cambiar', BodegaCont.cambiar);
router.post('/mostrarBodegas', BodegaCont.mostrarBodegas);
router.get('/bodegas', BodegaCont.bodegas);




export default router;