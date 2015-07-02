

var express = require('express')
var swig = require('swig')
var bodyparser = require('body-parser')
var morgan = require('morgan')
var swig = require('swig')

var app = express();
var routes = require('./routes')

app.engine('html',swig.renderFile)
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))
// sass middleware
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use('/',routes);

app.use(sassMiddleware({
   /* Options */
   src: path.join(__dirname, 'assets'),
   dest: path.join(__dirname, 'public'),
   debug: true,
   // outputStyle: 'compressed',
   // prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'bower_components')));


//map code


// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into next())
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.send(
        err
    );
});

module.exports = app;