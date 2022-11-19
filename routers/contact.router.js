const route = require('express').Router()
const contactController = require('../controllers/contact.controller')
const guardAuth = require('./guardAuth')



route.get('/contact',guardAuth.isAuth,contactController.getContact)

module.exports= route