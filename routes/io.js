var count=0;
// var url="http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles=9831900563&authkey=206480ABKZqz9f5DBl5abbf43a&country=91&message=Hello! This is a test message";
var http=require('http');

var TMClient = require('textmagic-rest-client');
  
var c = new TMClient('Anant', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
module.exports = function(io){
	
	io.on("connection",function(socket){
		console.log("User Connected");
		count++;
		console.log("Number of users:"+count);
		
		socket.on("disconnect",function(){
		console.log("User disconnected");
		count--;
		console.log("Number of users:"+count);
		});

		socket.on("message",function(msg){
			console.log("Message:"+msg);
			c.Messages.send({text: 'test message', phones:'9831900563'}, function(err, res){
			    console.log('Messages.send()', err, res);
			});


			if(msg.toLowerCase()=="light on")
			{
				io.emit("message","Switching on the lights");
			}
			if(msg.toLowerCase()=="light off")
			{
				io.emit("message","Switching off the lights");
			}
			if(msg.toLowerCase()=="number of people in room?")
			{
				io.emit("message","Count");
			}
		});

		
	});
}