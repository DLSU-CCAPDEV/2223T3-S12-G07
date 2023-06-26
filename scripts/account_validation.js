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
    var remember = form.remember;

    if(!email_validation(email)){
        alert("Please enter correct email format."); 
        return false;
    }else{
        if(!password_strength(password)){
            alert("You might have entered a wrong password. Please try again. Hint: atleast 8 letters, atleast 1 uppercase, atleast 1 lowercase, atleast 1 number and no special characters.");
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
            alert("Please enter a correct contact number format. (+639xxxxxxxxxx 09xxxxxxxxx) ");
            form.contact_number="";
            gate = false;
        }
    }
    if(gate){
        const formData = new FormData(form);
        const params = new URLSearchParams(formData);
        const GetURL = `${form.action}?${params.toString()}`;
        console.log(GetURL);
        window.location = GetURL;
    }
    else
        return false;
}
var globalUrl="&prof_pic=&cov_pic=";
function edit_profile_validate(){
    event.preventDefault();
    var form = document.getElementById("edit_profile_form");
    contact_number = form.contact_number.value;

    if(contact_number!=""){
        if(!contact_number_validation(contact_number)){
            alert("Please enter a correct contact number format. (+639xxxxxxxxxx 09xxxxxxxxx) ");
            form.contact_number="";
            return false;
        }
    }
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);
    const GetURL = `${form.action}?${params.toString()}&${globalUrl}`;//;
    
    console.log(GetURL);

    const fetchOptions = {
        method: form.method,
        body:formData
      };
      
    fetch(GetURL, fetchOptions);
    window.location = GetURL;

}

function image_upload_preview(event, id){
    var output = document.getElementById(`${id}`);
    filePath = URL.createObjectURL(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () =>{
        var urlParams = new URLSearchParams(globalUrl);

        urlParams.set(id, window.encodeURI(reader.result));
        globalUrl = urlParams.toString();
        console.log(globalUrl);

    });
    reader.readAsDataURL(event.target.files[0]);
    output.style.backgroundImage= `url(${filePath})`;
    output.onload = function() {
      URL.revokeObjectURL(output.style.backgroundImage)// free memory
    }
    output.style.display="block";
   var unhide = document.getElementById(`${id}_br`);
   unhide.style.display="block";
}