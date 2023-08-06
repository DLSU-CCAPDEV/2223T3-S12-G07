const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const idGenerator = require('./controllers/helpers/transducer.js');
const gfs = require('./models/gfs.js');
dotenv.config();
const app = express();
port = process.env.PORT;
hostname = process.env.HOSTNAME;


app.set('view engine', 'hbs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('uniqueId' ,idGenerator.uniqueId);

db.connect();
gfs.connect(db.conn);
// define the paths contained in `./routes/routes.js`
app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 1 * 6 * 60 * 60,  //ttl: 14 * 24 * 60 * 60, //days * hours * minutes * seconds
        autoRemove: 'native' // Default
    }),
    
}));

app.use('/', routes);

app.use(function (req, res) {
    var details = {};

    /*
        checks if a user is logged-in by checking the session data
        if a user is logged-in,
        display the profile tab and logout tab in the nav bar.
    */
    if(req.session.idNum) {
        details.flag = true;
        details.firstName = req.session.user.firstName;
        details.lastName = req.session.user.lastName;
        details.userName = req.session.user.userName;
        details.prof_pic = req.session.user.prof_pic

        res.render('home', details);
    }
    /*
        if no user is logged-in,
        do not display the profile tab and the logout tab in the nav bar.
    */
    else{
        details.flag = false;
        res.render('error', details);
    }
});
app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
