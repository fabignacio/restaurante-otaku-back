const { response, json } = require('express');
const proveedoresModels = require('../../db/models/proveedores.models');
const Proveedor = require('../../db/models/proveedores.models')

//Agregar Proveedor
const crearProveedor = async (req, res = response) => {
    const {
        rutProveedor,
        nombre,
        direccion,
        direccionComercial,
        tipoProducto,
        telefonoContacto,
        emailContacto
    } = req.body;

    try {

        //Verificar si el rut existe
        const rutP = await proveedoresModels.findOne({ rutProveedor });

        if (rutP) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un proveedor con ese rut'
            });
        };

        //Crear proveedor con el modelo.
        const dbProveedor = new Proveedor(req.body);

        //Insertar el nuevo Proveedor en Bd.
        await dbProveedor.save();

        //Mandar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbProveedor.id,
            rutProveedor,
            nombre,
            direccion,
            direccionComercial,
            tipoProducto,
            telefonoContacto,
            emailContacto
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

//Editar Proveedor
const editarProveedor = async (req, res = response) => {

    let {
        rutProveedor,
        nombre,
        direccion,
        direccionComercial,
        tipoProducto,
        telefonoContacto,
        emailContacto
    } = req.body;

    try {

        const proveedor = await Proveedor.findOne({ rutProveedor });

        if (proveedor) {

            await Proveedor.updateOne({ rutProveedor }, {
                nombre,
                direccion,
                direccionComercial,
                tipoProducto,
                telefonoContacto,
                emailContacto
            });

            return res.status(200).json({
                ok: true,
                nombre,
                direccion,
                direccionComercial,
                tipoProducto,
                telefonoContacto,
                emailContacto
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un proveedor con ese rut'
            });
        };

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

//Eliminar Proveedor
const eliminarProveedor = async (req, res = response) => {

    const { rutProveedor } = req.body;

    try {

        const proveedor = await Proveedor.findOne({ rutProveedor });

        if (proveedor) {
            await Proveedor.deleteOne({ rutProveedor });
            return res.status(200).json({
                ok: true,
                msg: 'Proveedor eliminado correctamente'
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un proveedor con ese rut'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

//Buscar todos
const buscarProveedores = async (req, res = response) => {

    try {

        const proveedores = await Proveedor.find();
        if (proveedores) {
            return res.status(200).json({
                ok: true,
                proveedores
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No hay nada para mostrar'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

//Buscar uno
const buscarProveedor = async (req, res = response) => {

    const rutProveedor = req.params.rutProveedor;

    try {

        const proveedor = await Proveedor.findOne({ rutProveedor });
        if (proveedor) {

            return res.status(200).json({
                ok: true,
                proveedor: [proveedor]
            });

        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No hay nada para mostrar'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    buscarProveedor,
    buscarProveedores,
    crearProveedor,
    editarProveedor,
    eliminarProveedor,
}