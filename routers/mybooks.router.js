
const route = require('express').Router()
const bookController= require('../controllers/book.controller')
const GuardAuth =require('./guardAuth')

route.get('/mybooks',GuardAuth.isAuth,bookController.getMyBooksPage)


module.exports= route