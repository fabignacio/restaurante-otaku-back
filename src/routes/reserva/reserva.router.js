const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearReserva,
    eliminarReserva,
    editarReserva,
    obtenerReserva,
    reservaCliente,
} = require('../../controllers/reserva/reserva.controller');
const { validarCampos } = require('../../middlewares/validar-campos.middleware.ts')

const router = Router();

//Crear Reserva
router.post('/crear', [
    check('rutCliente', 'Es obligatorio').not().isEmpty(),
    check('nombreCliente', 'Es obligatorio').isLength({ min: 3 }),
    check('correoCliente', 'Es obligatorio').isEmail(),
    check('cantidadPersonas', 'Es obligatorio').isNumeric(),
    check('fecha', 'Es obligatorio').not().isEmpty(),
    check('hora', 'Es obligatorio').not().isEmpty(),
    validarCampos
], crearReserva);

//Editar Reserva
router.put('/editar', [
    check('nombreCliente', 'Es obligatorio').isLength({ min: 3 }),
    check('correoCliente', 'Es obligatorio').isEmail(),
    check('cantidadPersonas', 'Es obligatorio').isNumeric(),
    check('fecha', 'Es obligatorio').not().isEmpty(),
    check('hora', 'Es obligatorio').not().isEmpty(),
    validarCampos
], editarReserva)

//Eliminar Reserva
router.delete('/cancelar', [], eliminarReserva);

//Listar Reserva
router.get('/reservas', [], obtenerReserva);

//Listar Reserva por Cliente
router.get('/buscar', [], reservaCliente);

module.exports = router;