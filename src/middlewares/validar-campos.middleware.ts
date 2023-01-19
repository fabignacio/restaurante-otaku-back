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

        const { uid, nombre, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.nombre = nombre;
        req.email = email;

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