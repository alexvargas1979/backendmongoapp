import models from '../models';

export default {

    Guardar: async (req,res,next) =>{
        try {
            //const reg = await models.Articulo.create(req.body);
            console.log(req.body)
            const reg = await models.Activosfijos.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {

            let valor=req.query.valor;
            const reg=await models.Activosfijos.find({"Codigo" : valor})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('bodegas','Descripcion',models.Bodega)
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    mostrarProductos: async (req,res,next) => {
        try {

            console.log(req.body._id)
            const reg=await models.Activosfijos.find({"empresas" : req.body._id})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Detalles.bodegas','Nombre',models.Bodega)
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    BuscarAFxEmpresa: async (req,res,next) => {
        try{
            const V_Codigo = req.body.Codigo
            const V_Empresa = req.body.Cod_Empresa
            const Buscar = {'empresas': V_Empresa, 'Codigo':V_Codigo,'Estado': 1}
            const Campos = 'Nombre Descripcion'
            
            let recordset  = await models.Activosfijos.find(Buscar,Campos, { lean: true })
              
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
            const reg=await models.Activosfijos.findById(valor)
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
    
    update: async (req,res,next) => {
        try {
            //{Codigo:{type:'TextField'},Descripcion:{type:'TextField'},Marca:{type:'TextField'},Grupo:{type:'TextField'}
            const reg = await models.Activosfijos.findByIdAndUpdate({_id:req.body._id},{Codigo:req.body.Codigo, Descripcion: req.body.Descripcion, Grupo : req.body.Grupo});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },remove: async (req,res,next) => {
        try {
            const reg = await models.Activosfijos.findByIdAndDelete({_id:req.body._id});
            console.log("El dato fue con id " +  req.body._id + " fue eliminado");
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }, actualizarDocumento : async (req,res,next) => {
        try {
           
            const numero_documento  = req.body.Numero_Documento
            const numero_documento_afectado = req.body.Numero_Documento_Afectado
            const productos = req.body.productos
            const cantidad = req.body.Cantidad
            const precio = req.body.Precio
            const unidad_medida = req.body.Unidad_Medida


            console.log(numero_documento)



            let recordset = await ModMovimiento.update({Numero_Documento:numero_documento}, {$push: {Detalles:{ $each: [ { productos: productos }]}}})


            if (recordset){
                    let output = {"Respuesta":"1","Mensaje":"OK","Numero_Documento":recordset.Numero_Documento}
                    res.status(200).json({output});
                   // res.status(200).json({output,recordset});
                    console.log(recordset.Numero_Documento);
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"No existe el movimiento"}               
                res.status(404).send({output});
            }


        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error eliminando Movimiento"} 
            res.status(500).send({output});
            next(e);
        }
    },
    ActualizarReserva: async (req,res,next) => {
        try {
           const _id = req.body._id
           const V_Reservado = req.body.V_Reservado       



           /**
            * {"$inc":{"killed":-3}}
            * */ 

 
         //  const Actualizar = { "Detalles.$.Cantidad_Reservada" : V_Cant_Reservada }
            
           const recordset= await models.Activosfijos.findOneAndUpdate( {'_id': _id },{"$set":{"Reservado": V_Reservado}}); 
            
            if (recordset){
                let output = {"Respuesta":"0","Mensaje":"El dato se actualizo correctamente"}               
                res.status(200).send({output}); 
                   // res.status(200).json({output,recordset});
    
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"El dato se actualizo correctamente"}               
                res.status(200).send({output}); 
            }

        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error Actualizando Cantidad"} 
            res.status(500).send({output});
            next(e);
        }
    },
    procesar: async (req,res,next) => {
        try {
           const _id = req.body._id
           const nueva_bodega = req.body.nueva_bodega       



           /**
            * {"$inc":{"killed":-3}}
            * */ 

 
         //  const Actualizar = { "Detalles.$.Cantidad_Reservada" : V_Cant_Reservada }
            
           const recordset= await models.Activosfijos.findOneAndUpdate( {'_id': _id },{"$set":{"bodegas": nueva_bodega, "Reservado" : false}}); 
            
            if (recordset){
                let output = {"Respuesta":"0","Mensaje":"El dato se actualizo correctamente"}               
                res.status(200).send({output}); 
                   // res.status(200).json({output,recordset});
    
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"El dato se actualizo correctamente"}               
                res.status(200).send({output}); 
            }

        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error Actualizando Cantidad"} 
            res.status(500).send({output});
            next(e);
        }
    },
    cambiar: async (req,res,next) => {
        try {
           const _id = req.body._id
           const nueva_bodega = req.body.nueva_bodega       



           /**
            * {"$inc":{"killed":-3}}
            * */ 

 
         //  const Actualizar = { "Detalles.$.Cantidad_Reservada" : V_Cant_Reservada }
            
           const recordset= await models.Activosfijos.updateMany( {'Estado' : '1' },{"$set":{"empresas": "5e2f4c3ef80d8246f0e545d8"}},{multi:true}); 
            
            if (recordset){
                let output = {"Respuesta":"0","Mensaje":"El dato se actualizo correctamente"}               
                res.status(200).send({output}); 
                   // res.status(200).json({output,recordset});
    
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"El dato se actualizo correctamente"}               
                res.status(200).send({output}); 
            }

        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error Actualizando Cantidad"} 
            res.status(500).send({output});
            next(e);
        }
    },
    comprobarCodigo: async (req,res,next) => {
        try{

            console.log(req.body.Codigo + "codigo")
            const reg=await models.Activosfijos.findOne({'Codigo':  req.body.Codigo})
              
            console.log(reg);

            if (!reg) {
                res.status(200).send({
                    Respuesta: '0'
                });
            } else {
                res.status(200).send({
                    Respuesta: '1'
                });
            }
        }catch (e) {
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Productos"} 
            res.status(500).send({output});
            next(e);      
        }
    }, mostrarProductosweb: async (req,res,next) => {
        try {

            console.log(req.body._id)
            const productos=await models.Activosfijos.find({"empresas" : req.body._id})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('bodegas','Nombre',models.Bodega)
            .sort({'createdAt':-1});
            let response = {productos}
            res.status(200).json(response);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}