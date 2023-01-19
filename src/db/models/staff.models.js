const { Schema, model } = require('mongoose');

const StaffSchema = Schema({

    rut: {
        type: String,
        required: true,
        unique: true
    },

    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    rol: {
        type: Number,
        required: true
    }
})

module.exports = model('Staff', StaffSchema)