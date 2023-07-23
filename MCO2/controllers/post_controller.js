const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const { redirect } = require('express/lib/response');

const postController ={
    getCreatePost:async function(req,res){
        var userName = req.query.userName;
        var firstName = req.query.firstName;
        var lastName = req.query.lastName;

        res.render('create_post',{userName:userName,firstName:firstName,lastName:lastName});
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
        if(result != null){
            await db.updateOne(User,{userName:userName},{$push:{posts:post}});
            res.redirect('/profile_page?userName='+userName);
        }
    },
};

module.exports = postController;