const { response } = require('express');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')

const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        })
    }

    try {

        const { uid, rut, nombre, apellido, email, rol } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        console.log('Validar JWT', uid, rut, nombre, apellido, email, rol)
        req.uid = uid;
        req.rut = rut;
        req.nombre = nombre;
        req.apellido = apellido;
        req.email = email;
        req.rol = rol;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    //Todo okey
    next();
}

module.exports = {
    validarCampos,
    validarJWT
}