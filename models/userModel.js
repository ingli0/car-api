// userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Add a method to compare passwords during authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Define the serializeUser static method
userSchema.statics.serializeUser = function () {
    return function (user, cb) {
        cb(null, user.id);
    };
};

// Define the deserializeUser static method
userSchema.statics.deserializeUser = function () {
    return function (id, cb) {
        this.findById(id, (err, user) => {
            cb(err, user);
        });
    };
};

const User = mongoose.model('User', userSchema);

export default User;
