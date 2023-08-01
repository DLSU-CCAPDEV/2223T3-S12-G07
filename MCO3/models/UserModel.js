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
    email:{
        type: String,
        required: true
    },
    contactNumber:{
        type:String,
        required: false
    },
    idNumber:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    posts:{
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    aboutMe:{
        type: String,
        required: false
    },
    replies:{
        type: Array,
        required: false
    }

});

module.exports = mongoose.model('User', UserSchema);