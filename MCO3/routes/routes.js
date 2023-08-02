const express = require('express');
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signup_controller.js');
const profileController = require('../controllers/profile_controller.js');
const loginController = require('../controllers/login_controller.js');
const homeController = require('../controllers/home_controller.js');
const postController = require('../controllers/post_controller.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);
app.get('/home',homeController.getHome);
app.get('/register', signupController.getSignUp);

app.post('/register', signupController.postSignUp); //form id in register.hbs should be signup

app.get('/checkUsername', signupController.getCheckUsername);
app.get('/checkEmail', signupController.getCheckEmail);
app.get('/checkIdNumber', signupController.getCheckIdNumber);

app.get('/login', loginController.getLogin)

app.post('/login', loginController.postLogin);

app.get('/profile_page', profileController.getProfile);
app.get('/create_post', postController.getCreatePost);
app.post('/create_post', postController.postCreatePost);
app.post('/postComment', postController.postAddComment);
app.post('/postReply', postController.postAddReply);
app.get('/logout', controller.getLogout);

app.get('/checkVote', postController.getCheckVote);

app.post('/voteContent', postController.postVoteTally);
app.post('/deletePost', postController.postDeletePost);
app.post('/deleteComment', postController.postDeleteComment);
app.post('/deleteReply', postController.postDeleteReply);
app.post('/edit_post', postController.postEditPost);
app.get('/edit_post', postController.getEditPost);

module.exports = app;
