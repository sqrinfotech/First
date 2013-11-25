
// // /*
// //  * GET users listing.
// //  */

var mongoose=require('mongoose'),
   Schema=mongoose.Schema,
   ObjectId=Schema.ObjectId;

var studentsSchema=new Schema({
	studentsRoll:ObjectId,
	name:String,
	course:String,
	fee:Number,
	doa:Date,
	contact:Number
});

var Students=mongoose.model('Students',studentsSchema);

exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.index = function(req, res){
	Students.find({},function(err,docs){
		if (err){
			throw err;
		} else{
			res.render('users/index', {records:docs});
		};
	});
};

exports.show = function(req, res){
	Students.findById(req.params.id, function(err,student){
		if (err){
			throw err;
		} else{
			res.render('users/show', {record: student});
		};
	});
};

exports.insert = function(req, res){
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
};

exports.delete= function(req, res){
	Students.remove({_id:req.params.id},function(err,docs){
		if (err){
			throw err;
		} else{
			res.redirect('/index');
		};
	});
};

exports.edit= function(req, res){
	Students.findById(req.params.id, function(err,student){
		if (err){
			throw err;
		} else{
			res.render('users/edit', {user: student});
		};
	});
};

exports.update= function(req, res){
	Students.findByIdAndUpdate(req.params.id,
		{
			name:req.body.sname,
    		course:req.body.course,
    		fee:req.body.fee,
    		doa:req.body.doa,
    		contact:req.body.phone
    	},function(err,docs){
			if(err) res.json(err);
			res.redirect('/index');
	});
};