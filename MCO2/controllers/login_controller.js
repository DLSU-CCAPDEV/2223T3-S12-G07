const db  = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController ={
    getLogin: function(req, res){
        res.render('login');
    },
    postLogin: async function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var query = {username: username, password: password};
        var projection = 'username password';
        var result = await db.findOne(User, query, projection);
        if(result != null){
            res.redirect('/profile?username='+username);
        }   else{
           // res.render('error');
        }
    },
};

module.exports = loginController;