import mongoose, {Schema} from 'mongoose';


const EmpresaSchema = new Schema({
   
    Nombre_Empresa: { type:String,maxlength:200, unique:true, required:true},
    Tipo_Producto: { type:String,maxlength:50, unique:true, required:true},
    Estado: { type:Number, default:1},
	Fecha_Creacion: { type: Date, default: Date.now }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Empresa = mongoose.model('Empresas',EmpresaSchema);
export default Empresa ;