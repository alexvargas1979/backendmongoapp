import mongoose, { Schema } from 'mongoose';


const CentroCostosSchema = new Schema({

    empresas: { type: Schema.ObjectId, ref: 'empresas', required: true },
    Codigo: { type: String, maxlength: 30, required: true },
    Nombre: { type: String, maxlength: 200, required: true },
    Estado: { type: Number, default: 1 },
    Fecha_Creacion: { type: Date, default: Date.now }


}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const CentroCostos = mongoose.model('centrocostos', CentroCostosSchema);
export default CentroCostos;