import models from '../models/';
import ModCentroCostos from '../models/CentroCostosMod';

export default {

    Guardar: async(req, res, next) => {
        try {

            const reg = await models.CentroCostos.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    Listar: async(req, res, next) => {
        try {

            await models.CentroCostos.find({ 'Estado': 1 }, function(err, Movi) {
                models.Empresa.populate(Movi, { path: "empresas", select: ['Nombre_Empresa'] }, function(err, Movi) {
                    res.status(200).send(Movi);
                });

            });

        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    //Creado por Alexander Vargas  -  22-ene-2020
    BuscarCentroCostosxEmpresa: async (req,res,next) => {
        try{
            const V_Empresa = req.body.Cod_Empresa
            const Buscar = {'empresas': V_Empresa,'Estado': 1}
            const Campos = 'Codigo Nombre'
            
            let recordset  = await ModCentroCostos.find(Buscar,Campos, { lean: true })
              
            console.log(recordset.length);
            if (recordset.length > 0){

                     let output = {"Respuesta":"1","Mensaje":"OK"}
                     res.status(200).json({output,recordset});

            } else{
                let output = {"Respuesta":"0","Mensaje":"No existen Centros Costos"}
                res.status(404).send({output});
            }
      
        }catch (e) {
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Centro Costos"} 
            res.status(500).send({output});
            next(e);      
        }

 
     
    }


}