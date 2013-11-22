
/*
 * GET home page.
 */
 
exports.home = function(req, res){
  res.render('home/index');
};

exports.insert =function(req,res){
	res.render('users/new');
};

