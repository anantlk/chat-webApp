const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password:{
    	type:String,
    	required:true
    }
    phone:{
    	type:String,
    	required:true
    },
    friends:{
    	id:{
    		type:String
    	},
    	name:{
    		type:String
    	}
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;