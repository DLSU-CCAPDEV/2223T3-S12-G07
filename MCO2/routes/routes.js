const express = require('express');
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signup_controller.js');
const profileController = require('../controllers/profile_controller.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/signup', signupController.getSignUp);

app.post('/signup', signupController.postSignUp); //form id in register.hbs should be signup

app.get('/login', loginController.getLogin)

app.post('/login', signupController.postLogin);