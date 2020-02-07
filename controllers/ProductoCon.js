import models from '../models';

export default {

    Guardar: async (req,res,next) =>{
        try {
            //const reg = await models.Articulo.create(req.body);
            console.log(req.body)
            const reg = await models.Producto.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    buscarxCodigo: async (req,res,next) => {
        try {

            let valor=req.query.valor;
            console.log(valor)
            const Buscar ={'Codigo': valor,'Estado': 1}
            
            const reg=await models.Producto.findOne({'Codigo': valor})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Detalles.bodegas','Nombre',models.Bodega)
            .sort({'createdAt':-1});
            if (!reg) {
                res.status(200).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    BuscarProductoxEmpresa: async (req,res,next) => {
        try{
            const V_Codigo = req.body.Codigo
            const V_Empresa = req.body.Cod_Empresa
            const Buscar = {'empresas': V_Empresa, 'Codigo':V_Codigo,'Estado': 1}
            const Campos = 'Nombre Descripcion'
            
            let recordset  = await models.Producto.find(Buscar,Campos, { lean: true })
              
            console.log(recordset.length);
            if (recordset.length > 0){

                     let output = {"Respuesta":"1","Mensaje":"OK"}
                     res.status(200).json({output,recordset});

            } else{
                let output = {"Respuesta":"0","Mensaje":"No existen Productos"}
                res.status(404).send({output});
            }
      
        }catch (e) {
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Productos"} 
            res.status(500).send({output});
            next(e);      
        }

 
     
    },
    buscarPorId: async (req,res,next) => {
        try {

            let valor=req.query.valor;
            const reg=await models.Producto.findById(valor)
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Detalles.bodegas','Nombre',models.Bodega)
            .sort({'createdAt':-1});
            
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    ActualizarCantReservada: async (req,res,next) => {
        try {
           const V_Id_Producto = req.body._id
           const V_Id_Bodega = req.body.id_bodega
           const V_Cant_Reservada = req.body.Cantidad_Reservada

           console.log(req.body._id)
           console.log(req.body.id_bodega)
           console.log(req.body.Cantidad_Reservada)



           /**
            * {"$inc":{"killed":-3}}
            * */ 

 
         //  const Actualizar = { "Detalles.$.Cantidad_Reservada" : V_Cant_Reservada }
            
           const recordset= await models.Producto.findOneAndUpdate( {'_id': V_Id_Producto,'Detalles.bodegas': V_Id_Bodega },{"$inc":{"Detalles.$.Cantidad_Reservada": V_Cant_Reservada}}); 
            
            if (recordset){
                let output = {"Respuesta":"0","Mensaje":"El dato se elimino correctamente"}               
                res.status(200).send({output}); 
                   // res.status(200).json({output,recordset});
    
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"El dato se elimino correctamente"}               
                res.status(200).send({output}); 
            }

        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error Actualizando Cantidad"} 
            res.status(500).send({output});
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {
            //{Codigo:{type:'TextField'},Descripcion:{type:'TextField'},Marca:{type:'TextField'},Grupo:{type:'TextField'}
            const reg = await models.Producto.findByIdAndUpdate({_id:req.body._id},{Codigo:req.body.Codigo, Descripcion: req.body.Descripcion, Grupo : req.body.Grupo});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },remove: async (req,res,next) => {
        try {
            const reg = await models.Producto.findByIdAndDelete({_id:req.body._id});
            console.log("El dato fue con id " +  req.body._id + " fue eliminado");
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}