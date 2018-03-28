var count=0;
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
			io.emit("message",msg);
		});

		
	});
}