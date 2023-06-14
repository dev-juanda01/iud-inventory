


router.post('/', [
   check('email', 'email.requerido')
], async function(req, res){

    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array()});
        }

        
        const usuario = await Usuario.findOne({ email: req.body.email });

        if(!usuario) {
            return res.status(400).json({ mensaje: 'User not found'});
        }

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

