var express = require('express');
var router = express.Router();
var passport=require('passport');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Chat App' });
});

router.get("/login",(req,res) => {
	res.render('login',{title:'Login'});
});

router.get("/register",(req,res) => {
	res.render('register',{title:'Register'});
});

router.post("/register",passport.authenticate('newRegister',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
})
);

router.post("/login",passport.authenticate('login',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
})
);

module.exports=router;