var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{
        type : String,
        require : true
    },
    date:{
        type: Date,
        required: true
    },
    title:{
        type: String,
        required : true
    },
    content:{
        type: String,
        required: true
    },
    comments:{
        type: Array,
        required: false
    },
    id:{
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        required: true
    },
    downvotes:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);