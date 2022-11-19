const bookModel = require('../models/book.model')

exports.allbookController = (req, res, next) => {
    bookModel.getallbooks().then(books => {
        res.render('books', { books: books, verifuser: req.session.userId })
    })

}

exports.bookdetailsController = (req, res, next) => {
    let id = req.params.id
    bookModel.getOneBookDetails(id).then(resbook => {
        console.log(resbook);
        res.render('details', { book: resbook, verifuser: req.session.userId })
    })
}
exports.getAddBookPage = (req, res, next) => {
    res.render('addbook', { verifuser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0] })

}

exports.getMyBooksPage = (req, res, next) => {
    bookModel.getMybooks(req.session.userId).then((books) => {
        res.render('mybooks',
        {
            verifuser: req.session.userId,
            mybooks: books
        })
    })
    
}

exports.postAddBookController = (req, res, next) => {
    console.log(req.body)
    console.log(req.file.filename)
    bookModel.postDataBookModel(req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.session.userId).then((msg) => {
        req.flash('successMessage', msg)
        console.log(msg)
        res.redirect('/addbook')
    }).catch((err) => {
        req.flash('Errormessage', err)
        res.redirect('/addbook')
    })
}