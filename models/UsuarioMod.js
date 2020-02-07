
import mongoose, {Schema} from 'mongoose';

const UsuarioSchema = new Schema({

    empresas:{ type: Schema.ObjectId, ref: 'empresas',required:true },
    Usuario: { type:String,maxlength:30, required:true},
    Nombre: { type:String,maxlength:50, unique:true, required:true},
    Rol: { type:String,maxlength:30, required:true},  
    Email: { type:String, maxlength:50, unique:true, required:true},
    Password: { type:String, maxlength:64, required:true},
    Estado: { type:Number, default:1},
	Fecha_Creacion: { type: Date, default: Date.now }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Usuarios = mongoose.models.Usuarios || mongoose.model('Usuarios',usuarioSchema);
const Usuarios = mongoose.model('Usuarios',UsuarioSchema);
export default Usuarios;