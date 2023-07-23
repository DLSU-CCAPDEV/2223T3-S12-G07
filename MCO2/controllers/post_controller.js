const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');

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
        var id = await db.findOne(Post,post,'_id');
        post._id = id._id.toString();
        if(result != null){
            await db.updateOne(User,{userName:userName},{$push:{posts:post}});
            res.redirect('/'+req.session.prev_page+'?userName='+userName);
        }
    },
    getCheckPostUpvotes: function(req,res){
        var postId = req.body.postId;
    }
};

module.exports = postController;