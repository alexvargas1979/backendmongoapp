import models from '../models/';

export default {

    Guardar: async(req, res, next) => {
        try {
            //const reg = await models.Articulo.create(req.body);
            const reg = await models.Responsable.create(req.body);
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

            const Buscar = { 'Estado': 1 }
            await models.Responsable.find(Buscar, function(err, Movi) {
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
   mostrarResponsable: async(req, res, next) => {
        try {
            const Buscar = { 'Estado': 1, "empresas" : req.body._id }
            await models.Responsable.find(Buscar, function(err, Movi) {
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
    },remove: async (req,res,next) => {
        try {
            const reg = await models.Responsable.findByIdAndDelete({_id:req.body._id});
            console.log("El dato fue con id " +  req.body._id + " fue eliminado");
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {
            // this.ids = [['Codigo', 'Nombre','Ciudad', 'Direccion', 'Fecha_Creacion'],[]];
            const reg = await models.Responsable.findByIdAndUpdate({_id:req.body._id},{Codigo:req.body.Codigo,Nombre:req.body.Nombre, Ciudad: req.body.Ciudad,Placa_Vehiculo:req.body.Placa_Vehiculo,Tipo_Vehiculo:req.body.Tipo_Vehiculo,Direccion: req.body.Direccion, Fecha_Creacion : req.body.Fecha_Creacion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
   
    },
    BuscarResponsablexEmpresa: async (req,res,next) => {
        try{
            console.log(req.body.Cod_Empresa)
            const V_Empresa = req.body.Cod_Empresa
            const Buscar = {'empresas': V_Empresa,'Estado': 1}
            const Campos = 'Codigo Nombre '
            
            let recordset  = await models.Responsable.find(Buscar,Campos, { lean: true })
              
            console.log(recordset.length);
            if (recordset.length > 0){

                     let output = {"Respuesta":"1","Mensaje":"OK"}
                     res.status(200).json({output,recordset});

            } else{
                let output = {"Respuesta":"0","Mensaje":"No existen Responsables"}
                res.status(404).send({output});
            }
        }catch (e) {
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Responsables"} 
            res.status(500).send({output});
            next(e);      
        }

 
     
    }
}