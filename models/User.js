const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    }
})

mongoose.model('User', userSchema);
module.exports = User;