import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import carsRoutes from './routes/cars.js';
import Car from './models/carModel.js';
import User from './models/userModel.js';  
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import mongoose from 'mongoose';
import ejs from 'ejs';  
import bcrypt from 'bcrypt';



    

const app = express();
const PORT = 5000;

const users = []

app.set('view engine', 'ejs');

app.use(session({
    secret: 'ingli',  
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}))


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

app.get('/login', (req, res) => {
    res.render('login');
});

 
app.get('/register', (req, res) => {
    res.render('register');
});

 

/* Specify that it will use JSON */
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cars', carsRoutes);

app.get('/', (req, res) => res.send('hello from home page'));

app.listen(PORT, () => console.log(`Server is running on port : http://localhost:${PORT}`));

app.post('/register', async (req, res) => {
    try {
        console.log('Username:', req.body.username); 
        console.log('Password:', req.body.password);  
        console.log('Enail:', req.body.email);  
        const newUser = new User({
            username: req.body.username,  
            password: req.body.password, 
            email: req.body.email, 
        });

        
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

         
        await newUser.save();

        // Redirect to the login page after successful registration
        res.redirect('/login');
    } catch (error) {
        // Handle registration errors here
        console.error(error);
        res.redirect('/register');
    }
});

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