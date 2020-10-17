import models from '../models/TerceroMod';

export default {

    Guardar: async (req,res,next) =>{
        try {
            //const reg = await models.Articulo.create(req.body);
            const reg = await models.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}