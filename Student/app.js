
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

var studentsSchema=new Schema({
	studentsRoll:ObjectId,
	name:String,
	course:String,
	fee:Number,
	doa:Date,
	contact:Number
});

var Students=mongoose.model('Students',studentsSchema);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/users', user.list);

app.get('/index',function(req,res){
	Students.find({},function(err,docs){
		if (err){
			throw err;
		} else{
			res.render('users/index', {records:docs});
		};
	});
});

app.get('/new', routes.insert);
app.post('/new', function(req,res){
	var stud = new Students({
    	name:req.body.sname,
    	course:req.body.course,
    	fee:req.body.fee,
    	doa:req.body.doa,
    	contact:req.body.phone
  	});
	stud.save(function(err,docs){
		if(err) res.json(err);
		res.redirect('/index');
	});
});

app.get('/users/:id/delete',function(req,res){
	Students.remove({_id:req.params.id},function(err,docs){
		if (err){
			throw err;
		} else{
			res.redirect('/index');
		};
	});
});

app.get('/users/:id/show',function(req,res){
	Students.findOne({_id:req.params.id},function(err,student){
		if (err){
			throw err;
		} else{
			console.log('**********************************************');
			console.log(student);
			res.render('users/show', {record: student});
		};
	});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});