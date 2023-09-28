// userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});
 
userSchema.statics.serializeUser = function () {
    return function (user, cb) {
        cb(null, user.id);
    };
};

userSchema.statics.deserializeUser = function () {
    return function (id, cb) {
        this.findById(id, (err, user) => {
            cb(err, user);
        });
    };
};

const User = mongoose.model('User', userSchema);

export default User;
