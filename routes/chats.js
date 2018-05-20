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
		})
		.catch((err) => {
			console.log(err);
		});

	//res.render('chat',{user:req.user.username,title:'chat'});
});

module.exports=router