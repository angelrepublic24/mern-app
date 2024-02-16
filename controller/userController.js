let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('../config/config')

const createUser = async(req, res) => {
    let body = req.body;
    if(!body.name || !body.lName || !body.email || !body.password){
        return res.status(400).send({
            status: 'error',
            message: 'Missing data'
        })
    }
    try {
        let existingUser = await User.find({
            $or: [
                {email: body.email.toLowerCase()}
            ]
        }).exec();
        if(existingUser && existingUser.length >= 1){
            return res.status(200).send({
                status: 'success',
                message: 'User already exists'
            })
        }else{
            let password = await bcrypt.hash(body.password, 10);
            body.password = password;
            let user = new User(body)
            user.save()
                .then((userDB) => {
                    return res.status(200).send({
                        status: 'success',
                        message: 'user saved successfully',
                        user: userDB,
                    })
                })
        }
    }catch(err){
        return res.status(500).send({
            status: 'error',
            message: 'Somethihng went wrong'
        })
    }
}

const login = (req, res) => {
    let body = req.body;

    User.findOne({email: body.email})
        .then(async(userDB) => {
            if(!userDB) return res.status(400).send({
                status: 'error',
                message: '(Email) or password is incorrect'
            })
            if(!bcrypt.compareSync(body.password, userDB.password)){
                return res.status(400).send({
                    status: 'error',
                    message: 'Email or (password) is incorrect'
                })
            }

            let token = await jwt.sign({
                user: userDB
            },process.env.SECRET, {expiresIn: process.env.LIMIT_TOKEN} )
            
            return res.status(200).send({
                status: 'success',
                user: userDB,
                token
            })
        })
        .catch((error) => {
            return res.status(500).send({
                status: 'error',
                message: error.message
            })
        })
}

const profile = (req, res) => {
    // get parameter of the id of the user by the url
    let id = req.params.id;
    // consult to get data from user
    User.findById(id)
        .select({role: 0})
        .then(async(userProfile) => {
            if(!userProfile) {
                return res.status(404).send({
                    status: 'error',
                    message: 'The user does not exist'
                })
            }
            // info of follow
                // return result
            return res.status(200).json({
                status: 'success',
                user: userProfile,
            })
        })
        .catch((error) => {
            console.log(error)
        })
 }

module.exports = {
    createUser,
    login,
    profile
}