$(document).ready(function(){

    $('#password').keyup(function(){
        validateField($('#password'), 'Password', $('#warning_password'));
    });
    $('#username').keyup(function(){
        validateField($('#username'), 'Username', $('#warning_username'));
    });
})

function isFilled() {
    var user = validator.trim($('#username').val());
    var pw = validator.trim($('#password').val());

    var userEmpty = validator.isEmpty(user);
    var pwEmpty = validator.isEmpty(pw);

    return !userEmpty && !pwEmpty;
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

function isValidUserName(field, callback){
    var user = validator.trim($('#username').val());
    var empty = validator.isEmpty(user);
    console.log("empty: "+ empty + "  username: " + user);
    if(!empty){
        $.get('/checkUsername/',{username: user}, function(data){
            if(data){
                if(data.userName==null || data.userName== ""){
                    //username exists
                    if(field.is($('#username'))){
                        $('#warning_username').text('This username does not exist');
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
                    $('#warning_username').text('This username does not exist');
                    $('#warning_username').css('display','block');
                    $('#username').css('background-color','red');
                }
                return callback(true);
            }
        }); 
    }else{
        return callback(false);
    }
}

function validateField(field, fieldName, error) {

    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);
    field.prop('value',value.split(" ").join(""));
    // if the value of `field` is empty
    if(empty) {

        field.prop('value', '');
        // display approriate error message in `error`
        error.text(fieldName + '  should not be empty.');
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

        isValidUserName(field, function(validUser){
            console.log("recursion: isvalid username");
            if(filled && validPassword  && validUser){
                $('#submit').prop('disabled', false);
            }else
                $('#submit').prop('disabled', true);
        });
    }
}