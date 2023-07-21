var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    //username of the commentor
    author:{
        type : String,
        require : true
    },
    //id of the post commented on
    post:{
        type: String,
        required: true
    },
    replies:{
        type: Array,
        required: false
    },
    date:{
        type: Date,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);