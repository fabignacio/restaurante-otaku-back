const { Schema, model } = require('mongoose');

const ProveedoresSchema = Schema({
    rutProveedor: {
        type: String,
        require: true,
        unique: true,
    },
    nombre: {
        type: String,
        require: true,
    },
    direccion: {
        type: String,
        require: true,
    },
    direccionComercial: {
        type: String,
        require: true,
    },
    tipoProducto: {
        type: String,
        require: true,
    },
    telefonoContacto: {
        type: String,
        require: true,
    },
    emailContacto: {
        type: String,
        require: true,
    },
});

module.exports = model('Proveedores', ProveedoresSchema);