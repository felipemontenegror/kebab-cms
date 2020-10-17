const jwt = require ('jsonwebtoken');
const config = require('config');
const MSGS = require('../messages')


//caso tente entrar uma API privada...
module.exports = function (req, res, next) {
     // Get token from header
    const token = req.header('x-auth-token'); //...ele envia no header um x auth token para análise


    if (!token) {
        return res.status(401).json({ msg: MSGS.WITHOUT_TOKEN });
}

    try { //caso o token existir e nao for válido, responde com erro de token invalido
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: MSGS.INVALID_TOKEN});
            }
            req.user = decoded.user; //se o token for valido, coloca dentro da requisição o usuario decodificado 
            next(); //segue para proximo middleaware
        })

    }catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: MSGS.CATEGORY404});
    }
}
