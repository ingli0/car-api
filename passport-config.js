import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/userModel.js';
import bcrypt from 'bcrypt';

export function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'username' }, // Change 'email' to 'username'
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
