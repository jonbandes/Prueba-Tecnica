const { Router } = require('express');
const router = Router();
//const express = require('express')
//const router = express.Router()

const { loginCtrl, registerCtrl } = require('../controllers/auth')

router.post('/api/v1/user/login', loginCtrl)

//router.post('/api/v1/users', registerCtrl);
//router.post('/register', registerCtrl)

module.exports = router