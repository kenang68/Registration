const router = require('express').Router()
const signup = require('../Controller/auth.controller')
const login = require('../Controller/auth.controller')
const getCurrentUser = require('../Controller/auth.controller')
const auth = require('../Middleware/auth')

router.post('/signup',signup.signup)
router.post('/login',login.login)
router.get('/user', auth, getCurrentUser.getCurrentUser)

module.exports = router