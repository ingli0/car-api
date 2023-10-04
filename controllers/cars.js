import { v4 as uuidv4 } from 'uuid';
import Car from '../models/carModel.js'; // Import your Mongoose Car model
import { validationResult } from 'express-validator';


export const createCar = async (req, res) => {
    const carData = req.body;
    
     carData.username = req.body.username;

    try {
        const car = new Car(carData);
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




export const getCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findByIdAndRemove(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCar = async (req, res) => {
    const { id } = req.params;
    const updatedCarData = req.body;

    try {
        const car = await Car.findByIdAndUpdate(id, updatedCarData, { new: true });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    