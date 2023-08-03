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


    function isFilled() {
        var fName = validator.trim($('#firstName').val());
        var lName = validator.trim($('#lastName').val());
        var idNum = validator.trim($('#idnumber').val());
        var pw = validator.trim($('#password').val());
        var email = validator.trim($('#email').val());
        var cpw = validator.trim($('#confirm_password').val());
        var username = validator.trim($('#username').val());

        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var idNumEmpty = validator.isEmpty(idNum);
        var pwEmpty = validator.isEmpty(pw);
        var emailEmpty = validator.isEmpty(email);
        var cpwEmpty = validator.isEmpty(cpw);
        var userEmpty = validator.isEmpty(username);

        return !fNameEmpty && !lNameEmpty && !idNumEmpty && !pwEmpty && !emailEmpty && ! cpwEmpty && !userEmpty;
    }
    function isValidContactNumber(field){
        var cNum = validator.trim($('#contact_number').val());
        var regex = /((^(\+)(\d){12}$)|(^\d{11}$))/;
        var isValidRegex = regex.test(cNum);
        var validContact = false;
        if(isValidRegex || cNum =="" || cNum==null){
            if(field.is($('#contact_number'))){
                $('#warning_contact_number').text('');
                $('#warning_contact_number').css('display','none');
                $('#contact_number').css('background-color','transparent');
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

        if(isValidRegex) {
           if(isValidLength){
                $.get('/checkIDNumber', {idNumber: idNum}, function (result) {

                    // if the value of `idNum` does not exists in the database
                    if(result.idNumber != idNum) {
                        if(field.is($('#idnumber'))){
                            // remove the error message in `idNumError`
                            $('#warning_idnumber').text('ID Number should contain 8 digits.');
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
                if(field.is($('#idnumber'))){ //
                    $('#warning_idnumber').text('');
                    $('#warning_idnumber').css('display','block');
                    $('#idnumber').css('background-color','red');
                }
                return callback(false);
               
            }

        }else {
            if(field.is($('#idnumber'))){
                // display appropriate error message in `idNumError`
                $('#warning_idnumber').text('ID Number should only consist of numerical characters.');
                $('#warning_idnumber').css('display','block');
                $('#idnumber').css('background-color','red');

            }
            return callback(false);
            
        }
    }

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
                        $('#warning_confirm_password').text(`Confirm password should match with password.`);
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
    var password = validator.trim($('#password').val());
    var isValidLength = validator.isLength(password, {min: 8});
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var isValidRegex = regex.test(password);
    // if the value of `pw` contains at least 8 characters
    if(isValidLength) {
       if(isValidRegex){

            if(field.is($('#password'))){
                // remove the error message in `idNumError`
                    $('#warning_password').text('');
                    $('#warning_password').css('display','none');
                    $('#password').css('background-color','transparent');
            }
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
            if(field.is($('#password'))){
                // display appropriate error message in `pwError`
                $('#warning_password').text(`Passwords should contain at least 8
                    characters.`);
                $('#warning_password').css('display','block');
                $('#password').css('background-color','red');
            }
        }
        return validPassword;
}

function validateField(field, fieldName, error) {

    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);
 
    console.log(field.val().split(' ').length);
    if(field.val().split(' ').length>1 && !field.is($('#firstName')) && !field.is($('#lastName'))){
            error.text(`${fieldName}  should not contain a space character.`);
            error.css('display','block');
            field.prop('value',value.split(" ").join(""));
    
        
    }else{
        // if the value of `field` is empty
        if(empty) {

            field.prop('value', '');
            // display approriate error message in `error`
            error.text(`${fieldName}  should not be empty.`);
            error.css('display','block');
        }

        // else if the value of `field` is not empty
        else{
            // remove the error message in `error`
            error.text('');
            error.css('display','none');
        

            // call isFilled() function to check if all field are filled
            var filled = isFilled();
            var validPassword = isValidPassword(field);
            var validCPass = isValidConfirmPassword(field);
            var validCNum = isValidContactNumber(field);

            isValidID(field, function (validID) {
                console.log("recursion: validID");
                isValidEmail(field, function(validEmail){
                    console.log("recursion: isValidEmail");
                    isValidUserName(field, function(validUser){
                        console.log("recursion: isvalid username");
                        if(filled && validPassword &&  validCPass &&validCNum  && validUser && validID && validEmail){
                            $('#submit').prop('disabled', false);
                        }else
                            $('#submit').prop('disabled', true);
                    });
                });
            });
        }
    }
}
