var express = require('express');
var router = express.Router()
var User = require('../models/users');

router.get("/chat",(req,res) => {
	console.log(req.user.username);
	User.find({},{username:1}).exec()
		.then((result) => {
			console.log(result);
			res.json({registered:result});
		})
		.catch((err) => {
			console.log(err);
		});

	//res.render('chat',{user:req.user.username,title:'chat'});
});
