const db = require("../models/db.js");
const User = require("../models/UserModel.js");
// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;
const signupController = {

    getSignUp:  function (req, res) {
        res.render('register');
    },

    postSignUp: async function (req, res) {
        //initiate values from the req.body

        if(req.session.flag == true){
            //you will be logged out from active sessions
            $.get('/logout/', {redirectTo:'register'}, function(data){
                alert('You have been logged out from active sessions');
            });
        }else{
            
                var firstName = req.body.firstName;
                var userName = req.body.username;
                var lastName = req.body.lastName;
                var password= req.body.password;
                var email= req.body.email;
                var contactNumber ="";
                if(req.body.contact_number != null)
                    contactNumber= req.body.contact_number;
                var idNumber= req.body.idnumber;

                bcrypt.hash(password, saltRounds, async function(err, hash) {
                var user = {
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    password: hash,
                    email: email,
                    contactNumber: contactNumber,
                    idNumber: idNumber,
                };
                var result = await db.insertOne(User, user);
                if(result!=null){
                        data = {
                            userName: userName,
                            firstName: firstName,
                            lastName: lastName,
                        };
                        req.session.flag = true;
                    
                    req.session.user = data;
                    res.redirect('/profile_page?userName='+userName);
                }else{
                        req.session.flag = false;
                        res.render('register');
                }

                });
            
        }
            
    },

    getCheckUsername:  async function (req, res) {
        var username = req.query.username;
        var query = {userName: username};
        var projection = 'userName';
        var result = await db.findOne(User, query, projection);
        if(result){
            res.send(result);
        }else{
            res.send("");
        }
    },
    getCheckEmail:  async function (req, res) {
        var email = req.query.email;
        var query = {email: email};
        var projection = 'email';
        var result = await db.findOne(User, query, projection);
        if(result){
            res.send(result);
        }else{
            res.send("");
        }

    },
    getCheckIdNumber: async function (req, res) {
        var idNumber = req.query.idNumber;
        var query = {idNumber: idNumber};
        var projection = 'idNumber';
        var result = await db.findOne(User, query, projection);
        if(result){
            res.send(result);
        }   else{
            res.send("");
        }
    },

};

module.exports = signupController;