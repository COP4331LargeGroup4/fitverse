const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    
    Email:{
        type: String,
        required: true,
        unique: true
    },
    
    Username:{
        type: String,
        required: true,
        unique: true,
    },
    
    Password:{
        type: String,
        required: true}
});

const User =  mongoose.model("Users", UserSchema);
module.exports = User;
