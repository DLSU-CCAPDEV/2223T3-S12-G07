const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');

const controller = {

    getIndex: function(req, res){
        res.redirect('login');
    },
    getFavicon: function(req, res){
        res.status(204);
    },
    getLogout: function (req, res) {
        var link = req.query.redirectTo;
        req.session.destroy(function(err) {
            if(err) throw err;
    
            res.redirect(`/${link}`);
        });
    }
};

module.exports = controller;
