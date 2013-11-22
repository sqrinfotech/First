
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
app.use(express.methodOverride());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/users');

var employeesSchema=new Schema({
	empId:ObjectId,
	name:String,
	designation:String
});

var employeesModel=mongoose.model('employeesModel',employeesSchema);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/view',function(req,res){
	employeesModel.find({},function(err,docs){
		if (err) res.json(err);
		else res.render('index',{records:docs});
	});
});

app.post('/create', function(req,res){
	var emp=new employeesModel({name:req.body.ename,designation:req.body.desig});
	emp.save(function(err,docs){
		if(err) res.json(err);
		else  res.redirect('/view');
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
