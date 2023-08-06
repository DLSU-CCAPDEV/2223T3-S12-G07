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
        req.session.prev_page_user = user;
        console.log(req.session.prev_page_user);
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
                if(data.cover_photo)
                    $.get('/byID', {filename:data.cover_photo}, function(data){
                    if(data != null){
                        details.cover_photo = data;
                        console.log(data);
                    }
                })
                for (const i of data.posts) {
                    comments = [];
                    post =  await db.findOne(Post, {_id: i});
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
            data.posts = posts;
            if(req.session.flag){

                details.flag = true;
                details.data = data;
                details.active_user = req.session.user;
    
                if(req.session.user.userName == user){
                    details.user = true;
                }else
                    details.user = false;
            }else{
                details.flag = false;
                details.user = false;
                details.data= data;
            }
            res.render('profile_page',details);
        }else{
            res.redirect('/home');
        }
    },

    getEditProfile: async function(req, res){
        if(req.session.flag){
            var username = req.session.user.userName;
            var projection = "userName firstName lastName aboutMe contact_number";
            var user = await db.findOne(User, {userName: username}, projection);
            console.log('from get: '+ user);
            res.render('editprofile',user);
        }else{
            res.redirect('/');
        }

    },

    postEditProfile: async function(req, res){
        if(req.session.flag){
            var username = req.session.user.userName;
            var user = await db.findOne(User, {userName: username});
            var firstName = req.body.first_name;
            var lastName = req.body.last_name;  
            var contactNumber = req.body.contact_number;
            var aboutMe = req.body.bio;
            var prof_pic = null;
            var cov_pic = null;

            if(req.files['profile_picture']){
                console.log('profile picture uploade '+ req.files['profile_picture'][0].filename);
                prof_pic = req.files['profile_picture'][0].filename;
            }
            if(req.files['cover_photo']){
                cov_pic = req.files['cover_photo'][0].filename;
            }
            //
            user.firstName = firstName;
            user.lastName = lastName;
            user.contact_number = contactNumber;
            user.aboutMe = aboutMe;
            if(prof_pic != null)
                user.profilePhoto = prof_pic;
            if(cov_pic != null)
                user.coverPhoto = cov_pic;
            console.log(user);
            await db.updateOne(User, {userName: username}, {$set:user});
            res.redirect('/profile_page?userName='+username);
        }else{
            //error
            res.redirect(`/${req.session.prev_page}?userName=${userName}`);
        }
    },


}

module.exports = profileController;