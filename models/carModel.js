import mongoose from 'mongoose';

 
const carSchema = new mongoose.Schema({
    
    Brand: {
        type: String,
        required: [true, 'Please add the Brand']
    },
    Model: {
        type: String,
        required: [true, 'Please add the Model']
    },
    year: {
        type: Number,
        required: [true, 'Please add the year']
    },
    kilometers: {
        type: Number,
        required: [true, 'Please add the kilometers']
    },
    price: {
        type: Number,
        required: [true, 'Please add the price']
    },
    Category: {
        type: String,
        required: [true, 'Please add the Category']
    },
    Fuel: {
        type: String,
        required: [true, 'Please add the Fuel']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Car = mongoose.model('Car', carSchema);

export default Car;