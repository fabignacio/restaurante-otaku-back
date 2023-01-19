const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, prueba } = require('../../controllers/staff/staff.controller');
const { validarCampos } = require('../../middlewares/validar-campos.middleware.ts')

const router = Router();

//Crear Usuario
router.post('/ingreso', [
    check('rut', 'Es obligatorio').not().isEmpty(),
    check('nombre', 'Es obligatorio').not().isEmpty(),
    check('apellido', 'Es obligatorio').not().isEmpty(),
    check('email', 'Es obligatorio').isEmail(),
    check('password', 'Es obligatorio').isLength({ min: 6 }),
    validarCampos
], crearUsuario)

module.exports = router;