const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Login: {
            Name: String,
            Email: String,
            Username: String,
            Password: String,
           }
});

const User =  mongoose.model("Users", UserSchema);
module.exports = User;
