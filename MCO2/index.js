const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');

const app = express();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
