var express = require('express');
var router = express.Router()
var User = require('../models/users');
var arr=[]

router.get("/",(req,res) => {
	//console.log(req.user.username);
	User.find({},{username:1,email:1,_id:0}).exec()
		.then((result) => {
			console.log(result);
			result.forEach((data) => {
				if(data.username!=req.user.username)
				{
					arr.push(data);
				}
			})
			res.json({result:arr});
			arr.splice(0,arr.length);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Send Friend Request Route

router.post("/sendRequest",(req,res) => {
	User.updateOne({'email':req.body.email},{$push:{'requests':{'email':req.user.email,'name':req.user.username}}}).exec()
	.then((user) => {
		if(user)
		{
			console.log("User Updated");
			res.json({success:true});
		}
		else
		{
			console.log("User not found");
			res.json({success:false});
		}
	})
	.catch((err) => {
		console.log(err);
		res.json({success:false});
	});
});

// Ignore Friend Request Route

router.post("/ignoreRequest",(req,res) => {
	User.updateOne({'email':req.user.email},{$pull:{'requests':{'email':req.body.email}}}).exec()
	.then((user) => {
		if(user)
		{
			console.log("User Updated");
			res.json({success:true});
		}
		else
		{
			console.log("User not found");
			res.json({success:false});
		}
	})
	.catch((err) => {
		res.json({success:false});
	});
});

module.exports=router;