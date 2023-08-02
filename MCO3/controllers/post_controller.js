const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const app = require('../routes/routes.js');
const { getCheckIdNumber } = require('./signup_controller.js');
const postController ={
    getCreatePost:async function(req,res){
        if(req.session.flag){
        var userName = req.session.user.userName;
        var firstName = req.session.user.firstName;
        var lastName = req.session.user.lastName;
        res.render('create_post',{userName:userName,firstName:firstName,lastName:lastName});
        }else{
            res.redirect('/login');
        }
    },
    postCreatePost:async function(req,res){
        var userName = req.body.userName;
        var title = req.body.title;
        var content = req.body.content;
        var date = new Date();
        var post = {
            username: userName,
            title: title,
            content: content,
            date: date,
        };
        var result = await db.insertOne(Post, post);
        var id = await db.findOne(Post,post);
        id._id = id._id.toString();
        if(result != null){
            await db.updateOne(User,{userName:userName},{$push:{posts:id._id}});
            res.redirect(`/${req.session.prev_page}?userName=${userName}`);
        }
    },

    postAddComment: async function(req,res){
        var author = req.session.user.userName;
        var content = req.body.content;
        var date = req.body.date;
        var post = req.body.post;
        var comment = {
            author: author,
            content: content,
            date: date,
            post: post,
        };
        var result = await db.insertOne(Comment, comment);
        if(result != null){
            var created = await db.findOne(Comment,comment);
            console.log("created: "+created);
            if(created != null){
                result1 = await db.updateOne(Post,{_id:post},{$push:{comments:created._id}});
                if(result1 != null)
                    result2 = await db.updateOne(User,{userName:author},{$push:{comments:created._id}});
                    if(result2 !=null)
                        res.render('partials/comment',{author: created.author, _id:created._id, content:created.content});
            }
        }
    },
    postAddReply: async function(req,res){
        var  author = req.session.user.userName;
        var content = req.body.content;
        var date = req.body.date;
        var comment = req.body.comment;
        var reply={
            author: author,
            content: content,
            date: date,
            comment: comment,
        };
        var result = await db.insertOne(Reply, reply);

        if(result != null){
            var created = await db.findOne(Reply,reply);
            await db.updateOne(Comment,{_id:comment},{$push:{replies:created._id}});
            await db.updateOne(User,{userName:author},{$push:{replies:created._id}});
            created._id = created._id.toString();
            res.render('partials/reply',{author: created.author, _id:created._id, content:created.content});
        }},

        getCheckVote: async function(req, res){
            if(req.session.flag){
                var user = req.session.user.userName;
                var id = req.query.id;
                id = id.split('_');
                var idNum = id[2];
                console.log(idNum);
                var result = null;
                var flag = {
                    downvote: false,
                    upvote: false
                };
                if(id[1]=="posts"){
                    result = await db.findOne(Post, {_id:idNum});
                }else if(id[1]=="comments"){
                    result = await db.findOne(Comment, {_id: idNum});
                }else{
                    result = await db.findOne(Reply, {_id:idNum});
                }
                if(result != null){
                    if(result.upvotes.includes(user) && id[0] =="upvote"){
                        flag.upvote = true;
                    }else if(result.downvotes.includes(user) && id[0] =="downvote"){
                        flag.downvote = true;
                    }
                }
                console.log(flag);
                res.set('Content-Type', 'application/json');
                res.send(flag);
            }else{
                res.send(null);
            }
        },
        postVoteTally: async function(req,res){
            var button_id = req.param.button_id;
            button_id = button_id.split('_');
            var idNum = button_id[2];
            var tally = req.param.votes;
            var original_tally = {};
            var result =""
            if(button_id[1]=="posts"){
                original_tally = await db.findOne(Post,{_id:idNum});
                result = await db.updateOne(Post,{_id:idNum}, {$set: {downvotes: original_tally.downvotes+tally.downvotes, upvotes: original_tally.upvotes+tally.upvotes}});
                if(result!=null){
                    res.render();
                }
            }else if(button_id[1]=="comments"){
                original_tally = await db.findOne(Comment,{_id:idNum});
                result = await db.updateOne(Comment, {_id:idNum}, {$set: {downvotes: original_tally.downvotes+tally.downvotes, upvotes: original_tally.upvotes+tally.upvotes}});
            }else{
                original_tally = await db.findOne(Reply, {_id: idNum});
                result = await db. updateOne(Reply, {_id:idNum}, {$set: {downvotes: original_tally.downvotes+tally.downvotes, upvotes: original_tally.upvotes+tally.upvotes}});
            }
            total = {downvotes: original_tally.downvotes + tally.downvotes, upvotes: original_tally.upvotes + tally.upvotes, button_id: button_id[1]+'_'+getCheckIdNumber};
            res.send(total);
        },

        getVoteTally:async function(req,res){
            var button_id= req.body.button_id;
            button_id = button_id.split('_');
            console.log(button_id);
            var idNum = button_id[2];
            var model = button_id[1];
            var original_tally={};
            if(button_id[1]=="posts"){
                original_tally = await db.findOne(Post,{_id:idNum});
                if(result!=null){
                    res.render();
                }
            }else if(button_id[1]=="comments"){
                original_tally = await db.findOne(Comment,{_id:idNum});
            }else{
                original_tally = await db.findOne(Reply, {_id: idNum});
            }
            total = {downvotes: original_tally.downvotes + tally.downvotes, upvotes: original_tally.upvotes + tally.upvotes,button_id: button_id[1]+'_'+getCheckIdNumber};
            res.render(send);
        },
};

module.exports = postController;