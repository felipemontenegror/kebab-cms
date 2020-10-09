const mongoose = require('mongoose'); //objeto de usuario para fazer login

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        select: false
    },
    date: {
      type: Date,
      default: Date.now
    }
}, { autoCreate : true })

module.exports = mongoose.model('user', UserSchema);
