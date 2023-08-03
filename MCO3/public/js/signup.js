$(document).ready(function(){


    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */
        var fName = validator.trim($('#firstName').val());
        var lName = validator.trim($('#lastName').val());
        var idNum = validator.trim($('#idnumber').val());
        var pw = validator.trim($('#password').val());
        var email = validator.trim($('#email').val());
        var cpw = validator.trim($('#confirm_password').val());
        var username = validator.trim($('#username').val());
  

        /*
            checks if the trimmed values in fields are not empty
        */
        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var idNumEmpty = validator.isEmpty(idNum);
        var pwEmpty = validator.isEmpty(pw);
        var emailEmpty = validator.isEmpty(email);
        var cpwEmpty = validator.isempty

        return !fNameEmpty && !lNameEmpty && !idNumEmpty && !pwEmpty;
    }

    //todo: display warning message if username
    $('#username').keyup(function(){
        var username = $('#username').val();
        $.get('/checkUsername/',{username: username}, function(data){
            if(data.username == username)
                //username exists
                pass;
        }); 
    });

    $('#email').keyup(function(){
        var email = $('#email').val();
        $.get('/checkEmail/',{email: email}, function(data){
            console.log("data = " + data.email);
            if(data.email == email){
                $('#warning_email').css('display','block');
                $('#email').css('background-color','red');
                $('#submit').prop('disabled',true);
            }else{
                $('#warning_email').css('display','none');
                $('#email').css('background-color','transparent');
                $('#submit').prop('disabled',false);
            }
                
        });
    });
    
    $('#idnumber').keyup(function(){
        //serverside 
        var idNumber = $('#idnumber').val();
        $.get('/checkIdNumber/',{idNumber: idNumber}, function(data){
            if(data.idNumber == idNumber){
                //idNumber exists
                $('#warning_idnumber').css('display','block');
                $('#idnumber').css('background-color','red');
                $('#submit').prop('disabled',true);
            }else{
                $('#warning_idnumber').css('display','none');
                $('#idnumber').css('background-color','transparent');
                $('#submit').prop('disabled',false);
            }
        });
    });

    $('#password').keyup(function(){
        var password = $('#password').val();
        if(password=="" || password.length<8){
            //error
        }
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var strength =  regex.test(password);
        if(!strength){
            //error
            $('#warning_password').css('display','block');
            $('#password').css('background-color','red');
            $('#submit').prop('disabled',true);
        }else{
            //default
            $('#warning_password').css('display','none');
            $('#password').css('background-color','transparent');
            $('#submit').prop('disabled',false);
        }
    });

    $('#confirm_password').keyup(function(){
        var password = $('#password').val();
        var confirm_password = $('#confirm_password').val();

        if(password!=confirm_password) {
            $('#warning_confirm_password').css('display','block');
            $('#confirm_password').css('background-color','red');
            $('#submit').prop('disabled',true);
        }else{
            $('#warning_confirm_password').css('display','none');
            $('#confirm_password').css('background-color','transparent');
            $('#submit').prop('disabled',false);
        }
    });

    $('#contact_number').keyup(function(){
        var contact_number = $('#contact_number').val();
        var regex = /((^(\+)(\d){12}$)|(^\d{11}$))/;
        var test = regex.test(contact_number);
        if(test || contact_number==""){
            $('#warning_contact_number').css('display','none');
            $('#contact_number').css('background-color','transparent');
            $('#submit').prop('disabled',false);
            
        }else if(!test){
            $('#warning_contact_number').css('display','block');
            $('#contact_number').css('background-color','red');
            $('#submit').prop('disabled',true);
        }
    });
});

//helpers




    /*
        Function which returns true if value of `idNum` is a valid ID number.
        Otherwise, this function returns false.
        A valid ID number must contain EXACTLY 8 digits
        and has not been used by another other users yet.

        The function has 2 parameters:
        - field - refers to the current <input> field calling this function
        - callback - function called after the execution of isValid()
    */
    function isValidID(field, callback) {

        /*
            gets the value of `idNum` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains exactly 8 digits
        */
        var idNum = validator.trim($('#idnumber').val());
        var isValidLength = validator.isLength(idNum, {min: 8, max: 8});
        var regex = /^[0-9]+$/;
        var isValidRegex = regex.test(idNum);

        // if the value of `idNum` contains exactly 8 digits
        if(isValidLength) {
            /*
                send an HTTP GET request using JQuery AJAX
                the first parameter is the path in our server
                which is defined in `../../routes/routes.js`
                the server will execute the function getCheckID()
                defined in `../../controllers/signupController.js`
                the second parameter passes the variable `idNum`
                as the value of the field `idNum` to the server
                the last parameter executes a callback function
                when the server sent a response
            */
           if(isValidRegex){
                $.get('/getCheckID', {idNumber: idNum}, function (result) {

                    // if the value of `idNum` does not exists in the database
                    if(result.idNumber != idNum) {

                        /*
                            check if the <input> field calling this function
                            is the `idNum` <input> field
                        */
                        if(field.is($('#idnumber')))
                            // remove the error message in `idNumError`
                            $('#warning_idnumber').text('');

                        /*
                            since  the value of `idNum` contains exactly 8 digits
                            and is not yet used by another user in the database
                            return true.
                        */
                        return callback(true);

                    }

                    // else if the value of `idNum` exists in the database
                    else {

                        /*
                            check if the <input> field calling this function
                            is the `idNum` <input> field
                        */
                        if(field.is($('#idnumber')))
                            // display appropriate error message in `idNumError`
                            $('#warning_idnumber').text('ID number already registered.');

                        /*
                            since the value of `idNum`
                            is used by another user in the database
                            return false.
                        */
                        return callback(false);
                    }
                });
            }else{
                //display regex error
                if(field.is($('#idnumber')))
                    $('#warning_idnumber').text('ID Number should only consist of numerical characters');
            }

        // else if the value of `idNum` is less or more than 8 digits
        }else {

            /*
                check if the <input> field calling this function
                is the `idNum` <input> field
            */
            if(field.is($('#idnumber')))
                // display appropriate error message in `idNumError`
                $('#warning_idnumber').text('ID Number should contain 8 digits.');

            /*
                since the value of `idNum` is less or more than 8 digits
                return false.
            */
            return callback(false);
        }
    }
    /*
        Function which returns true if value of `pw` is a valid ID number.
        Otherwise, this function returns false.
        A valid password must contain AT LEAST 8 characters.

        The function has 1 parameter:
        - field - refers to the current <input> field calling this function
    */
function isValidPassword(field) {

    // sets initial value of return variable to false
    var validPassword = false;

    /*
        gets the value of `pw` in the signup form
        removes leading and trailing blank spaces
        then checks if it contains at least 8 characters.
    */
    var password = validator.trim($('#password').val());
    var isValidLength = validator.isLength(password, {min: 8});
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var isValidRegex = regex.test(password);
    // if the value of `pw` contains at least 8 characters
    if(isValidLength) {
        /*
            check if the <input> field calling this function
            is the `pw` <input> field
        */
       if(isValidRegex){

            if(field.is($('#password'))){
                // remove the error message in `idNumError`
                    $('#warning_password').text('');
                /*
                    since  the value of `pw` contains at least 8 characters
                    set the value of the return variable to true.
                */
                validPassword = true;
            }else{
                if(field.is($('#password'))){
                    $('#warning_password').text(`Passwords should contain at least 1 special character, 
                                            digit, uppercase letter, and lowercase letter.`);
                }
            }
        }
    // else if the value of `pw` contains less than 8 characters
    }else {
            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#password')))
                // display appropriate error message in `pwError`
                $('#warning_password').text(`Passwords should contain at least 8
                    characters.`);
        }

        // return value of return variable
        return validPassword;
}

/*
    Function which checks if the `field` is empty.
    This also calls functions isFilled(), isValidPassword(), and
    isValidID().
    This is attached to the `keyup` event of each field
    in the signup form.
    This activates the `submit` button if:
    - value returned by function isFilled() is true
    - value returned by function isValidPassword() is true
    - value returned by function usValidID() is true

    The function has 3 parameters:
    - field - refers to the current <input> field calling this function
    - fieldName - the `placeholder` of the current <input> field calling
    this function
    - error - the corresponding <p> element to display the error of the
    current <input> field calling this function
*/
function validateField(field, fieldName, error) {

    /*
        gets the value of `field` in the signup form
        removes leading and trailing blank spaces
        then checks if the trimmed value is empty.
    */
    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);

    // if the value of `field` is empty
    if(empty) {
        /*
            set the current value of `field` to an empty string
            this is applicable if the user just entered spaces
            as value to the `field`
        */
        field.prop('value', '');
        // display approriate error message in `error`
        error.text(fieldName + ' should not be empty.');
    }

    // else if the value of `field` is not empty
    else
        // remove the error message in `error`
        error.text('');

    // call isFilled() function to check if all field are filled
    var filled = isFilled();

    /*
        call isValidPassword() function
        to check if the value of `pw` field is valid
    */
    var validPassword = isValidPassword(field);

    /*
        call isValidID() function
        to check if the value of `idNum` field is valid
    */
    isValidID(field, function (validID) {

        /*
            if all fields are filled
            and the password contains at least 8 characters
            and the ID number contains exactly 8 digits and is unique
            then enable the `submit` button
        */
        if(filled && validPassword && validID)
            $('#submit').prop('disabled', false);

        /*
            else if at least one condition has not been met
            disable the `submit` button
        */
        else
            $('#submit').prop('disabled', true);
    });
}