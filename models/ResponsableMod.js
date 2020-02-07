import mongoose, { Schema } from 'mongoose';


const ResponsablesSchema = new Schema({

    empresas: { type: Schema.ObjectId, ref: 'empresas', required: false, default: '5e2f4c3ef80d8246f0e545d8' },
    Codigo: { type: String, maxlength: 30, required: false },
    Nombre: { type: String, maxlength: 200, required: false },
    Ciudad: { type: String, required: false },
    Placa_Vehiculo: { type: String, required: false },
    Tipo_Vehiculo: { type: String, required: false },
    Direccion: { type: String, required: false },
    Estado: { type: Number, default: 1 },
    Fecha_Creacion: { type: Date, default: Date.now }


}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Responsables = mongoose.model('responsables', ResponsablesSchema);
export default Responsables;