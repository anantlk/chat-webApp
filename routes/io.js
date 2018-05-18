let count=0;
module.exports=(io) => {
	io.on("connection",(socket) => {
		console.log("User Connected");
		count++;
		console.log("Number Of Users:",count);
		socket.on("disconnect",function(){
			console.log("User disconnected");
			count--;
			console.log("Numbefr Of Users:",count);
		});
		socket.on("message",(msg) =>{
			console.log(msg);
			io.emit("message",msg);
		});
	});
}