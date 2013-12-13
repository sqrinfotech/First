
/*
 * GET home page.
 */
//  var express = require('express');
//  var flash=require('connect-flash');
//  var app = express();

// app.configure(function() {
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });

exports.home = function(req, res){
	//req.flash('info', 'Hello,Here we are doing the CRUD Application with MongoDB ');	
	res.render('home/index');
};

exports.insert =function(req,res){
	res.render('users/new');
};
exports.findex =function(req,res){
	res.render('home/index');
};