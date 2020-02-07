import mongoose, { Schema } from 'mongoose';


const ActivosFijosSchema = new Schema({

    empresas: { type: Schema.ObjectId, ref: 'empresas', required: false, default: '5e2f4c3ef80d8246f0e545d8' },
    Codigo_Barras: { type: String, maxlength: 30, required: false },
    Codigo: { type: String, maxlength: 30, required: false },
    Descripcion: { type: String, maxlength: 200, required: false },
    Marca: { type: String, maxlength: 100, required: false },
    Grupo: { type: String, maxlength: 100, required: false },
    bodegas: { type: Schema.ObjectId, ref: 'bodegas', required: false},
    Reservado: { type: Boolean, default: false },
    Estado: { type: Number, default: 1 },
    Fecha_Creacion: { type: Date, default: Date.now }


}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Activosfijos = mongoose.model('activosfijos', ActivosFijosSchema);
export default Activosfijos;