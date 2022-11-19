const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


var schemaAuth = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,

})

var User = mongoose.model('user', schemaAuth)
var url = 'mongodb://localhost:27017/library'

exports.registerFunctionModel = (firstname,lastname, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                 reject('email is used')
            }
            else {
                return bcrypt.hash(password, 10)
            }

        }).then((hPassword) => {
            let user = new User({
                firstname: firstname,
                lastname:lastname,
                email: email,
                password: hPassword,
            })
           return user.save()
        }).then((user) => {
            mongoose.disconnect()
            resolve('registred !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
       })   
    })
}

exports.loginFunctionModel=(email, password)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
            return User.findOne({ email: email})
        }).then((user) => {
            if (user) {
                bcrypt.compare(password,user.password).then((verif)=>{
                    if(verif){
                        mongoose.disconnect()
                      return  resolve(user._id)
                    }
                    else {
                        mongoose.disconnect()
                        reject('Invalid password')
                    }
                })
            }
            else {
                mongoose.disconnect()
                reject("User not Found")
            }

        }).catch(()=>{
            mongoose.disconnect()
            reject(err)
       })   
    })

}
