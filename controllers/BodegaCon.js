import models from '../models';
import ModBodega from '../models/BodegaMod';

export default {
    Guardar: async (req,res,next) =>{
        try {
            const recordset = await ModBodega.create(req.body);
           
            if (recordset){

                let output = {"Respuesta":"1","Mensaje":"OK","Nombre":recordset.Nombre}
                res.status(200).json({output});
                
            } else{
                let output = {"Respuesta":"0","Mensaje":"No se inserto la bodega"}               
                res.status(404).send({output});
            }

        } catch (e){
            let output = {"Respuesta":"0","Mensaje":"Error al insertar Bodega"} 
            res.status(500).send({output});
            next(e);
        }
    },
    query: async (req,res,next) => {
        try{
            const reg = await ModBodega.findOne({_id: req.query._id});
            if(!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{
                res.status(200).json(reg);
            }
        }catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);        
        }
    },
    BuscarBodegaxEmpresa: async (req,res,next) => {
        try{
            const V_Empresa = req.body.Cod_Empresa
            const Buscar = {'empresas': V_Empresa,'Estado': 1}
            const Campos = 'Nombre Descripcion'
            
            let recordset  = await ModBodega.find(Buscar,Campos, { lean: true })
              
            console.log(recordset.length);
            if (recordset.length > 0){

                     let output = {"Respuesta":"1","Mensaje":"OK"}
                     res.status(200).json({output,recordset});

            } else{
                let output = {"Respuesta":"0","Mensaje":"No existen Bodegas"}
                res.status(404).send({output});
            }
      
        }catch (e) {
            let output = {"Respuesta":"0","Mensaje":"Error al Buscar Bodegas"} 
            res.status(500).send({output});
            next(e);      
        }

 
     
    },
    list: async (req,res,next) => {
        try {

            let valor=req.query.valor;
            const reg=await models.Bodega.find({$or:[{'Descripcion':new RegExp(valor,'i')},]},{createdAt:0})
            .sort({'createdAt':-1});
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
            const reg = await models.Bodega.findByIdAndUpdate({_id:req.body._id},{Nombre_Bodega:req.body.Nombre_Bodega,descripcion:req.body.descripcion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Bodega.findByIdAndDelete({_id:req.body._id});
            console.log("El dato fue con id " +  req.body._id + " fue eliminado");
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Bodega.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Bodega.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
    ,
cambiar: async (req,res,next) => {
    try {
       const _id = req.body._id
       const nueva_bodega = req.body.nueva_bodega       



       /**
        * {"$inc":{"killed":-3}}
        * */ 


     //  const Actualizar = { "Detalles.$.Cantidad_Reservada" : V_Cant_Reservada }
        
       const recordset= await models.Bodega.updateMany( {'Estado' : '1' },{"$set":{"empresas": "5e2f4c3ef80d8246f0e545d8"}},{multi:true}); 
        
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
mostrarBodegas: async (req,res,next) => {
    try {
        const reg=await models.Bodega.find({'Estado': 1, "empresas" : req.body._id})
        .sort({'createdAt':-1});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
},
}





// const reg = await Modelo.Bodega.find({'Estado': 1,"empresas": ID_Empresa } ).select({'Nombre' : 1, 'Descripcion': 1})
                //.populate('empresas','Nombre_Empresa',Modelo.Empresa);
               // .populate({ path: 'empresas', select: 'Nombre_Empresa', match:{'_id': "5e02ad94fd09ab3ab0a9f4a4"},model: Modelo.Empresa});
  
               //Customer.findOne({}).populate({ path: 'fans', select: 'name', 
                //model: User,match: { age: { $gte: 21 }},options: { limit: 5 } }).      
 /*                    
         await Bodega.find({ 'Estado': 1 }, function(err, Movi) {
               Empresa.populate(Movi, { path: "empresas",match: {"Nombre_Empresa": "Motorola" }, select: ['Nombre_Empresa'] }, function(err, Movi) {
 
                    res.status(200).send(Movi);
                });
            });
*/   
 /*
        Modelo.Bodega.find({ 'Estado': 1 })
        .Empresa.populate("empresas")
                   .exec(function(err,movi){
                    if(movi != null){
                        //console.log("dato" + movi.empresas);
                        res.status(200).json(movi);
                        next();
                    }else{
                        res.status(404).send({
                            message: 'El registro no existe'
                           
                        });
                        console.log("dato" + movi.empresas);
                        console.log("error " + err);
                          
                    }

                   })
*/  