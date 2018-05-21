var express = require('express');
var router = express.Router()
var User = require('../models/users');
var arr=[]

router.get("/",(req,res) => {
	//console.log(req.user.username);
	User.find({},{username:1,_id:0}).exec()
		.then((result) => {
			console.log(result);
			result.forEach((data) => {
				if(data.username!="Anant")
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

	//res.render('chat',{user:req.user.username,title:'chat'});
});

router.get("")
module.exports=router;