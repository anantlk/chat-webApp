let mongoose=require('mongoose');
module.exports=mongoose.connect("mongodb://localhost/easyChat")
	.then(() => console.log("Connection Successful!!"))
	.catch((err) => console.error(err));