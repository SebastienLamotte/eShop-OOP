require('./db/mongoose');
const port = process.env.PORT;
const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');

// Require routers
const general_router = require('./routers/general-router');
const logRegis_router = require('./routers/login-register');
const newsletter_router = require('./routers/newsletter');
const cart_router = require('./routers/cart');
const admin_router = require('./routers/admin');
const user_edit_router = require('./routers/edit-user');
const address_edit_router = require('./routers/edit-address');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

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

// Setup routers
app.use(logRegis_router);
app.use(newsletter_router);
app.use(cart_router);
app.use(admin_router);
app.use(user_edit_router);
app.use(address_edit_router)
app.use(general_router);


app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});