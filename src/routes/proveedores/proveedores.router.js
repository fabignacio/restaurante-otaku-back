const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos.middleware.ts')

const {
    buscarProveedor,
    buscarProveedores,
    crearProveedor,
    editarProveedor,
    eliminarProveedor,
} = require('../../controllers/proveedores/proveedores.controller');

const router = Router();

//Crear Proveedores
router.post('/registro-proveedores', [
    check('rutProveedor', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('nombre', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('direccion', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('direccionComercial', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('tipoProducto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('telefonoContacto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('emailContacto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    validarCampos
], crearProveedor);

//Editar Proveedores
router.post('/editar-proveedor', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('direccion', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('direccionComercial', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('tipoProducto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('telefonoContacto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    check('emailContacto', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4 }),
    validarCampos
], editarProveedor);

//Eliminar Proveedor
router.delete('/eliminar-proveedor', [], eliminarProveedor);

//Obtener Proveedores
router.get('/buscar/', buscarProveedores);

//Obtener Proveedor
router.get('/buscar/:rutProveedor', buscarProveedor);

module.exports = router;