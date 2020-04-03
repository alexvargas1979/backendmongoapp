import mongoose, {Schema} from 'mongoose';
//var usuarios = mongoose.model('usuarios')

const MovimientoSchema = new Schema({

    usuarios:{type: Schema.ObjectId, ref: 'usuarios',required:false },
    empresas:{ type: Schema.ObjectId, ref: 'empresas',required:false },
    //bodegas:{ type: Schema.ObjectId, ref: 'bodegas',required:true },
    Tipo_Documento:{ type:String,maxlength:10,required:false},
    Numero_Documento:{ type:String,maxlength:20,required:false},
    Bodega_Origen:{ type: Schema.ObjectId, ref: 'bodegas',required:false },
    Bodega_Destino:{ type: Schema.ObjectId, ref: 'bodegas',required:false },
    terceros:{ type: Schema.ObjectId, ref: 'terceros',required:false },
    Detalles: [{
        Numero_Documento_Afectado:{ type:String,maxlength:20,required:false},
        productos:{ type: Schema.ObjectId, ref: 'productos',required:false }, 
        Cantidad:{type: String,maxlength:50,required:false},
        Precio:{type:Number, required:false},
        Unidad_Medida:{ type:String,maxlength:20,required:false}
    }],
    Responsable:{ type:String,maxlength:20,required:false},
    Placa_Vehiculo:{ type:String,maxlength:20,required:false},
    Centro_Costos:{ type:String,maxlength:20,required:false},
    Prioridad:{ type:String,maxlength:20,required:false},
    Estado_Documento:{ type:String,maxlength:10,required:true},
    Observaciones:{ type:String,maxlength:500,required:false},  
    Fecha_Creacion: { type: String,maxlength:50},
    Fecha_Filtro: { type: Date, default: Date.now()},
    Estado: { type:Number, default:1},
    Fecha_Procesado: { type:String,maxlength:50,required:false},
    Numero_Documento_Cliente:{ type:String,maxlength:20,required:false}

}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Movimientos = mongoose.model('movimientos',MovimientoSchema);
export default Movimientos ;