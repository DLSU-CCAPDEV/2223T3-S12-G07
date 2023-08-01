const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');

const profileController ={
    getProfile: async function(req, res){
        var user = req.query.userName;
        var query = {userName: user};
        var details = {};
        req.session.prev_page = 'profile_page';
        var posts = [];
        var comments = [];
        var replies = [];
        var reply = null;  
        var comment = null;
        var post = null;
        var data = await db.findOne(User, query);

        if(data != null)
        {
            if(data.posts != null && data.posts.length > 0)
            {
                for (const i of data.posts) {
                    comments = [];
                    console.log("postID = " + i);
                    post =  await db.findOne(Post, {_id: i});
                    console.log("post "+post);
                    if(post!= null){
                        if(post.comments != null && post.comments.length > 0){
                            for(const j of post.comments){
                                replies = [];
                                console.log("commentId = " + j);
                                comment = await db.findOne(Comment, {_id: j});
                                if(comment != null){
                                    console.log("comment = " + comment)
                                    if(comment.replies != null && comment.replies.length>0){
                                        for(const h of comment.replies){
                                            console.log("replyId = " + h);
                                            reply = await db.findOne(Reply, {_id: h});
                                            if(reply != null){
                                                console.log("reply = " + reply);
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
                        posts.push(post);
                        console.log("post = " + post);
                    }
                }
            }
            data.posts = posts;
            console.log("data.posts = "+data.posts);
            if(req.session.flag){
                if(data.posts.length > 0 && data.posts != null){
                    data.posts.flag = data.posts.map(function(post){
                        post.flag = true;
                    });
                }
                details.flag = true;
                details.data = data;
                console.log(" data with flag = "+ details);
    
                if(req.session.user.userName == user){
                    details.user = true;
                }else
                    details.user = false;
            }else{
                details.flag = false;
                details.user = false;
            }
           console.log(req.session.flag);
            res.render('profile_page',details);
        }
        
    },

    getCheckUpvoted: async function (req, res){
        var object = req.query.object;
        var username = req.query.username;
        var result = await object.upvotes.includes(username)
        if(result)
            res.send(true);
        else
            res.send(false);
    },
    postUpvoteContent: async function(req ,res){
        var Model = req.body.model;
        var username = req.body.username;
        var object = req.body.object;
        var response = await db.updateOne(Model, {id: object.id }, {$push: {upvotes: username}});
        if(response != null){
            db.updateOne(User, {username: username}, {$pull: {downvotes: object.id}});
        } else{
            return false;
        }
    },
    postDownvoteContent: async function(req, res){
        var response = await db.updateOne(Post, {id: object.id }, {$push: {upvotes: username}});
        if(response != null){
            db.updateOne(User, {username: username}, {$pull: {downvotes: object.id}});
        } else{
            return false;
        }
    },

    editProfile: async function(req, res){},
    editContent: async function(req, res){},
}

module.exports = profileController;