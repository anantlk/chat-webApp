var express = require('express');
var router = express.Router();
var passport=require('passport');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Chat App' });
});

router.route("/register").get((req,res) => {
	res.render('register',{title:'Register'});
})
.post(passport.authenticate('newRegister',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
}));

router.route("/login").get((req,res) => {
	res.render('login',{title:'Login'});
})
.post(passport.authenticate('login',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
}));

module.exports=router;