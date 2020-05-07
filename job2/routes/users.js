var express = require('express');
var router = express.Router();


var monk = require('monk');
var db = monk('localhost:27017/jobsearch');

var hash = require("password-hash");





/* GET users listing. */
router.get('/', function(req, res) {
	var collection =db.get('users');
	collection.find({},function(err,users){
		if(err) throw err;
		res.json(users);
	});
});

router.get('/:id', function(req, res) {
	var collection =db.get('users');
	collection.findOne({_id:req.params.id},function(err,user){
		if(err) throw err;
		res.json(user);
	})
});

router.put('/:id', function(req, res){
    var collection = db.get('users');
    collection.update({
        _id: req.params.id
    },
    {$set: {
		FirstName:req.body.FirstName,
		LastName:req.body.LastName
       
    }}, function(err, job){
        if (err) throw err;

        res.json(job);
    });
});

// router.put('/add/:id/:jobid', function(req, res){
//     var collection = db.get('users');
// 	collection.findOne({_id:req.params.id},function(err,user){
// 		if(err) throw err;
// 		var jobid=user.jobid;
// 		if(jobid.indexOf(req.params.jobid)!=-1){
// 			res.status(401).send({ data: { msg: 'Already in your favorite list'} });
// 		}
// 		jobid.push(req.params.jobid);
// 		console.log(jobid);
// 		collection.update({_id:req.params.id},{$set: {jobid:jobid,}},function(err,user){
// 			if (err) throw err;
// 			res.json(user);
// 		})
// 	})
// });
router.put('/add/:id/:jobid', function(req, res){
    var collection = db.get('users');
	collection.findOne({_id:req.params.id},function(err,user){
		if(err) throw err;
		var jobid=user.jobid;
		if(jobid.indexOf(req.params.jobid)!=-1){
			res.status(401).send({ data: { msg: 'Already in your favorite list'} });
			return;
		}
		jobid.push(req.params.jobid);
		console.log(jobid);
		collection.update({_id:req.params.id},{$set: {jobid:jobid,}},function(err,user){
			if (err) throw err;
			res.json(user);
		})
	})
});


router.put('/delete/:id/:jobid', function(req, res){
    var collection = db.get('users');
	collection.findOne({_id:req.params.id},function(err,user){
		if(err) throw err;
		var jobid=user.jobid;
		if(jobid.indexOf(req.params.jobid)==-1){
			res.status(401).send({ data: { msg: 'No in the user favorite list '} });
		}
		for( var i = 0; i < jobid.length; i++){ 
		   if ( jobid[i] === req.params.jobid) {
		     jobid.splice(i, 1); 
		     i--;
		   }
		}
		collection.update({_id:req.params.id},{$set: {jobid:jobid,}},function(err,user){
			if (err) throw err;
			res.json(user);
		})
	})
});

router.post('/signup',function(req, res){
	var collection = db.get('users');
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password =req.body.password;
	var password2 = req.body.password2;
	// Validation
	req.checkBody('firstname','FirstName is required').notEmpty();
	req.checkBody('lastname','LastName is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('password','password is required').notEmpty();
	req.checkBody('password','password at least length 6').isLength({ min: 6 });
	req.checkBody('password2','passwords do not match').equals(req.body.password);
	var errors=req.validationErrors();

	if(errors){
		res.status(401).send(errors);
	}else{
		collection.findOne({email:req.body.email},function(err,user){
			if(user!=null){

				res.status(401).send({ data: { msg: 'Email is used! '} });
			}			
			else{
				collection.insert({
					FirstName:req.body.firstname,
					LastName:req.body.lastname,
					email:req.body.email,
					password:hash.generate(req.body.password),
					jobid:[],
				},function(err,user){
					if(err) throw err;
					res.json(user);
				});	
			}
		})
	}

})

router.post('/signin',function(req, res){
	var collection = db.get('users');
	var email = req.body.email;
	var password =req.body.password;
	console.log(email);
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('password','password is required').notEmpty();
	var errors=req.validationErrors();

	if(errors){
		res.status(401).send(errors);
	}else{
		console.log(email);
		collection.findOne({email:req.body.email},function(err,user){
			console.log(user);
			if(user==null)
				res.status(401).send({ data: { msg: 'Email not found '} });
			else {
				if(hash.verify(req.body.password,user.password))
					res.status(200).send(user);
				else
					res.status(401).send(  { data: { msg: 'password is invalid '} } );
			}
		});
	}
})



module.exports = router;
