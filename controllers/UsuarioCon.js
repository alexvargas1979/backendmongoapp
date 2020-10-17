import ModUsuario from '../models/UsuarioMod';
import bcrypt from 'bcryptjs';
import token from '../services/token';
import models from '../models';

export default {

    Guardar: async (req, res, next) => {
        try {
            req.body.Password = await bcrypt.hash(req.body.Password, 10);
            const reg = await ModUsuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const V_Usuario = req.body.Usuario
            const V_Password = req.body.Password
            const Buscar = { 'Usuario': V_Usuario, 'Estado': 1 }
            const Campos = 'Nombre Usuario Password _id Rol'

            let recordset = await ModUsuario.findOne(Buscar, Campos, { lean: true })
                .populate('empresas', 'Tipo_Producto', models.Empresa)

            if (recordset) {
                let match = await bcrypt.compare(V_Password, recordset.Password);

                if (match) {
                    let tokenReturn = await token.encode(recordset._id);
                    let user = { "Respuesta": "1", "Mensaje": "registrado", "Empresa": recordset.empresas, "Usuario": recordset._id, "Rol": recordset.Rol }
                    res.status(200).json({ user, tokenReturn });
                } else {
                    let output = { "Respuesta": "0", "Mensaje": "El usuario o clave ingresadas son incorrectas. Verifique nuevamente la información", "Empresa": "0" }

                    res.status(404).send({ output });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }


        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}