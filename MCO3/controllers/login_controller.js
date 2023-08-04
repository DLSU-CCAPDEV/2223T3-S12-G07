const db  = require('../models/db.js');
const User = require('../models/UserModel.js');
// import module `bcrypt`
const bcrypt = require('bcrypt');
const loginController ={
    getLogin: function(req, res){
        if(req.session.flag){
            res.redirect('/profile_page?userName='+req.session.user.userName);
        }else
            res.render('login');
    },
    
    postLogin: async function(req, res){
        
        var username = req.body.username;
        var password = req.body.password;
        var query = {userName: username};
        var data={};
        var projection = 'password firstName lastName';

        var result = await db.findOne(User, query, projection);
        if(result){
            bcrypt.compare(password, result.password,function(err, equal){
                if(equal){
                    data ={
                        userName: username,
                        firstName: result.firstName,
                        lastName: result.lastName,
                    };

                    req.session.user = data;
                    req.session.flag = true;
                    res.redirect('/profile_page?userName='+username);
                }else{
                    req.session.flag = false;
                    res.render('login', {isMatch: true});
                }
            });

        }else{
            res.render('login');
        }
    },
};

module.exports = loginController;