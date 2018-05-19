let count=0;
let people={}
module.exports=(io) => {
	io.on("connection",(socket) => {
		console.log("User Connected:",socket.id);
		count++;
		console.log(people);
		console.log("Number Of Users:",count);
		socket.on("disconnect",function(){
			console.log("User disconnected");
			count--;
			console.log(people);
			console.log("Numbefr Of Users:",count);
		});
		socket.on("message",(msg) =>{
			console.log(msg);
			io.emit("message",msg);
		});
	});
