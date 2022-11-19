const express = require('express')
const path = require('path')
const RouterAuth = require('./routers/auth.router')
const RouterHome= require('./routers/home.router')
const RouterBook = require('./routers/book.router')
const RouterContact = require('./routers/contact.router')
const RouterAbout = require('./routers/about.router')
const RouterMyBooks = require('./routers/mybooks.router')
const session = require('express-session')
const MongoDbStore= require('connect-mongodb-session')(session)
const flash=require('connect-flash')

const app = express()


app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine', 'ejs')
app.set('views','views')

var Store = new MongoDbStore({
    uri:'mongodb://localhost:27017/library',
    collection:'sessions'
})
app.use(flash())
app.use(session({
    secret:'This is a secret',
    store:Store,
    resave: true,
    saveUninitialized:true
}))

app.use('/',RouterHome)
app.use('/',RouterBook)
app.use('/',RouterAuth)
app.use('/',RouterContact)
app.use('/',RouterAbout)
app.use('/',RouterMyBooks)


// app.get('/mybooks',(req,res,next)=>{
//     res.render('mybooks',{verifuser:req.session.userId})
// })

app.listen(3000,()=>console.log('server run on port 3000'))