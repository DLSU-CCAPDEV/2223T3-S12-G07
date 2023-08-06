
$(document).ready(function(){
    $('#contact_number').keyup(function(){
        validateField($('#contact_number'), 'Contact Number ', $('#warning_contact_number'));
    });

  
});

// client side validators
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

function validateField(field, fieldName, error) {

    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);
    field.prop('value',value.split(" ").join(""));
    // if the value of `field` is empty
    if(empty && !field.is($('#contact_number'))) {

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
        
        var validContact = isValidContactNumber(field);

        if(validContact){
            $('#submit').prop('disabled', false);
        }else
            $('#submit').prop('disabled', true);
    }


}