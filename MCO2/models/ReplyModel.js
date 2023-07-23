var mongoose = require('mongoose');
var ReplySchema = new mongoose.Schema({
    author_replier:{
        type : String,
        require : true
    },
    replied_to:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    level:{
        type: Number,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    upvotes:{
        type: Array,
        required: false
    },
    downvotes:{
        type: Array,
        required: false
    }
});
module.exports = mongoose.model('Reply', ReplySchema);