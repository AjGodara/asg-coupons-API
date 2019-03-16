const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const users = require("./Controller/User");
var app = express();

process.env['NODE_ENV']='development';

const config = require('./models/config');

if(app.get('env') === 'development')var dev = true;

/**
 * REMEMBER: express is just a series of middleware
 * the methods would catch everything if not 
 * restricted to a certain specific path.
 */

//log if in dev mode 
if(dev)app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/**
 * ROUTES 
 */

 app.post('/users', users.createUser);

 //handle 404
 app.use(function(req, res, next){
     var err = new Error('Not Found');
     res.status = 404;
     next(err);
 });

// development error handler
 if(dev){
    app.use(function(err, req, res, next){
        console.log(err);
        res.status(err.status||500).send();
    });
 }

// production error handler
 app.use(function(err, req, res, next){
    res.status(err.status||500).send();
});

var server = app.listen(config.port);
console.log('listening to %s port in %s mode'
, server.address().port, app.get('env'));

module.exports = app;
