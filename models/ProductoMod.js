import mongoose, { Schema } from 'mongoose';


const ProductoSchema = new Schema({

    empresas: { type: Schema.ObjectId, ref: 'empresas', required: false },
    Codigo: { type: String, maxlength: 30, required: false },
    Codigo_Barras: { type: String, maxlength: 30, required: false },
    Descripcion: { type: String, maxlength: 200, required: false },
    Marca: { type: String, maxlength: 100, required: false },
    Grupo: { type: String, maxlength: 100, required: false },
    Detalles: [{
        bodegas: { type: Schema.ObjectId, ref: 'bodegas', required: false },
        Cantidad: { type: Number, required: false },
        Cantidad_Reservada: { type: Number, required: false, default: 0 },
        Unidad_Medida: { type: String, maxlength: 20, required: false },
        Precio: { type: Number, required: false }
    }],
    Talla: { type: String, required: false },
    Color: { type: String, required: false },
    Minimo: { type: Number, required: false },
    Maximo: { type: Number, required: false },
    Estado: { type: Number, default: 1 },
    Fecha_Creacion: { type: Date, default: Date.now }


}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Productos = mongoose.model('productos', ProductoSchema);
export default Productos;