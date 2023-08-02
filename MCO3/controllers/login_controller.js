const db  = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController ={
    getLogin: function(req, res){
        if(req.session.flag){
            res.redirect('/profile_page?userName='+req.session.userName);
        }else
            res.render('login');
    },
    postLogin: async function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var query = {userName: username};
        var projection = 'password firstName lastName';
        db.findOne(User, query, projection, function(result){

            if(result){
                var data ={
                    userName: username,
                    firstName: result.firstName,
                    lastName: result.lastName,
                };
                bcrypt.compare(password, result.password, function(err, equal){
                    if(equal){
                        req.session.user = data;
                        req.session.flag = true;
                        res.redirect('/profile_page?userName='+username);
                    }else{
                        req.session.flag = false;
                        res.status(404).render('login')
                    }
                });
            }else{
                res.status(404).render('login');
            }
        });
    },
};

module.exports = loginController;