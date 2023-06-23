function email_validation(email){
    if(email==""){
        return false;
    }
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}

function password_strength(password){
    if(password=="" || password.length<8){
        return false;
    }
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}


function contact_number_validation(number){
    var regex = /((^(\+)(\d){12}$)|(^\d{11}$))/;
    return regex.test(number);
}
function login_validation(){
    event.preventDefault();
    var  form = document.getElementById("login_form");
    var email = form.email.value;
    var password = form.password.value;
    var remmember = form.remember;

    if(!email_validation(email)){
        alert("Please enter correct email format."); 
        form.email="";
        return false;
    }else{
        if(!password_strength(password)){
            alert("Please enter a correct password format.");
            return false;
        }else{
            form.submit();
        }
    }
}
function sign_up_validation(){
    event.preventDefault();
    var form = document.getElementById("sign_up_form");
    var email = form.email.value;
    var password = form.password.value;
    var confirm_password = form.confirm_password.value;
    var contact_number = form.contact_number.value;
    var gate = true;
    var warning = document.getElementById("warning");

    if(!email_validation(email)){
        alert("Please enter correct email format.");
        form.email.reset();
        gate = false;
    }
    if(!password_strength(password)){
            alert("Please enter a stronger password.");
            warning.style.display = "block";
            gate = false;
        }
    if(password != confirm_password){
            alert("Password and confirm password does not match.");
            gate= false;
    }
    if(contact_number!=""){
        if(!contact_number_validation(contact_number)){
            alert("Please enter a correct contact number format.");
            form.contact_number="";
            gate = false;
        }
    }
    if(gate)
        form.submit();
    else
        return false;
}

function edit_profile_validate(){
    event.preventDefault();
    var form = document.getElementById("edit_profile_form");
    contact_number = form.contact_number.value;

    if(contact_number!=""){
        if(!contact_number_validation(contact_number)){
            alert("Please enter a correct contact number format.");
            form.contact_number="";
            return false;
        }
    }
}