import models from '../models/';
import ModMovimiento from '../models/MovimientoMod';

export default {

    Guardar: async (req,res,next) =>{
        try {
            
            console.log(req.body)
            const recordset = await ModMovimiento.create(req.body);
        
            if (recordset){

                let output = {"Respuesta":"1","Mensaje":"OK","Numero_Documento":recordset.Numero_Documento}
                res.status(200).json({output});
                
            } else{
                let output = {"Respuesta":"0","Mensaje":"No se inserto el Movimiento"}               
                res.status(404).send({output});
            }


        } catch (e){
            let output = {"Respuesta":"0","Mensaje":"Error al insertar Movimiento"} 
            res.status(500).send({output});
            next(e);
        }
    },
    //Busca datos con filtro
    listar: async (req, res, next) => {
        try {
            const reg=await models.Movimiento.find()
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
    //Muestra todos los datos de una tabla
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Movimiento.find({$or:[{'Numero_Documento':new RegExp(valor,'i')}]})
            .populate('Detalles.productos','Descripcion Marca',models.Activosfijos)
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    //Muestra todos los datos de una tabla
    BuscarId: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Movimiento.findById(valor)
            .populate('Descripcion',models.Activosfijos)
        
            // const reg = await models.Movimiento.find({ 'Tipo_Documento': tipoMovimiento.toUpperCase()});
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
    BuscarMovimientos: async (req,res,next) => {
        try {
            const V_Empresa = req.body.Cod_Empresa
            const V_Tipo_Documento = req.body.Tipo_Documento
            const V_Estado_Doc = req.body.Estado_Doc

            const Buscar = {'empresas': V_Empresa,'Tipo_Documento': V_Tipo_Documento,'Estado_Documento': V_Estado_Doc}
            const Campos = 'Numero_Documento Fecha_Creacion'

            let recordset = await ModMovimiento.find(Buscar,Campos, { lean: true })
           
            console.log(recordset.length);
            if (recordset.length > 0){

                     let output = {"Respuesta":"1","Mensaje":"OK"}
                     res.status(200).json({output,recordset});
                     
                   
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"Aún no existen traslados"}               
                res.status(200).send({output});
            }


        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Movimiento"} 
            res.status(500).send({output});
            next(e);
        }
    },

    EliminarMovimientos: async (req,res,next) => {
        try {
            const V_Empresa = req.body.Cod_Documento
            const V_Tipo_Documento = req.body.Tipo_Documento
            const V_Numero_Documento = req.body.id_producto

            console.log(V_Empresa)
            console.log(V_Tipo_Documento)
            console.log(V_Numero_Documento)

           // const Buscar = {'_id': V_Empresa,'Tipo_Documento': V_Tipo_Documento,'Numero_Documento': V_Numero_Documento}
           
           /**
            * collection.update(
  { 'Numero_Documento': V_Numero_Documento },
  { $pull: { 'contact.phone': { number: '+1786543589455' } } }
);
            * 
            * */ 
            let recordset = await ModMovimiento.update( { '_id': V_Empresa },  { $pull: { 'Detalles': { productos : V_Numero_Documento } } } )
            
            
            if (recordset){
                    let output = {"Respuesta":"1","Mensaje":"OK","Numero_Documento":recordset.Numero_Documento}
                    res.status(200).json({output});
                   // res.status(200).json({output,recordset});
                    console.log(recordset.Numero_Documento);
               
            } else{
                let output = {"Respuesta":"0","Mensaje":"No existe el movimiento"}               
                res.status().send({output});
            }


        } catch(e){
            let output = {"Respuesta":"0","Mensaje":"Error eliminando Movimiento"} 
            res.status(500).send({output});
            next(e);
        }
    },
    mostrarTraslados: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Movimiento.find({$or:[{'Numero_Documento':new RegExp(valor,'i')}]})
            .populate('Detalles.productos','Descripcion',models.Activosfijos)
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    EliminarTraslados: async (req,res,next) => {
        try {
            const V_Empresa = req.body.Cod_Documento
            const V_Tipo_Documento = req.body.Tipo_Documento
            const V_Numero_Documento = req.body.Numero_Documento

            console.log(V_Empresa)
            console.log(V_Tipo_Documento)
            console.log(V_Numero_Documento)

            const Buscar = {'_id': V_Empresa,'Tipo_Documento': V_Tipo_Documento,'Numero_Documento': V_Numero_Documento}
           
           
            let recordset = await ModMovimiento.findOneAndDelete(Buscar)
            
            
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
    EliminarXDocumento: async (req,res,next) => {
        try {
            const V_Numero_Documento = req.body.Numero_Documento



            const Buscar = {'Numero_Documento': V_Numero_Documento}
           
           
            let recordset = await ModMovimiento.remove(Buscar)
            
            
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
    actualizarDocumento : async (req,res,next) => {
        try {
           
            const numero_documento  = req.body.Numero_Documento
            const numero_documento_afectado = req.body.Numero_Documento_Afectado
            const productos = req.body.productos
            const cantidad = req.body.Cantidad
            const precio = req.body.Precio
            const unidad_medida = req.body.Unidad_Medida


            console.log("Numero de documento: " + numero_documento)



          //  let recordset = await ModMovimiento.update({Numero_Documento:numero_documento}, {$push: {Detalles:{ $each: [ { Numero_Documento_Afectado: numero_documento_afectado,productos: productos, Cantidad: cantidad, Precio: precio,Unidad_Medida: unidad_medida }]}}})
          let recordset = await ModMovimiento.update({Numero_Documento:numero_documento}, {$push: {Detalles:{ $each: [ { productos: productos, Cantidad: cantidad}]}}})


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
    },recuperarUltimoRegistro: async (req,res,next) => {
        try {
           
            let reg = await  ModMovimiento.find().sort({$natural:-1}).limit(1);
        
            // const reg = await models.Movimiento.find({ 'Tipo_Documento': tipoMovimiento.toUpperCase()});
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
    },remove: async (req,res,next) => {
        try {
            const reg = await models.Movimiento.findByIdAndDelete({productos:req.body._id});
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
            //this.ids = [['Tipo_Documento', "Centro_Costos", "Prioridad", "Estado_Documento","Observaciones", "Fecha_Creacion"],[]];
            const reg = await models.Movimiento.findByIdAndUpdate({_id:req.body._id},{Tipo_Documento:req.body.Tipo_Documento,Centro_Costos:req.body.Centro_Costos, Prioridad: req.body.Prioridad, Estado_Documento: req.body.Estado_Documento, Observaciones : req.body.Observaciones,Fecha_Creacion : req.body.Fecha_Creacion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
   
    },

    //Busca datos con filtro
    listarxFecha: async (req, res, next) => {
        try {

            
            //Guardando el rango de fechas
          const  fechaInicial = req.body.fecha_inicial;
          const  fechaFinal = req.body.fecha_final;
            //Guardandoe el tipo de movimiento
           const tipoMovimiento = req.body.tipo_movimiento;
            //Comprobando los filtro que tienen datos
           console.log(fechaInicial)
           console.log(fechaFinal)
           console.log(tipoMovimiento)
           const Buscar = { 'Fecha_Creacion': { $gte: fechaInicial, $lte: fechaFinal},'Tipo_Documento': tipoMovimiento.toUpperCase() }
           
           const reg = await ModMovimiento.find(Buscar);
          // const reg = await models.Movimiento.find({ 'Tipo_Documento': tipoMovimiento.toUpperCase()});
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }

        } catch (e) {
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Movimiento"} 
            res.status(500).send({output});
            next(e);
        }

    },
    cambiarEstado: async (req,res,next) => {
        try {
            //this.ids = [['Tipo_Documento', "Centro_Costos", "Prioridad", "Estado_Documento","Observaciones", "Fecha_Creacion"],[]];
            const reg = await models.Movimiento.update({Numero_Documento:req.body.Numero_Documento}, { $set: { Estado_Documento : 'PR', Fecha_Procesado : req.body.Fecha_Procesado}});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
   
    },
    //Busca datos con filtro
    mostrarMovimientos: async (req, res, next) => {
        try {
            const reg=await models.Movimiento.find({'Estado': 1, "empresas" : req.body._id})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Bodega_Origen','Descripcion',models.Bodega)
            .populate('Bodega_Destino','Descripcion',models.Bodega)
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }

    },
    //Busca datos con filtro
    mostrarMovimientosWeb: async (req, res, next) => {
        try {
            console.log(req.body)
            const movimientos=await models.Movimiento.find({'Estado': 1, "empresas" : req.body._id})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Bodega_Origen','Descripcion',models.Bodega)
            .populate('Bodega_Destino','Descripcion',models.Bodega)
            .populate('Detalles.productos','Codigo Descripcion',models.Activosfijos) 
            .sort({'createdAt':-1});

            let response = {movimientos}
            res.status(200).json(response);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }

    },
    //Busca datos con filtro
    buscarXNumeroDocumento: async (req, res, next) => {
        try {
            console.log(req.body)
            const movimientos=await models.Movimiento.find({ "empresas" : req.body._id,"Numero_Documento" : req.body.Numero_Documento})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Bodega_Origen','Descripcion',models.Bodega)
            .populate('Bodega_Destino','Descripcion',models.Bodega)
            .populate('Detalles.productos','Descripcion',models.Activosfijos)
            .sort({'createdAt':-1});

            let response = {movimientos}
            res.status(200).json(response);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }

    },
    actualizarObservaciones: async (req,res,next) => {
        try {
            const reg = await models.Movimiento.update({Numero_Documento:req.body.Numero_Documento}, { $set: { Observaciones : req.body.Observaciones }});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
   
    },
    filtrarMovimientosFecha: async (req,res,next) => {
        try {
            const movimientos = await models.Movimiento.find({"Fecha_Filtro":{ $gte:new Date(req.body.FECHA_INICIAL), $lt:new Date(req.body.FECHA_FINAL) }})
            .populate('empresas','Nombre_Empresa',models.Empresa)
            .populate('Bodega_Origen','Descripcion',models.Bodega)
            .populate('Bodega_Destino','Descripcion',models.Bodega)
            .populate('Detalles.productos','Codigo Descripcion',models.Activosfijos) 
            .sort({'createdAt':-1});
            
            let response = {movimientos}
            res.status(200).json(response);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
   
    }
}