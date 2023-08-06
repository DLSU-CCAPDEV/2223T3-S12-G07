var mongoose = require('mongoose');
var ImageSchema = new mongoose.Schema({
    author:{
        type : String,
        require : true
    },
    date:{
        type: Date,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required: true
    }

});
module.exports = mongoose.model('Image', ImageSchema);