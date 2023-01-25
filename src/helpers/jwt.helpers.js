var jwt = require('jsonwebtoken');

const generarJWT = (
    rut,
    nombre,
    segundoNombre,
    apellido,
    segundoApellido,
    estadoCivil,
    direccion,
    fechaNacimiento,
    telefono,
    correoPersonal,
    correoEmpresa,
    password1,
    password2,
    nombreBanco,
    tipoCuenta,
    numeroCuenta,
    tipoPrevision,
    nombreIsapre,
    sueldoBruto,
    sueldoLiquido,
    rol,
) => {

    const payload = {
        rut,
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        estadoCivil,
        direccion,
        fechaNacimiento,
        telefono,
        correoPersonal,
        correoEmpresa,
        password1,
        password2,
        nombreBanco,
        tipoCuenta,
        numeroCuenta,
        tipoPrevision,
        nombreIsapre,
        sueldoBruto,
        sueldoLiquido,
        rol,
    };

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(token);
            }
        });
    })

}

module.exports = {
    generarJWT
}
