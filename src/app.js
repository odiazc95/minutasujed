const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//PROCESAR VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use(require('./controllers/authController'));
app.use(require('./routes/authRoute'));

//EMAIL ROUTE
app.use(require('./controllers/mailController'));
app.use(require('./routes/mailRoute'));

app.use((req, res) => {
    res.status(404).end('404 not found');
});

module.exports = app; 

