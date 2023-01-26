const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerPersonal,
    obtenerTrabajador,
    loginUsuario,
    validarToken,
} = require('../../controllers/staff/staff.controller');
const { validarCampos, validarJWT } = require('../../middlewares/validar-campos.middleware.ts')

const router = Router();

//Crear Usuario
router.post('/registro', [
    check('rut', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('nombre', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('segundoNombre', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('apellido', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('segundoApellido', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('estadoCivil', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('direccion', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('fechaNacimiento', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('telefono', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('correoPersonal', 'Este campo es obligatorio').isEmail(),
    check('correoEmpresa', 'Este campo es obligatorio').isEmail(),
    check('password1', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 8 }),
    check('password2', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 8 }),
    check('nombreBanco', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('tipoCuenta', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('numeroCuenta', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('tipoPrevision', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('nombreIsapre'),
    check('sueldoBruto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('sueldoLiquido', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    validarCampos
], crearUsuario);

//Editar Personal
router.post('/editar', [
    check('nombre').isLength({ min: 4 }),
    check('segundoNombre').isLength({ min: 4 }),
    check('apellido').isLength({ min: 4 }),
    check('segundoApellido').isLength({ min: 4 }),
    check('estadoCivil').isLength({ min: 4 }),
    check('direccion').isLength({ min: 4 }),
    check('fechaNacimiento').isLength({ min: 4 }),
    check('telefono').isLength({ min: 4 }),
    check('correoPersonal').isLength({ min: 4 }),
    check('correoEmpresa').isLength({ min: 4 }),
    check('password1').isLength({ min: 4 }),
    check('password2').isLength({ min: 4 }),
    check('nombreBanco').isLength({ min: 4 }),
    check('tipoCuenta').isLength({ min: 4 }),
    check('numeroCuenta').isLength({ min: 4 }),
    check('tipoPrevision').isLength({ min: 4 }),
    check('nombreIsapre'),
    check('sueldoBruto').isLength({ min: 4 }),
    check('sueldoLiquido').isLength({ min: 4 }),
    validarCampos
], editarUsuario);

//Eliminar Personal
router.delete('/eliminar', [], eliminarUsuario);

//Obtener Personal
router.get('/listado', [], obtenerPersonal);

//Obtener Trabajador
router.get('/buscar', [], obtenerTrabajador);

//Login
router.post('/ingreso', [
    check('correoEmpresa', 'El email es obligatorio').isEmail(),
    check('password1', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

//Token
router.get('/token', validarJWT, validarToken);

module.exports = router;