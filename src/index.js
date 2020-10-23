const express = require('express');
const app = express();
const colors = require('colors');
const path = require('path');

// SETTINGS
app.set('appName', 'Arturito');
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// MIDDLEWARES

// ROUTES
app.use(require('./routes/routes'))

// STATIC FILES
app.use(express.static(path.join(__dirname + '/public') ) );

// SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`.red);
});