const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Login: {
            Name: String,
            Email: String,
            Username: String,
            Password: String,
        },
})

module.exports = mongoose.model("User", UserSchema);