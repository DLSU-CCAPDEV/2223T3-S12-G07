const db = require("../models/db.js");
const User = require("../models/UserModel.js");

const signupController = {

    getSignUp:  function (req, res) {
        res.render('register');
    },

    postSignUp: async function (req, res) {
        //initiate values from the req.body
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password= req.body.password;
        var email= req.body.email;
        var contactNumber ="";
        if(req.body.contactNumber != null)
            contactNumber= req.body.contactNumber;
        var idNumber= req.body.idNumber;


        var user = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            email: email,
            contactNumber: contactNumber,
            idNumber: idNumber,
        };

        //create user from the initiated values
        var response = await db.insertOne(User, user);

        if(response != null)
            res.redirect('/profile?username='+userName);
        else
            res.render('error');
    },

    getCheckUsername: async function (req, res) {
        var username = req.query.username;
        var query = {username: username};
        var projection = 'username';
        var result = await db.findOne(User, query, projection);
        if(result != null){
            res.send(result);
        }   else{
            res.send("");
        }
    },
    getCheckEmail: async function (req, res) {
        var email = req.query.email;
        var query = {email: email};
        var projection = 'email';
        var result = await db.findOne(User, query, projection);
        if(result != null){
            res.send(result);
        }   else{
            res.send("");
        }
    },
    getCheckIdNumber: async function (req, res) {
        var idNumber = req.query.idNumber;
        var query = {idNumber: idNumber};
        var projection = 'idNumber';
        var result = await db.findOne(User, query, projection);
        if(result != null){
            res.send(result);
        }   else{
            res.send("");
        }
    },

};

mpodule.exports = signupController;