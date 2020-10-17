import routerx from 'express-promise-router';
import CentroCostosCont from '../controllers/CentroCostosCon';

const router = routerx();

router.post('/guardar', CentroCostosCont.Guardar);
router.get('/listar', CentroCostosCont.Listar);
router.post('/BuscarCentroCostosxEmpresa', CentroCostosCont.BuscarCentroCostosxEmpresa);



export default router;