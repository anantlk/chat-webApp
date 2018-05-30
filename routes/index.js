var express = require('express');
var router = express.Router();
var passport=require('passport');

//Landing page
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Chat App' });
});

//Register User 
router.route("/register").get((req,res) => {
	res.render('register',{title:'Register'});
})
.post(passport.authenticate('newRegister',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
}));

//Login User
router.route("/login").get((req,res) => {
	res.render('login',{title:'Login'});
})
.post(passport.authenticate('login',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
}));

//Logout User
router.get("/logout",(req,res) => {
	req.logout();
	res.redirect("/");
});

module.exports=router;