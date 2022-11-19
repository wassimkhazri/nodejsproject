const HomeModel =require('../models/book.model')

    exports.threebookController = (req, res, next) => {
        HomeModel.getthreebooks().then(books => {
            res.render('index', { books: books, verifuser:req.session.userId })
        })
    }