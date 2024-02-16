const jwt = require('jsonwebtoken');
require('../config/config')

let verifyToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if(err) res.status(401).send({
            status: 'error',
            message: 'The token is invalid',
        });
       req.user = decoded.user
        next();
    })
} 

module.exports = {verifyToken}