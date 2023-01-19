var jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre, email) => {

    const payload = { uid, nombre, email };

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
