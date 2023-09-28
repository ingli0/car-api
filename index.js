import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import carsRoutes from './routes/cars.js';
import Car from './models/carModel.js';
import User from './models/userModel.js'; // Use ES Modules syntax
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import mongoose from 'mongoose';
import ejs from 'ejs'; // Import EJS



    

const app = express();
const PORT = 5000;


app.set('view engine', 'ejs');

app.use(session({
    secret: 'ingli', // Change this to a secure secret
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Configure the local authentication strategy
passport.use(new LocalStrategy((username, password, done) => {
    // Replace with your user authentication logic
    if (username === 'user' && password === 'password') {
        return done(null, { id: 1, username: 'user' });
    } else {
        return done(null, false, { message: 'Incorrect username or password' });
    }
}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
 
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('dashboard', { user: req.user });
});


app.get('/register', (req, res) => {
    res.render('register');
});

// Route for handling user registration
app.post('/register', (req, res) => {
    // Replace with your user registration logic
    const { username, password } = req.body;
    // Validate input, hash the password, and store user data in your database
    // Example: User.create({ username, passwordHash });
    res.redirect('/login');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Create a new user and save it to the database
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
});


/* Specify that it will use JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cars', carsRoutes);

app.get('/', (req, res) => res.send('hello from home page'));

app.listen(PORT, () => console.log(`Server is running on port : http://localhost:${PORT}`));



mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://admin:admin@carapi.d3ibeak.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')
    .then(() =>{
        console.log('MongoDB connected');
        app.listen(3000, ()=>{
            console.log(`doulevei`)
        });
    })
    .catch((error) =>{
        console.error('ERROR',error);
    });