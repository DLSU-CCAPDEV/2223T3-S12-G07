const express = require('express');
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signup_controller.js');
const profileController = require('../controllers/profile_controller.js');
const loginController = require('../controllers/login_controller.js');
const homeController = require('../controllers/home_controller.js');

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

module.exports = app;
