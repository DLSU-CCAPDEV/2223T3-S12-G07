var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName:{
        type : String,
        require : true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);