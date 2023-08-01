var mongoose = require('mongoose');
var ReplySchema = new mongoose.Schema({
    author:{
        type : String,
        require : true
    },
    comment:{
        type:String,
        required: true
    },
    date:{
        type: Date,
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