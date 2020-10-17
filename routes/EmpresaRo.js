import routerx from 'express-promise-router';
import EmpresaCont from '../controllers/EmpresaCon';

const router = routerx();

router.post('/guardar', EmpresaCont.add);
router.get('/query', EmpresaCont.query);
router.get('/list', EmpresaCont.list);
router.put('/update', EmpresaCont.update);
router.delete('/remove', EmpresaCont.remove);
router.put('/activate', EmpresaCont.activate);
router.put('/deactivate', EmpresaCont.deactivate);


export default router;