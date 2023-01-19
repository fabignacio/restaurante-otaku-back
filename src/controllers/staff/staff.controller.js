const { response } = require('express');
const Staff = require('../../db/models/staff.models');
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res = response) => {

    const { rut, nombre, apellido, email, password, rol } = req.body;

    try {
        //Verificar si el rut existe
        const personal = await Staff.findOne({ rut });

        if (personal) {

            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un miembro del personal con ese rut'
            })
        }

        //Crear usuario con el modelo
        const dbStaff = new Staff(req.body);

        //Encriptar las pass
        const salt = bcrypt.genSaltSync();
        dbStaff.password = bcrypt.hashSync(password, salt);

        //Generar el JWT
        const token = await generarJWT(dbStaff.id, rut, nombre, apellido, email, password, rol);

        //Insertar en DB
        await dbStaff.save();

        //Mandar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbStaff.id,
            nombre,
            apellido,
            email,
            rol,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const validarToken = async (req, res = response) => {

    const { uid, rut, nombre, apellido, email, password, rol } = req;

    //Generar el JWT
    const token = await generarJWT(uid, rut, nombre, apellido, email, password, rol);

    return res.json({
        ok: true,
        uid,
        rut,
        nombre,
        apellido,
        email,
        rol,
        token
    });
}

module.exports = {
    crearUsuario,


    validarToken
}