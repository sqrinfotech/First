
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose=require('mongoose'),
   Schema=mongoose.Schema,
   ObjectId=Schema.ObjectId;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/users');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/users', user.list);

app.get('/index',user.index);

app.get('/users/:id/show',user.show);

app.get('/new', routes.insert);
app.post('/new', user.insert);

app.get('/users/:id/delete',user.delete);

app.get('/users/:id/edit',user.edit);
app.put('/users/:id/edit',user.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});