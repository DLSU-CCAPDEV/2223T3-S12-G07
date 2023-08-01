const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const homeController ={
    getHome: async function(req, res){
        var details={}
        var posts = await db.findMany(Post, {});
        var comments = [];
        var comment = null;
        var replies = [];
        var reply = null;

        if(posts != null && posts.length > 0){
            for(const post of posts){
                comments = []
                if(post.comments != null && post.comments.length > 0){
                    for(const i of post.comments){
                        replies = []
                        comment = await db.findOne(Comment, {_id: i});
                        if(comment != null){
                            if(comment.replies != null && comment.replies.length > 0){
                                for(const j of comment.replies){
                                    reply = await db.findOne(Reply, {_id: j});
                                    if(reply != null){
                                        replies.push(reply);
                                    }
                                }
                                comment.replies = replies;
                            }
                            comments.push(comment);
                        }
                    }
                    post.comments = comments;
                }
            }
        }
        
        if(req.session.flag){
            posts.flag = posts.map(function(post){
                post.flag = true;
            });
            details.flag = true;
            details.user= true;
            data = {
                userName : req.session.user.userName,
                firstName : req.session.user.firstName,
                lastName : req.session.user.lastName,  
            }
            details.posts = posts;
            details.data = data;
        }else{
            details.flag=false;
            details.posts = posts;
        }
        req.session.prev_page = 'home';
        res.render('home',details);
    },
};

module.exports = homeController;