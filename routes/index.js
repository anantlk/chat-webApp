var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.render('chat', { title: 'Chat App' });
});

router.get("/send",(req,res) => {
	res.send("Hello");
})
module.exports=router;