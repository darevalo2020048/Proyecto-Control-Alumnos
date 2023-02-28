const {request, response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const login = async(req = request, res = response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'El correo no es valido'
            })
        }
        if (!user){
            return res.status(202).json({
                msg: 'El Usuario no pudo encontrarse'
            })
        }
            
        // Verify the password of the user

        //const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: 'La contraseña no es valida'

            })
        }

        const token = await generarJWT(user.id);
    
        res.json({
            msg: 'Inicio sesion',
            email,
            password,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comunicate con el ADMIN'
        })
    }

}

module.exports= {
    login
}