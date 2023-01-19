
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');


require('dotenv').config();

//Crear el servidor/aplicaciones de express
const app = express();

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static(__dirname + '/public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/staff', require('./routes/staff/staff.router'));
//app.use('reserva/', require('./routes/reserva/reserva.router'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})