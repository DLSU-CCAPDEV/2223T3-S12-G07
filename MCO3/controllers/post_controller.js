const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const postController ={

    getCreatePost:async function(req,res){
        var userName = "";
        var firstName = "";
        var lastName = "";
        if(req.session.flag){
            userName = req.session.user.userName;
            firstName = req.session.user.firstName;
            lastName = req.session.user.lastName;
            var active_user = req.session.user;
            
        res.render('create_post',{userName:userName,firstName:firstName,lastName:lastName, active_user:active_user, flag:true});
        }else{
            res.redirect('/login');
        }
    },
    postCreatePost:async function(req,res){
        var userName = req.body.userName;
        var title = req.body.title;
        var content = req.body.content;
        var result2, result3 = null;
        var id = "";
        var date = new Date();
        var post = {
            username: userName,
            title: title,
            content: content,
            date: date,
        };
        var result = await db.insertOne(Post, post);
        
        if(result){
            result2 = await db.findOne(Post, post);
            if(result2){
                 id = result2._id;
                result3 = await db.updateOne(User,{userName:userName},{$push:{posts:id}});
                if(result3){
                    res.redirect(`/${req.session.prev_page}?userName=${userName}`);
                }
                    
                }
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
            if(created != null){
                result = await db.updateOne(Post,{_id:post},{$push:{comments:created._id}});
                if(result != null){
                    result = await db.updateOne(User,{userName:author},{$push:{comments:created._id}});
                    if(result !=null){
                        res.set('Content-Type', 'application/json');
                        res.send(created);
                    }
                }
            }else{
                res.status(404).send(null);
            }
        }else
            res.status(404).send(null);
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
            res.set('Content-Type', 'application/json');
            res.send(created);
        }else
            res.status(404).send(null);

    },
    getAddComment: async function(req,res){
        if(req.session.flag){
            var id = req.query.id;
            var created = await db.findOne(Comment,{_id:id});
            var author = created.author;
            if(req.session.user.userName == author){
                res.render('partials/comment',{author: created.author, _id:created._id, content:created.content, flag: true, user: true});
            }else{
                res.render('partials/comment',{author: created.author, _id:created._id, content:created.content, flag: true, user: false});
            }
        }else{
            res.render('partials/comment',{author: created.author, _id:created._id, content:created.content, flag: false, user: false});
        }
    },
    getAddReply: async function(req,res){
        if(req.session.flag){
            var id = req.query.id;
            var created = await db.findOne(Reply,{_id:id});
            var author = created.author;
            if(req.session.user.userName == author){
                res.render('partials/reply',{author: created.author, _id:created._id, content:created.content, flag: true, user: true});
            }else{
                res.render('partials/reply',{author: created.author, _id:created._id, content:created.content, flag: true, user: false});
            }
        }else{
            res.render('partials/reply',{author: created.author, _id:created._id, content:created.content, user: false});
        }
    },

    getCheckVote: async function(req, res){
        if(req.session.flag){
            var user = req.session.user.userName;
            var id = req.query.id;
            id = id.split('_');
            var idNum = id[2];
            var result = null;
            var flag = {
                downvote: false,
                upvote: false
            };
            if(id[1]=="posts"){
                result = await db.findOne(Post, {_id:idNum});
            }else if(id[1]=="comment"){
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
            var result ="";
            if(button_id[1]=="posts"){
                original_tally = await db.findOne(Post,{_id:idNum},"upvotes downvotes");
                if(original_tally){
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
               if(tally < 0){
                    if(original_tally.downvotes.includes(name)){
                        result = await db.updateOne(Post, {_id:idNum}, {$pull:{downvotes:name}});
                    }
               }
               if(tally.upvotes < 0 ){
                    if(original_tally.upvotes.includes(name)){
                        result = await db.updateOne(Post,{_id:idNum}, {$pull:{upvotes:name}});
                    }
               }
            }
        }else if(button_id[1]=="comment"){
                original_tally = await db.findOne(Comment,{_id:idNum});
                if(original_tally){
                if(tally.upvotes >0){
                    if(!original_tally.upvotes.includes(name)){
                        result = await db.updateOne(Comment,{_id:idNum}, {$push:{upvotes: name}});
                    }
                }
               if(tally.downvotes.length > 0){
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
            }
            
            }else{

                original_tally = await db.findOne(Reply, {_id: idNum});
                if(original_tally){
                if(tally.upvotes >0){
                    if(!original_tally.upvotes.includes(name)){
                        result = await db.updateOne(Reply,{_id:idNum}, {$push:{upvotes: name}});
                    }
                }
               if(tally.downvotes > 0){
                    if(original_tally && !original_tally.downvotes.includes(name)){
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
               }}
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
            if(req.session.flag){
                if(post!= null)
                result = await db.updateOne(User, {userName:name}, {$pull:{posts:id}});
                if(result!=null){
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
            }
            
            res.set('Content-Type', 'application/json');
            res.send({flag:true});
        },
        postDeleteComment: async function(req, res){
            var id = req.body.id;
            var name = req.session.user.userName;
            var comment = await db.findOne(Comment,{_id:id});
            var result = "";
            var reply = ""
            if(req.session.flag){
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
            }
            
            res.set('Content-Type', 'application/json');
            res.send({flag:true});
        },
        postDeleteReply: async function(req, res){
            var id = req.body.id;
            var name = req.session.user.userName;
            var result = "";
            var reply  = await db.findOne(Reply, {_id:id});
            if(req.session.flag){
                result = await db.updateOne(User, {userName:name}, {$pull:{replies:id}});
                result = await db.updateOne(Comment, {_id:reply.comment}, {$pull:{replies:id}});
                result = await db.deleteOne(Reply, {_id:id});
            }
            res.set('Content-Type', 'application/json');
            res.send({flag:true});
        },
        postEditPost: async function(req, res){
            var id = req.body.id;
            var type = req.body.type;
            var content = req.body.content;
            var title = "";
            if(req.session.flag){
                if(type=="post"){
                    title = req.body.title;
                    if(title!= null && title != ""){
                        result = await db.updateOne(Post, {_id:id}, {title:title});
                    }
                    if(content!= null && content != ""){
                        result = await db.updateOne(Post, {_id:id}, {content:content});
                    }
                }else if(type =="comment"){
                    if(content!= null && content != ""){
                        result = await db.updateOne(Comment, {_id:id}, {content:content});
                    }
                }else if(type =="reply"){
                    if(content!= null && content != ""){
                        result = await db.updateOne(Reply, {_id:id}, {content:content});
                }
            }
            res.redirect(`/${req.session.prev_page}?userName=${userName}`);
        }
        },
 
        getEditPost: async function(req, res){
            var id = req.query.id;
            var type = req.query.type;
            var content = req.query.content;
            var title, query ="";
            var post = req.query.post;
            if(type == "post"){
                title = req.query.title;
            }
            if(req.session.flag){
                userName = req.session.user.userName;
                firstName = req.session.user.firstName;
                lastName = req.session.user.lastName;
                if(type == "post")
                    query ={
                        userName: userName,
                        firstName: firstName,
                        lastName: lastName,
                        type: type,
                        title: title,
                        content: content,
                        id: id,
                        post: post,
                        active_user: req.session.user,
                        flag: true,
                    }
                else
                    query = {
                        userName: userName,
                        firstName: firstName,
                        lastName: lastName,
                        type: type,
                        content: content,
                        id: id,
                        active_user: req.session.user,
                        flag:true,
                    }
                res.render('edit_post', query);
                
            }else{
                res.redirect('/');
            }
        },
        getViewPost: async function(req, res){
            var id = req.query.postid;
            var post = await db.findOne(Post, {_id:id});
            var comments = [];
            var comment = "";
            var replies = [];
            var reply = "";
            if(post!= null){
                for(const i of post.comments){
                    replies = [];
                    comment = await db.findOne(Comment, {_id:i});
                    if(comment!=null){
                        if (comment.replies!= null && comment.replies.length>0){
                            for(const j of comment.replies){
                                reply = await db.findOne(Reply, {_id:j});
                                if(reply!=null){
                                    if(req.session.flag){
                                        if(req.session.user.userName == reply.author){
                                            reply.user = true
                                        }
                                    }
                                    replies.push(reply);
                                }
                            }
                            comment.replies = replies;
                        }
                        if(req.session.flag){
                            comment.flag= true;
                            if(req.session.user.userName == comment.author){
                                comment.user = true
                            }
                        }
                        comments.push(comment);
                    }
                }
                post.comments = comments;
                if(req.session.flag){
                    post.flag= true;
                    if(req.session.user.userName == post.username){
                        post.user = true
                    }
                }
                if(req.session.flag){
                    var active_user = {
                        userName: req.session.user.userName,
                        firstName: req.session.user.firstName,
                        lastName: req.session.user.lastName,
                    }
                    res.render('post', { posts: post, flag: true, active_user: active_user});
                }else{
                    res.render('post', { posts: post, flag: false});
                }
            }else{
                res.redirect('/home');
            }
        },

        getTrending: async function(req, res){
            const sort = req.query.sort;
            const model = req.query.model;
            const page = req.session.prev_page;
            var data_posts = [];
            var  posts =[];
            var comments = [];
            var  replies =[];
            var post, comment, reply = "";
            var user = "";
            if(req.session.prev_page == "profile_page"){
                data_posts = await db.sort(Post,{username:req.session.prev_page_user},{},sort);
                user= req.session.prev_page_user;
            }else if(req.session.prev_page=="home"){
                data_posts = await db.sort(Post,{},{},sort);
            }
            console.log(data_posts)
            if(data_posts != null && data_posts.length > 0)
            {
                for (var i = 0; i<data_posts.length; i++) {
                    comments = [];
                    post=data_posts[i];
                    console.log("post = " + post);
                    if(post!= null){
                        if(post.comments != null && post.comments.length > 0){
                            for(const j of post.comments){
                                replies = [];
                                comment = await db.findOne(Comment, {_id: j});
                                if(comment != null){
                                    if(comment.replies != null && comment.replies.length>0){
                                        for(const h of comment.replies){
                                            reply = await db.findOne(Reply, {_id: h});
                                            if(reply != null){
                                                if(req.session.flag){
                                                    reply.flag=true;
                                                    if(req.session.user.userName == user)
                                                        reply.user = true;
                                                }
                                                replies.push(reply);
                                            }
                                        }
                                        comment.replies = replies;
                                    }
                                    if(req.session.flag){
                                        comment.flag=true;
                                        if(req.session.user.userName == user)
                                            comment.user = true;
                                    }
                                    comments.push(comment);
                                }
                            }
                            post.comments = comments;
                        }
                        if(req.session.flag){
                            post.flag=true;
                            if(req.session.user.userName == user)
                                post.user = true;
                        }
                        posts.push(post);
                    }
                }
        }
            res.send(posts);
        },
        getRenderPost : async function(req, res){
            const post = req.query.post;
            if(req.session.flag){
                post.flag=true;
                if(req.session.user.userName == post.username)
                    post.user = true;
            }
            res.render('partials/posts_card', post);
        },
    
};

module.exports = postController;