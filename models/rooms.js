const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema=new Chats({
	userId:{
		type:mongoose.Schema.ObjectId,
	},
	rooms:[{
		roomId:String,
		chat:[
			message:{
				type:String
			},
			name:{
				type:String
			},
			time:{
				type:String
			}
		]
	}]
});

const rooms=mongoose.model('Room',roomSchema);
module.exports=rooms;