const User = require('../models/UserModel.js');

$document.ready(function(){

    function redirectProfile(){
        $('.profile_picture_bubble').click(function(){
            window.location.href = '/profile_page?userName='+$(this).attr('id');
        });
    }
    
});