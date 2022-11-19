const aboutController =require('../controllers/about.controller')
const route = require('express').Router()
const GuardAuth = require('./guardAuth')


route.get('/about',GuardAuth.isAuth,aboutController.getAbout)

module.exports= route


