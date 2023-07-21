const db = require("../models/db.js");
const User = require("../models/UserModel.js");

const signupController = {

    getSignUp:  function (req, res) {

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
            res.redirect('/success?fname='+ firstName +'&lastName='+lastName+'&username='+username);
        else
            res.render('error');
    },
};

mpodule.exports = signupController;