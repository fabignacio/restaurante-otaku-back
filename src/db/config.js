const moongose = require("mongoose");

const dbConnection = async () => {

    try {

        moongose.set('strictQuery', true);
        moongose.connect(process.env.BD_CNN);
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicar la BD');
    }
}

module.exports = {
    dbConnection
}