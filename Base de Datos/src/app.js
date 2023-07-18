const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({extended: false}));

//RENDER VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use(cors());
app.use(require('./controllers/userController'));
app.use(require('./controllers/minuteController'));
app.use(require('./controllers/agreementController'));
app.use(require('./controllers/follow_meController'));

//routes
app.get("/", (req, res) => {
    res.send("Hola");
});

//API ROUTES
app.use(require('./controllers/authController'));
app.use(require('./routes/authRoute'));

app.use((req, res) => {
    res.status(404).end('404 not found');
});

module.exports = app;