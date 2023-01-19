const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearUsuario,
    editarUsuario,
    loginUsuario,
    validarToken
} = require('../../controllers/staff/staff.controller');
const { validarCampos, validarJWT } = require('../../middlewares/validar-campos.middleware.ts')

const router = Router();

//Crear Usuario
router.post('/registro', [
    check('rut', 'Es obligatorio').not().isEmpty(),
    check('nombre', 'Es obligatorio').not().isEmpty(),
    check('apellido', 'Es obligatorio').not().isEmpty(),
    check('email', 'Es obligatorio').isEmail(),
    check('password', 'Es obligatorio').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

//Editar Personal
router.post('/editar', [
    check('nombre', 'Es obligatorio').not().isEmpty(),
    check('apellido', 'Es obligatorio').not().isEmpty(),
    check('email', 'Es obligatorio').isEmail(),
    check('password', 'Es obligatorio').isLength({ min: 6 }),
    validarCampos
], editarUsuario)

//Login
router.post('/ingreso', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

//Token
router.get('/token', validarJWT, validarToken);

module.exports = router;