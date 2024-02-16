const express = require('express');
const UserController = require('../controller/userController')
const  {verifyToken} = require('../middlewares/authentication');

let router = express.Router()

router.post('/register', UserController.createUser)
router.post('/login', UserController.login)
router.get("/profile/:id", verifyToken, UserController.profile);

module.exports = router