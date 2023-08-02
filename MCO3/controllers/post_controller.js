const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
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
                if(result!= null && result.upvotes.length > 0){
                    if(result.upvotes.includes(user) && id[0] =="upvote"){
                        flag.upvote = true;
                    }
                }
                if(result!= null && result.downvotes.length>0){
                    if(result.downvotes.includes(user) && id[0] =="downvote"){
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
            if(req.session.flag){
                var name = req.session.user.userName;
                var button_id = req.body.button_id;
                button_id = button_id.split('_');
                var idNum = button_id[2];
                var tally = {downvotes: req.body.downvotes, upvotes: req.body.upvotes};
                var original_tally = {};
                var result =""
                console.log("button id = " + button_id);
                if(button_id[1]=="posts"){
                    original_tally = await db.findOne(Post,{_id:idNum},"upvotes downvotes");
                    if(tally.upvotes >0){
                        if(!original_tally.upvotes.includes(name)){
                            result = await db.updateOne(Post,{_id:idNum}, {$push:{upvotes: name}});
                        }
                    }
                   if(tally.downvotes > 0){
                        if(!original_tally.downvotes.includes(name)){
                            result = await db.updateOne(Post, {_id:idNum}, {$push:{downvotes: name}});
                        }
                   }
                   if(tally.downvotes < 0){
                        if(original_tally.downvotes.includes(name)){
                            result = await db.updateOne(Post, {_id:idNum}, {$pull:{downvotes:name}});
                        }
                   }
                   if(tally.upvotes < 0 ){
                        if(original_tally.upvotes.includes(name)){
                            result = await db.updateOne(Post,{_id:idNum}, {$pull:{upvotes:name}});
                        }
                   }
                }else if(button_id[1]=="comments"){
                    original_tally = await db.findOne(Comment,{_id:idNum});
                    if(tally.upvotes >0){
                        if(!original_tally.upvotes.includes(name)){
                            result = await db.updateOne(Comment,{_id:idNum}, {$push:{upvotes: name}});
                        }
                    }
                   if(tally.downvotes > 0){
                        if(!original_tally.downvotes.includes(name)){
                            result = await db.updateOne(Comment, {_id:idNum}, {$push:{downvotes: name}});
                        }
                   }
                   if(tally.downvotes < 0){
                        if(original_tally.downvotes.includes(name)){
                            result = await db.updateOne(Comment, {_id:idNum}, {$pull:{downvotes:name}});
                        }
                   }
                   if(tally.upvotes < 0 ){
                        if(original_tally.upvotes.includes(name)){
                            result = await db.updateOne(Comment,{_id:idNum}, {$pull:{upvotes:name}});
                        }
                   }
                }else{

                    original_tally = await db.findOne(Reply, {_id: idNum});
                    if(tally.upvotes >0){
                        if(!original_tally.upvotes.includes(name)){
                            result = await db.updateOne(Reply,{_id:idNum}, {$push:{upvotes: name}});
                        }
                    }
                   if(tally.downvotes > 0){
                        if(!original_tally.downvotes.includes(name)){
                            result = await db.updateOne(Reply, {_id:idNum}, {$push:{downvotes: name}});
                        }
                   }
                   if(tally.downvotes < 0){
                        if(original_tally.downvotes.includes(name)){
                            result = await db.updateOne(Reply, {_id:idNum}, {$pull:{downvotes:name}});
                        }
                   }
                   if(tally.upvotes < 0 ){
                        if(original_tally.upvotes.includes(name)){
                            result = await db.updateOne(Reply,{_id:idNum}, {$pull:{upvotes:name}});
                        }
                   }
                }

                var up, down = null;
                if( original_tally.upvotes!=null &&original_tally.upvotes.length > 0)
                     up = original_tally.upvotes.length + parseInt(tally.upvotes);
                if(original_tally.downvotes!=null && original_tally.downvotes.length > 0)
                     down = original_tally.downvotes.length + parseInt(tally.downvotes);
                var msg = {upvotes: up, down, flag:true};
                res.set('Content-Type', 'application/json');
                res.send(msg);
            }else{
            res.set('Content-Type', 'application/json');
            res.send({flag:false});
            }
        },

        postDeletePost: async function(req, res){
            var id  =  req.body.id;
            var name = req.session.user.userName;
            var post = await db.findOne(Post, {_id:id});
            var result = "";
            var comment = "";
            if(post!= null)
                result = await db.updateOne(User, {userName:name}, {$pull:{posts:id}});
            

            if(post!=null){
                if(post.comments != null && post.comments.length>0){

                
                    for(const x of post.comments){
                        comment = await db.findOne(Comment, {_id:x});
                        if(comment!=null){
                            if(comment.replies.lenght> 0){
                                for(const y of comment.replies){
                                    result = await db.updateOne(User, {userName: name}, {$pull:{replies:y}})
                                    result = await db.deleteOne(Reply, {_id:y});
                                }
                                result = await db.updateOne(User, {userName: name}, {$pull:{comments: x}})
                                result = await db.deleteOne(Comment, {_id:x});
                            }
                        }
                    }
                }
                result = await db.deleteOne(Post, {_id:id});
            }
            res.set('Content-Type', 'application/json');
            res.send({flag:true});
        },
        postDeleteComment: async function(req, res){
            var id = req.body.id
            var name = req.session.user.userName;
            var comment = await db.findOne(Comement,{_id:id});
            var result = "";
            var reply = ""
            result = await db.updateOne(User,{userName:name}, {$pull:{comments:id}});
            result = await db.updateOne(Post,{_id:comment.post}, {$pull:{comments:id}});
            if(comment!= null){
                if(comment.replies != null && comment.replies.length > 0){
                    for(const x of comment.replies){
                        result = await db.updateOne(User, {userName:name}, {$pull:{replies:x}});
                        result = await db.deleteOne(Reply, {_id:x});
                    }
                }
                result = await db.deleteOne(Comment, {_id:id});
            }
            res.set('Content-Type', 'application/json');
            res.send({flag:true});
        },
        postDeleteReply: async function(req, res){
            var id = req.body.id
            var name = req.session.user.userName;
            var result = "";
            result = await db.updateOne(User, {userName:name}, {$pull:{replies:id}});
            result = await db.updateOne(Comment, {_id:reply.comment}, {$pull:{replies:id}});
            result = await db.deleteOne(Reply, {_id:id});
            res.set('Content-Type', 'application/json');
            res.send({flag:true});
        },
        postEditPost: async function(req, res){
            
        },
        postEditComment: async function(req, res){

        },
        postEditReply: async function(req, res){

        },
};

module.exports = postController;