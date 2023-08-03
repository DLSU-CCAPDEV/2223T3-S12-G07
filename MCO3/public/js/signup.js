$(document).ready(function(){


    //todo: display warning message if username exists
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