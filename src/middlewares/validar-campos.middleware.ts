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

        const {
            uid,
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
            nombreBanco,
            tipoCuenta,
            numeroCuenta,
            tipoPrevision,
            nombreIsapre,
            sueldoBruto,
            sueldoLiquido,
            rol
        } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.rut = rut;
        req.nombre = nombre;
        req.segundoNombre = segundoNombre;
        req.apellido = apellido;
        req.segundoApellido = segundoApellido;
        req.estadoCivil = estadoCivil;
        req.direccion = direccion;
        req.fechaNacimiento = fechaNacimiento;
        req.telefono = telefono;
        req.correoPersonal = correoPersonal;
        req.correoEmpresa = correoEmpresa;
        req.nombreBanco = nombreBanco;
        req.tipoCuenta = tipoCuenta;
        req.numeroCuenta = numeroCuenta;
        req.tipoPrevision = tipoPrevision;
        req.nombreIsapre = nombreIsapre;
        req.sueldoBruto = sueldoBruto;
        req.sueldoLiquido = sueldoLiquido;
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