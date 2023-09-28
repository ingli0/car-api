// Import required modules
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect on success
    failureRedirect: '/login',    // Redirect on failure
    failureFlash: true            // Enable flash messages for errors
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout(); // Logout the user
    res.redirect('/'); // Redirect to the home page or another appropriate page
});

module.exports = router;
