import routerx from 'express-promise-router';
import ResponsableCont from '../controllers/ResponsableCon';

const router = routerx();

router.post('/guardar', ResponsableCont.Guardar);
router.get('/listar', ResponsableCont.Listar);
router.delete('/remove',ResponsableCont.remove);
router.put('/update',ResponsableCont.update);
router.post('/BuscarResponsablexEmpresa', ResponsableCont.BuscarResponsablexEmpresa);
router.post('/mostrarResponsable', ResponsableCont.mostrarResponsable);


export default router;