const { response } = require('express');
const Staff = require('../../db/models/staff.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../../helpers/jwt.helpers')

const crearUsuario = async (req, res = response) => {

    const {
        rut,
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        estadoCivil,
        direccion,
        fechaNacimiento,
        telefono,
        correoPersonal,
        correoEmpresa,
        password1,
        password2,
        nombreBanco,
        tipoCuenta,
        numeroCuenta,
        tipoPrevision,
        nombreIsapre,
        sueldoBruto,
        sueldoLiquido,
        rol
    } = req.body;

    try {
        //Verificar si el rut existe
        const rutPersonal = await Staff.findOne({ rut });

        if (rutPersonal) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un miembro del personal con ese rut'
            })
        };

        const emailPersonal = await Staff.findOne({ email });

        if (emailPersonal) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un miembro del personal con ese email'
            })
        }


        //Crear usuario con el modelo
        const dbStaff = new Staff(req.body);

        //Encriptar las pass
        const salt = bcrypt.genSaltSync();
        dbStaff.password = bcrypt.hashSync(password, salt);

        //Generar el JWT
        const token = await generarJWT(
            dbStaff.id,
            rut,
            nombre,
            segundoNombre,
            apellido,
            segundoApellido,
            estadoCivil,
            direccion,
            fechaNacimiento,
            telefono,
            correoPersonal,
            correoEmpresa,
            password1,
            password2,
            nombreBanco,
            tipoCuenta,
            numeroCuenta,
            tipoPrevision,
            nombreIsapre,
            sueldoBruto,
            sueldoLiquido,
            rol
        );

        //Insertar en DB
        await dbStaff.save();

        //Mandar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbStaff.id,
            rut,
            nombre,
            segundoNombre,
            apellido,
            segundoApellido,
            estadoCivil,
            direccion,
            fechaNacimiento,
            telefono,
            correoPersonal,
            correoEmpresa,
            password1,
            password2,
            nombreBanco,
            tipoCuenta,
            numeroCuenta,
            tipoPrevision,
            nombreIsapre,
            sueldoBruto,
            sueldoLiquido,
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

    let {
        rut,
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        estadoCivil,
        direccion,
        fechaNacimiento,
        telefono,
        correoPersonal,
        correoEmpresa,
        password1,
        password2,
        nombreBanco,
        tipoCuenta,
        numeroCuenta,
        tipoPrevision,
        nombreIsapre,
        sueldoBruto,
        sueldoLiquido,
        rol,
    } = req.body;

    try {

        const personal = await Staff.findOne({ rut });
        console.log(personal);

        if (personal) {

            //Encriptar las pass
            const salt = bcrypt.genSaltSync();
            let pass = bcrypt.hashSync(password, salt);
            password = pass;

            //Generar el JWT
            const token = await generarJWT(
                personal.id,
                rut,
                nombre,
                segundoNombre,
                apellido,
                segundoApellido,
                estadoCivil,
                direccion,
                fechaNacimiento,
                telefono,
                correoPersonal,
                correoEmpresa,
                password1,
                password2,
                nombreBanco,
                tipoCuenta,
                numeroCuenta,
                tipoPrevision,
                nombreIsapre,
                sueldoBruto,
                sueldoLiquido,
                rol
            );

            await Staff.updateOne({ rut }, {
                nombre,
                segundoNombre,
                apellido,
                segundoApellido,
                estadoCivil,
                direccion,
                fechaNacimiento,
                telefono,
                correoPersonal,
                correoEmpresa,
                password1,
                password2,
                nombreBanco,
                tipoCuenta,
                numeroCuenta,
                tipoPrevision,
                nombreIsapre,
                sueldoBruto,
                sueldoLiquido,
                rol
            });

            return res.status(200).json({
                ok: true,
                nombre,
                segundoNombre,
                apellido,
                segundoApellido,
                estadoCivil,
                direccion,
                fechaNacimiento,
                telefono,
                correoPersonal,
                correoEmpresa,
                password1,
                password2,
                nombreBanco,
                tipoCuenta,
                numeroCuenta,
                tipoPrevision,
                nombreIsapre,
                sueldoBruto,
                sueldoLiquido,
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

const obtenerPersonal = async (req, res = response) => {

    try {

        await Staff.find().then(data => {
            if (data) {

                return res.status(200).json({
                    ok: true,
                    data
                });

            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay nada para mostrar'
                })
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const obtenerTrabajador = async (req, res = response) => {
    const { rut } = req.body;
    try {

        await Staff.findOne({ rut }).then(data => {
            if (data) {

                return res.status(200).json({
                    ok: true,
                    data
                });

            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay nada para mostrar'
                })
            }
        })

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
        const token = await generarJWT(
            dbStaff.id,
            dbStaff.rut,
            dbStaff.nombre,
            dbStaff.segundoNombre,
            dbStaff.apellido,
            dbStaff.segundoApellido,
            dbStaff.direccion,
            dbStaff.estadoCivil,
            dbStaff.telefono,
            dbStaff.fechaNacimiento,
            dbStaff.email,
            dbStaff.rol
        );

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbStaff.id,
            nombre: dbStaff.nombre,
            apellido: dbStaff.apellido,
            email: dbStaff.email,
            rol: dbStaff.rol,
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
    obtenerPersonal,
    obtenerTrabajador,
    loginUsuario,
    validarToken
}