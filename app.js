var express = require('express');
var app = express();
var session = require('express-session');
var config = require('./config/config');
var body_parser = require('body-parser');

// body_parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))

// express session
app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var controllers = require(__dirname+'/app/controllers');
app.set('view engine', 'ejs');
app.set('views', __dirname+'/app/views')

// static folder
//neu khong co /static thi ben ejs khai bao href trong link khong can /static
app.use('/static', express.static(__dirname+'/public'));


app.use(controllers);
app.use(function (req, res, next) {
    res.status(404).get('/')
  })
app.listen(config.server.port, config.server.host, ()=> {
    console.log('Server is running on port '+ config.server.port)
})
