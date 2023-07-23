const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');


dotenv.config();
const app = express();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));
// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));
// define the paths contained in `./routes/routes.js`
app.use('/', routes);
app.use(function (req, res) {
    res.render('error');
});

db.connect();

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
