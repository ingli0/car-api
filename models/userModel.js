import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Add Passport-Local Mongoose plugin
userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);
