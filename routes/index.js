var express = require('express');
var router = express.Router();

var routes=(passport) => {
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Chat App' });
});

router.get("/login",(req,res) => {
	res.render('login',{title:'Login'});
});

router.get("/register",(req,res) => {
	res.render('register',{title:'Register'});
});

router.get("/chat",(req,res) => {
	res.render('chat',{user:req.user,title:'chat'});
});

router.post("/register",passport.authenticate('newRegister',{
	successRedirect:'/chat',
	failureRedirect:'/',
	failureFlash:true
})
);
};



module.exports=routes;