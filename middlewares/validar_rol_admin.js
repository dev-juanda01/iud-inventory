const jwt = require('jsonwebtoken');

const validarRolAdmin = (req, res, next) => {

    console.log('Hola estoy funcionando validarroladmin');

    if(req.payload.rol != 'ADMIN'){
        return res.status(401).json({ mensaje: 'El rol no esta autorizado.'});
    }

    next();
}

module.exports = {
    validarRolAdmin
}