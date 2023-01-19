const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({
    rutCliente: {
        type: String,
        require: true,
        unique: true
    },
    nombreCliente: {
        type: String,
        require: true,
    },
    correoCliente: {
        type: String,
        require: true,
    },
    cantidadPersonas: {
        type: Number,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
})

module.exports = model('Reserva', ReservaSchema)
