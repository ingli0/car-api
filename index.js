import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import carsRoutes from './routes/cars.js';
import Car from './models/carModel.js';


const app = express();
const PORT = 5000;

import mongoose from 'mongoose';

/* Specify that it will use JSON */
app.use(bodyParser.json());

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