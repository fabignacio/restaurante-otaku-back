const { response } = require('express');
const Staff = require('../../db/models/staff.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../../helpers/jwt.helpers')

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
        const token = await generarJWT(dbStaff.id, rut, nombre, apellido, email, rol);

        //Insertar en DB
        await dbStaff.save();

        //Mandar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbStaff.id,
            rut,
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

const editarUsuario = async (req, res = response) => {

    let { rut, nombre, apellido, email, password, rol } = req.body;

    try {

        const personal = await Staff.findOne({ rut });

        if (personal) {

            //Encriptar las pass
            const salt = bcrypt.genSaltSync();
            let pass = bcrypt.hashSync(password, salt);
            password = pass;

            //Generar el JWT
            const token = await generarJWT(personal.id, rut, nombre, apellido, email, rol);

            await Staff.updateOne({ rut }, {
                nombre,
                apellido,
                email,
                password,
                rol
            });

            return res.status(200).json({
                ok: true,
                rut,
                nombre,
                apellido,
                email,
                rol,
                token
            })

        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un miembro del personal con ese rut'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const eliminarUsuario = async (req, res = response) => {

    const { rut } = req.body;

    try {
        //Verificar si el rut existe
        const personal = await Staff.findOne({ rut });

        if (personal) {

            await Staff.deleteOne({ rut });
            return res.status(200).json({
                ok: true,
                msg: 'Personal eliminado correctamente'
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un miembro del personal con ese rut'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbStaff = await Staff.findOne({ email });

        if (!dbStaff) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            })
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbStaff.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            })
        }

        // Generar el JWT
        const token = await generarJWT(dbStaff.id, dbStaff.nombre, dbStaff.email);

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbStaff.id,
            nombre: dbStaff.nombre,
            email: dbStaff.email,
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

    const { uid, rut, nombre, apellido, email, rol } = req;
    console.log('Validar Token', uid, rut, nombre, apellido, email, rol);

    //Generar el JWT
    const token = await generarJWT(uid, rut, nombre, apellido, email, rol);

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
    editarUsuario,
    eliminarUsuario,
    loginUsuario,
    validarToken
}