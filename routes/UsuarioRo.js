import routerx from 'express-promise-router';
import UsuarioCont from '../controllers/UsuarioCon';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/guardar', auth.verifyAdministrador, UsuarioCont.Guardar);
//router.post('/guardar', UsuarioCont.Guardar);
router.post('/login', UsuarioCont.login);

export default router;