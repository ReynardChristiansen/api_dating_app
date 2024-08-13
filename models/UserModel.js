const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        index: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_dob: {
        type: Date,
        required: true
    },
    user_gender: {
        type: String,
        required: true
    },
    user_age: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    user_like: [String]
}, { timestamps: true });

module.exports = mongoose.model('User_dating_app', userSchema);
