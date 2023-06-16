// TODO: función de validación de JWT

const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({ mensaje: 'Error el token no existe.'});
    }

    try{
        const payload = jwt.verify(token, '123456');
        req.payload = payload;
        next();

    } catch(error) {
        console.log(error);
        return res.status(401).json({ mensaje: 'Error sin autorizacion.'});
    }
}

module.exports = {
    validarJWT
}
  

/**
 const token = req.header("Authorization")

//  TODO: validar que exista el token en la peticion

// TODO: validar secret-key del token

// TODO: validar id del token contra la base de datos

// TODO: validar estado del usuario

// 
 
 next()
 */
