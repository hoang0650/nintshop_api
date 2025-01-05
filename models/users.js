const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: String,
    facebookId: String,
    profile: {
        fullName: String,
        phone: String,
        address: String,
        avatar: String
    },
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
    online: {
        type: Boolean, default: false
    },
    role: {
        type: String,
        enum: ['guest', 'shop', 'admin'],
        default: 'guest',
        required: true,
    },
    loginHistory: [
        {
            loginDate: { type: Date, default: Date.now },
            ipAddress: String
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{ timestamps: true })

const User = mongoose.model('User', UserSchema);
module.exports = { User };
