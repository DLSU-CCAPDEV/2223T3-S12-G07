const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const homeController ={
    getHome: async function(req, res){
        var details={}
        var posts = await db.findMany(Post, {});
        var tempPost = [];
        var comments = [];
        var comment = null;
        var replies = [];
        var reply = null;
        console.log("username" + req.session.user.userName +" flag = "+ req.session.flag);
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
                                        if(req.session.flag){
                                            reply.flag=true;
                                            if(req.session.user.userName == post.username)
                                                reply.user = true;
                                        }
                                        replies.push(reply);
                                    }
                                }
                                comment.replies = replies;
                            }
                            if(req.session.flag){
                                comment.flag=true;
                                if(req.session.user.userName == post.username)
                                    comment.user = true;
                            }
                            comments.push(comment);
                        }
                    }
    
                    post.comments = comments;
                    
                }
                if(req.session.flag){
                    post.flag=true;
                    if(req.session.user.userName == post.username)
                        post.user = true;
                }
                tempPost.push(post);
            }
        }
        
        if(req.session.flag){
            
            details.flag = true;
            details.user= true;
            data = {
                userName : req.session.user.userName,
                firstName : req.session.user.firstName,
                lastName : req.session.user.lastName,  
            }
            details.posts = tempPost;
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