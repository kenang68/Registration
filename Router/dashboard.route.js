const dashboard_router = require('express').Router()
const dashboard = require('../Controller/dashboard.controller')
const getCurrentUser = require('../Controller/auth.controller')
const auth = require('../Middleware/auth')

dashboard_router.get('/',auth, dashboard.main)
dashboard_router.get('/login',dashboard.login)
dashboard_router.get('/logout',dashboard.logout)
dashboard_router.get('/contracts',auth, dashboard.contracts)
dashboard_router.post('/login_form', dashboard.login_form)
dashboard_router.post('/uploadFile', dashboard.uploadFile)


module.exports = dashboard_router