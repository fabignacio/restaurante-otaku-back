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

    segundoNombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    segundoApellido: {
        type: String,
        required: true
    },

    estadoCivil: {
        type: String,
        required: true
    },

    direccion: {
        type: String,
        required: true
    },

    telefono: {
        type: String,
        required: true
    },

    correoPersonal: {
        type: String,
        required: true
    },

    fechaNacimiento: {
        type: String,
        required: true
    },

    correoEmpresa: {
        type: String,
        required: true
    },

    password1: {
        type: String,
        required: true
    },

    password2: {
        type: String,
        required: true
    },

    rol: {
        type: Number,
        required: true
    },

    nombreBanco: {
        type: String,
        required: true,
    },

    tipoCuenta: {
        type: String,
        required: true
    },

    numeroCuenta: {
        type: String,
        required: true
    },

    sueldoBruto: {
        type: Number,
        required: true
    },

    sueldoLiquido: {
        type: Number,
        required: true
    },

    tipoPrevision: {
        type: String,
        required: true
    },

    nombreIsapre: {
        type: String,
        required: false
    }
})

module.exports = model('Staff', StaffSchema)