import mongoose, {Schema} from 'mongoose';


const BodegaSchema = new Schema({
   
    empresas:{ type: Schema.ObjectId, ref: 'empresas',required:false, default: '5e2f4c3ef80d8246f0e545d8' },
    Nombre: { type: String, maxlength:50,  require: false },
    Descripcion: { type: String, maxlength:255},
    Ciudad: { type: String, maxlength:100},
    Estado: { type: Number, default:1 },
    Fecha_Creacion: { type: Date, default:Date.now}

}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Bodegas = mongoose.model('bodegas',BodegaSchema);
export default Bodegas ;