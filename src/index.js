require('./db/mongoose');
const port = process.env.PORT;
const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');


// Require routers
const simple_get_router = require('./routers/simple-get-router');
const logReg_router = require('./routers/login-register');
const newsletter_router = require('./routers/newsletter');
const cart_router = require('./routers/cart');
const admin_router = require('./routers/admin');
const user_edit_router = require('./routers/edit-user');
const addressPayment_edit_router = require('./routers/edit-addressPayment');
const searchBar_router = require('./routers/searchBar');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());


// Setup routers
app.use(logReg_router);
app.use(newsletter_router);
app.use(cart_router);
app.use(admin_router);
app.use(user_edit_router);
app.use(addressPayment_edit_router)
app.use(searchBar_router);
app.use(simple_get_router);


app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});