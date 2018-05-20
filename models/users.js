const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
    username : {
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
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
const User = mongoose.model('User', userSchema);

module.exports = User;