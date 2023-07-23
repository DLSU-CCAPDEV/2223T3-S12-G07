const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const homeController ={
    getHome: function(req, res){
        res.render('home');
    },
    
        
};

module.exports = homeController;