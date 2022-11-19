
exports.getContact=(req,res) => {
        res.render('contact', {verifuser:req.session.userId})
 }

 