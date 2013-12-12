var mongoose = require( 'mongoose' );
mongoose.connect('mongodb://localhost/users');
	var userSchema = new mongoose.Schema({
		name: String,
		email: String,
		createdOn: Date
	});