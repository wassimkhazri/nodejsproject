const HomeController=require('../controllers/home.controller')
const router = require('express').Router()



router.get('/',HomeController.threebookController)

module.exports=router





