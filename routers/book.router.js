const bookController=require('../controllers/book.controller')
const router = require('express').Router()
const  body =require('express').urlencoded({extended:true})
const GuardAuth =require('./guardAuth')
const multer =require('multer')



router.get('/books',GuardAuth.isAuth,bookController.allbookController)
router.get('/books/:id',GuardAuth.isAuth,bookController.bookdetailsController)

router.get('/addbook',GuardAuth.isAuth,bookController.getAddBookPage)
router.post('/addbook',multer({
 storage:multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads')
    },
      filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname)
      }
})
}).single('image'),
GuardAuth.isAuth,bookController.postAddBookController)

module.exports=router

