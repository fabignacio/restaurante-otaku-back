const { response } = require('express');
const Reserva = require('../../db/models/reserva.models');


//Crear Reserva
const crearReserva = async (req, res = response) => {
    const { rutCliente, nombreCliente, correoCliente, cantidadPersonas, fecha, hora } = req.body;

    try {

        //Verificar si no existe una reserva con el mismo rut del cliente
        const reserva = await Reserva.findOne({ rutCliente });

        if (reserva) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una reserva con ese rut'
            })
        }

        //Crear reserva con el modelo
        const dbReserva = new Reserva(req.body);

        //Guardar la reserva
        await dbReserva.save();

        //Mandar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbReserva.id,
            rutCliente,
            nombreCliente,
            correoCliente,
            cantidadPersonas,
            fecha,
            hora
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

//Editar Reserva
const editarReserva = async (req, res = response) => {

    const { rutCliente, nombreCliente, correoCliente, cantidadPersonas, fecha, hora } = req.body;

    try {
        const reserva = await Reserva.findOne({ rutCliente });

        if (reserva) {

            await Reserva.updateOne({ rutCliente }, {
                nombreCliente,
                correoCliente,
                cantidadPersonas,
                fecha,
                hora
            })

            return res.status(200).json({
                ok: true,
                rutCliente,
                nombreCliente,
                correoCliente,
                cantidadPersonas,
                fecha,
                hora
            })

        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una reserva con ese rut'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

//Eliminar Reserva
const eliminarReserva = async (req, res = response) => {

    const { rutCliente } = req.body;

    try {
        //Verificar si el rut existe
        const reserva = await Reserva.findOne({ rutCliente });

        if (reserva) {

            await Reserva.deleteOne({ rutCliente });
            return res.status(200).json({
                ok: true,
                msg: 'Reserva cancelada correctamente'
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un miembro del personal con ese rut'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

//Listar Reserva
const obtenerReserva = async (req, res = response) => {

    try {
        await Reserva.find().then(data => {
            if (data) {

                return res.status(200).json({
                    ok: true,
                    data
                });

            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay nada para mostrar'
                })
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

//Listar Reserva por cliente
const reservaCliente = async (req, res = response) => {
    const { rutCliente } = req.body;
    try {

        await Reserva.findOne({ rutCliente }).then(data => {
            if (data) {

                return res.status(200).json({
                    ok: true,
                    data
                });

            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay nada para mostrar'
                })
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    crearReserva,
    editarReserva,
    eliminarReserva,
    obtenerReserva,
    reservaCliente,
}