const db  = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController ={
    getLogin: function(req, res){
        res.render('login');
    },
    postLogin: async function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var query = {userName: username};
        var projection = 'password';
        var result = await db.findOne(User, query, projection);
        if(result != null){
            if(result.password == password)
                res.redirect('/profile_page?userName='+username);
                console.log(success)
            console.log(result);
        }else{
            res.status(404).render('error');
        }
    },
};

module.exports = loginController;