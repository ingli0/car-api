import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from './models/userModel.js'; // Import your User model

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    });
}

export { initialize };
