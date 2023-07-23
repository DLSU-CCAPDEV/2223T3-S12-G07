const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const homeController ={
    getHome: async function(req, res){
        var details={}
        var posts = await db.findMany(Post, {});
        req.session.prev_page = 'home';
        if(req.session.flag){
            details.flag = true;
            details.user= true;
            data = {
                userName : req.session.user.userName,
                firstName : req.session.user.firstName,
                lastName : req.session.user.lastName,  
            }
            posts.forEach(function(post){
                post.flag = req.session.flag;
            });
            console.log(posts);
            details.posts = posts;
            details.data = data;
        }else
        details.flag = false;
        res.render('home',details);
    },
};

module.exports = homeController;