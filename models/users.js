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
    handle:{
    	type:String,
    	required:true
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
    	},
    	status:{
    		type:String
    	},
    	message:{
    		data:{
    			type:String
    		},
    		time:{
    			type:String
    		}
    	},
    	reply:{
    		data:{
    			type:String
    		},
    		time:{
    			type:String
    		}
    	}
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;