$(document).ready(function(){

    $('#firstName').keyup(function(){
        validateField($('#firstName'), 'First name', $('#warning_firstName'));
    });
    $('#lastName').keyup(function(){
        validateField($('#lastName'), 'Last name', $('#warning_lastName'));
    });
    //todo: display warning message if username
    $('#username').keyup(function(){
        validateField($('#username'), 'Username', $('#warning_username'));
    });

    $('#email').keyup(function(){
        validateField($('#email'), 'Email', $('#warning_email'));
    });
    
    $('#idnumber').keyup(function(){
        validateField($('#idnumber'), 'ID Number', $('#warning_idnumber'));
    });

    $('#password').keyup(function(){
        validateField($('#password'), 'Password', $('#warning_password'));
    });

    $('#confirm_password').keyup(function(){
        validateField($('#confirm_password'), 'Confirm Password', $('#warning_confirm_password'));
    });

    $('#contact_number').keyup(function(){
        validateField($('#contact_number'), 'Contact Number', $('#warning_contact_number'));
    });
});

//helpers


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
        var cpwEmpty = validator.isEmpty(cpw);
        var userEmpty = validator.isEmpty(username);

        return !fNameEmpty && !lNameEmpty && !idNumEmpty && !pwEmpty && !emailEmpty && ! cpwEmpty && !userEmpty;
    }

    /*
        Function which returns true if value of `idNum` is a valid ID number.
        Otherwise, this function returns false.
        A valid ID number must contain EXACTLY 8 digits
        and has not been used by another other users yet.

        The function has 2 parameters:
        - field - refers to the current <input> field calling this function
        - callback - function called after the execution of isValid()
    */
   
    function isValidContactNumber(field){
        var cNum = validator.trim($('#contact_number').val());
        var regex = /((^(\+)(\d){12}$)|(^\d{11}$))/;
        var isValidRegex = regex.test(cNum);
        var validContact = false;
        if(isValidRegex || cNum =="" || cNum==null){
            if(field.is($('#contact_number'))){
                $('#warning_contact_number').text('');
            }
            validContact= true;
        }else{
            if(field.is($('#contact_number'))){
                $('#warning_contact_number').text(`Valid formats are: 639XXXXXXXXX || 09XXXXXXXXX`);
                $('#warning_contact_number').css('display','block');
                $('#contact_number').css('background-color','red');

            }
        }
        return validContact;
    }
    function isValidUserName(field, callback){
        var user = validator.trim($('#username').val());
        var empty = validator.isEmpty(user);
        console.log("empty: "+ empty + "  username: " + user);
        if(!empty){
            $.get('/checkUsername/',{username: user}, function(data){
                if(data){
                    if(data.userName == user){
                        //username exists
                        if(field.is($('#username'))){
                            $('#warning_username').text('This username has already been registered');
                            $('#warning_username').css('display','block');
                            $('#username').css('background-color','red');
                        }
                        return callback(false)
                    }else{
                        if(field.is($('#username'))){
                            $('#wrning_username').text('');
                            $('#warning_username').css('display','none');
                            $('#username').css('background-color','transparent');
                        }
                        return callback(true);
                    }
                }else{
                    if(field.is($('#username'))){
                        $('#wrning_username').text('');
                        $('#warning_username').css('display','none');
                        $('#username').css('background-color','transparent');
                    }
                    return callback(true);
                }
            }); 
        }else{
            return callback(false);
        }
    }
    function isValidEmail(field, callback){
        var email = validator.trim($('#email').val());
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var isValidRegex = regex.test(email);
        var validEmail = false;
        if(isValidRegex){
            $.get('/checkEmail/',{email: email}, function(data){
                console.log("data = " + data.email);
                if(data.email == email){
                    if(field.is($('#email'))){
                        $('#warning_email').text('This email has already been registered');
                        $('#warning_email').css('display','block');
                        $('#email').css('background-color','red');
                    }
                    return callback(false);
                    
                }else{
                    if(field.is($('#email'))){
                        $('#warning_email').text('');
                        $('#warning_email').css('display','none');
                        $('#email').css('background-color','transparent');
                    }
                    return callback(true);
                }
                    
            });
        }else{
            if(field.is($('#email'))){
                $('#warning_email').text('Follow the correct email format: xxx@xxxx.xxx');
                $('#warning_email').css('display','block');
                $('#email').css('background-color','red'); 
            }
            return callback(false);
        }
   }
    function isValidID(field, callback) {
        var idNum = validator.trim($('#idnumber').val());
        var isValidLength = validator.isLength(idNum, {min: 8, max: 8});
        var regex = /^[0-9]+$/;
        var isValidRegex = regex.test(idNum);

        if(isValidLength) {
           if(isValidRegex){
                $.get('/getCheckID', {idNumber: idNum}, function (result) {

                    // if the value of `idNum` does not exists in the database
                    if(result.idNumber != idNum) {
                        if(field.is($('#idnumber'))){
                            // remove the error message in `idNumError`
                            $('#warning_idnumber').text('');
                            $('#warning_idnumber').css('display','none');
                            $('#idnumber').css('background-color','transparent');
                        }
                        return callback(true);
                    }
                    else {
                        if(field.is($('#idnumber'))){
                            // display appropriate error message in `idNumError`
                            $('#warning_idnumber').text('ID number already registered.');
                            $('#warning_idnumber').css('display','block');
                            $('#idnumber').css('background-color','red');
                        }
                        return callback(false);
                    }
                });
            }else{
                //display regex error
                if(field.is($('#idnumber'))){
                    $('#warning_idnumber').text('ID Number should only consist of numerical characters');
                    $('#warning_idnumber').css('display','block');
                    $('#idnumber').css('background-color','red');
                }
                return callback(false);
               
            }

        }else {
            if(field.is($('#idnumber'))){
                // display appropriate error message in `idNumError`
                $('#warning_idnumber').text('ID Number should contain 8 digits.');
                $('#warning_idnumber').css('display','block');
                $('#idnumber').css('background-color','red');

            }
            return callback(false);
            
        }
    }
    /*
        Function which returns true if value of confirm_password` is a valid password and that 
        it is equal to the password field.
        Otherwise, this function returns false.
        A valid password must contain AT LEAST 8 characters.

        The function has 1 parameter:
        - field - refers to the current <input> field calling this function
    */
    function isValidConfirmPassword(field) {

        // sets initial value of return variable to false
        var validPassword = false;
        var password = validator.trim($('#confirm_password').val());
        var isValidLength = validator.isLength(password, {min: 8});
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var isValidRegex = regex.test(password);
        var compare = $('#confirm_password').val();
        var equal = false;
        if(compare == password)
            equal = true;
        // if the value of `pw` contains at least 8 characters
        if(isValidLength) {
           if(isValidRegex){
                if(equal){
                    if(field.is($('#confirm_password'))){
                        // remove the error message in `idNumError`
                            $('#warning_confirm_password').text('');
                            $('#warning_confirm_password').css('display','none');
                            $('#confirm_password').css('background-color','transparent');
                    }
                        validPassword = true;
                }else{
                    if(field.is($('#confirm_password'))){
                        $('#warning_confirm_password').text(`Passwords should contain at least 1 special character, 
                                                digit, uppercase letter, and lowercase letter.`);
                        $('#warning_confirm_password').css('display','block');
                        $('#confirm_password').css('background-color','red');
                    }
                }
            }else{
                if(field.is($('#comnfirm_password'))){
                    $('#warning_confirm_password').text(`Passwords should contain at least 1 special character, 
                                                digit, uppercase letter, and lowercase letter.`);
                    $('#warning_confirm_password').css('display','block');
                    $('#confirm_password').css('background-color','red');
                }
            }
        // else if the value of `pw` contains less than 8 characters
        }else {
                if(field.is($('#confirm_password'))){
                    // display appropriate error message in `pwError`
                    $('#warning_confirm_password').text(`Passwords should contain at least 8
                        characters.`);
                    $('#warning_confirm_password').css('display','block');
                    $('#confirm_password').css('background-color','red');
                }
            }
    
            // return value of return variable
            return validPassword;
    }
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
                    $('#warning_password').css('display','none');
                    $('#password').css('background-color','transparent');
            }
                /*
                    since  the value of `pw` contains at least 8 characters
                    set the value of the return variable to true.
                */
                validPassword = true;
        }else{
                if(field.is($('#password'))){
                    $('#warning_password').text(`Passwords should contain at least 1 special character, 
                                            digit, uppercase letter, and lowercase letter.`);
                    $('#warning_password').css('display','block');
                    $('#password').css('background-color','red');
                }
            }
    
    // else if the value of `pw` contains less than 8 characters
        }else {
            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#password'))){
                // display appropriate error message in `pwError`
                $('#warning_password').text(`Passwords should contain at least 8
                    characters.`);
                $('#warning_password').css('display','block');
                $('#password').css('background-color','red');
            }
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
        error.text(fieldName + 'should not be empty.');
        error.css('display','block');
    }

    // else if the value of `field` is not empty
    else{
        // remove the error message in `error`
        error.text('');
        error.css('display','none');
    

    // call isFilled() function to check if all field are filled
    var filled = isFilled();

    /*
        call isValidPassword() function
        to check if the value of `pw` field is valid
    */
    var validPassword = isValidPassword(field);
    var validCPass = isValidConfirmPassword(field);
    var validCNum = isValidContactNumber(field);
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
        if(filled && validPassword && validID && validCPass && validCNum){
            $('#submit').prop('disabled', false);
        }else
            $('#submit').prop('disabled', true);
    });

    isValidEmail(field, function(validEmail){
        if(filled && validPassword && validCPass &&validCNum && validEmail){
            $('#submit').prop('disabled', false);
        }else
            $('#submit').prop('disabled', true);
    });

    isValidUserName(field, function(validUser){
        if(filled && validPassword &&  validCPass &&validCNum  && validUser){
            $('#submit').prop('disabled', false);
        }else
            $('#submit').prop('disabled', true);
    });
}
}
