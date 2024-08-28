module.exports.checkAuth = function(req, res, next){
    const userId = req.session.userid;

    if(!userId){
        console.log('USUÁRIO NÃO AUTENTICADO!!!');
        
        res.redirect('/login');
        return;
    }

    next();
}