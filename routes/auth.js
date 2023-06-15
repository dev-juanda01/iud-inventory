
const { validationResult, check } = require("express-validator");
const { correoExiste,idExiste} = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const express = require("express");
const router = express.Router();

router.post('/', [
    check("email", "Correo no valido - No es un correo").isEmail(),
    check("email").custom(correoExiste),
    check("contrasena","email", "Contraseña no valida - Ingresela").not().isEmpty(),
    validarCampos
], async function(req, res){

    try{

        const esIgual = bycript.compareSync(req.body.contrasena, usuario.contrasena);
        if(!esIgual){
            return res.status(400).json({ mensaje: 'User not found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'Internal server error'});
    }
});

module.exports = {router};

