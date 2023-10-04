import dotenv from 'dotenv';
dotenv.config();

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
import { initialize } from './passport-config.js';  
import flash from 'express-flash';
 

initialize(passport, email => users.find(user => user.email == email),
 id =>users.find(user => user.id === id)
 )

const app = express();
const PORT = 5000;

const users = []

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.session_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
 
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') }); 
  });
  
app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
      
      return res.redirect('/login');
    }
    
     
    res.render('dashboard', { user: req.user });
  });
  

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',  
    failureRedirect: '/login', 
    failureFlash: true
  }));
 
 
 

  
 
app.get('/register', (req, res) => {
    res.render('register');
});

app.use(flash())
 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/cars', carsRoutes);

app.get('/', (req, res) => {
     const successMessage = req.flash('success');
    res.render('home', { successMessage });  
});



app.listen(PORT, () => console.log(`Server is running on port : http://localhost:${PORT}`));

app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
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