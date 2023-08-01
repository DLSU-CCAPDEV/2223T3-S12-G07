var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
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
    upvotes:{
        type: Array,
        required: false
    },
    downvotes:{
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Post', PostSchema);