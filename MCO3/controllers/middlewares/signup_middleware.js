
// import module `check` from `express-validator`
const { check } = require('express-validator');

/*
    defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    /*
        function which returns an array of validation middlewares
        called when the client sends an HTTP POST request for `/signup`
    */
    signupValidation: function () {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */

            //TODO: see the comments below and do the necessary changes
                    //the regex described in the comments can be found in the MCO folder in the account_validation.js file
        var validation = [


            check('firstName', 'First name should not be empty.').notEmpty(),


            check('lastName', 'Last name should not be empty.').notEmpty(),


            check('idnumber', 'ID number should contain 8 digits.')
            .isLength({min: 8, max: 8}),

            //TODO: check if it follows the regex
            check('password', 'Passwords should contain at least 8 characters.')
            .isLength({min: 8})


            //TODO: validate these fields, get the regex 

            
            //check  email' ,  makesure it follows the correct regex and it should not be empty, send the right message depending on the error
            //check 'username' , only make sure it is not empty
            //TODO: 
            //check "contact_number"   , it can be empty but if it is not, then check if it follows regex



        ];

        return validation;
    },

    loginValidation:function(){
        //TODO: make sure these two fields are not empty and that password follows the correct regex
        var validation = [
            //check 'username'
            //check 'password' 
        ];
    },
}

/*
    exports the object `validation` (defined above)
    when another script exports from this file
*/
module.exports = validation;