const mongoose = require('mongoose')

var schemaBook = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    price: Number,
    image: String,
    userId:String
})

var Book = mongoose.model('book', schemaBook)
var url = 'mongodb://localhost:27017/library'
exports.getallbooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({})
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}

exports.getthreebooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({}).limit(3)
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}



exports.getOneBookDetails = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            console.log(id)
            return Book.findById(id)

        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}

exports.postDataBookModel = (title, description, author, price, image, userId) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
            let book = new Book({
                title: title,
                description: description,
                author: author,
                price: price,
                image: image,
                userId: userId
            })
            return book.save()

        }).then(()=>{
            mongoose.disconnect()
            resolve('added !')
        }).catch((err)=>{
           mongoose.disconnect()
           reject(err)
        })
    })
}

exports.getMybooks = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({userId:userId})
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}