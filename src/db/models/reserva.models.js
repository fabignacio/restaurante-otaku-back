const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({
    rutCliente: {
        type: String,
        require: true,
        unique: true
    },
    cantidadPersonas: {
        type: Number,
        require: true
    },
    fecha: {
        type: Date,
        require: true
    },
    hora: {
        type: Date,
        require: true
    },
})

module.exports = model('Reserva', ReservaSchema)
