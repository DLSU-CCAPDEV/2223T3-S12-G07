const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const { render } = require('express/lib/response.js');

const profileController ={
    getProfile: function(req, res){
        var user = req.query.username;
        var query = {username: user};
        var projection = 'username firstName lastName posts comments';
        db.findOne(User, query, projection, function(result){
            if(result != null){
                var details = {
                    username: result.username,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    posts: result.posts,
                    comments: result.comments
                };
                res.render('profile', details);
            }
            else{
                res.render('error');
            }
        });
    },
    postComment: async function(req, res){
        var username = req.body.username;
        var comment = req.body.content;
        var post = req.body.post;
        var date = new Date();
        var id = new id();
        var comment = {
            username: username,
            content: comment,
            date: date,
            post: post,
            id: id,
        };
        
        var response = await db.insertOne(Comment, comment);

        if(response != null){
            var user_response = await db.updateOne(User, {username: username}, {$push: {comments: comment}});
            if (user_response != null){
                res.render('profile', details);
            } else{
                res.render('error');
            }
        } else{
            res.render('error');
        }
    },

    postReply: async function(req, res){
        var username = req.body.username;
        var reply = req.body.content;
        var comment = req.body.comment;
        var date = new Date();
        var id = new id();
        var reply = {
            username: username,
            content: reply,
            date: date,
            comment: comment,
            id: id,
        };
        
        var response = await db.insertOne(Reply, reply);

        if(response != null){
            var user_response = await db.updateOne(User, {username: username}, {$push: {replies: reply}});
            if (user_response != null){
                res.render('profile', details);
            } else{
                res.render('error');
            }
        } else{
            res.render('error');
        }
    },
    checkUpvoted: async function (post, username){
        var result = await post.upvotes.includes(username)
        if(result)
            return true;
        else
            return false;
    },

    upvotePost: async function(Model, object, username){
        var response = await db.updateOne(Post, {id: object.id }, {$push: {upvotes: username}});
        if(response != null){
            db.updateOne(User, {username: username}, {$pull: {downvotes: object.id}});
        } else{
            return false;
        }
    },
    downvoteReply: async function(req, res){
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