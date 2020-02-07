import mongoose, {Schema} from 'mongoose';


const TerceroSchema = new Schema({
   
    empresas:{ type: Schema.ObjectId, ref: 'empresas',required:true },
    Codigo:{type:String,maxlength:30,unique:true,required:true},
    Nombre:{type:String,maxlength:200,unique:true,required:true},
    Tipo_Tercero:{type:String,maxlength:50,required:true},
    Ciudad:{type:String,required:false},
    Direccion:{type:String,required:false},
    Estado:{type:Number,default:1},
    Fecha_Creacion:{type:Date,default:Date.now}
    

}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//export const Empresa = mongoose.models.Empresas || mongoose.model('EmpresaMod',EmpresaSchema);
const Terceros = mongoose.model('terceros',TerceroSchema);
export default Terceros ;
