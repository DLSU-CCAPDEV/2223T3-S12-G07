const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');

const controller = {
    getIndex: function(req, res){
        res.render('login');
    },


    getFavicon: function(req, res){
        res.status(204);
    },
}

module.exports = controller;