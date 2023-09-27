import express from 'express';
import Car from '../models/carModel.js'; 
import { body, validationResult } from 'express-validator';
import { createCar,getCar,deleteCar,updateCar,getCars} from '../controllers/cars.js';

const router = express.Router();
 

router.get('/',getCars);

const createCarValidation = [
    body('Brand').notEmpty().withMessage('Brand is required'),
    body('Model').notEmpty().withMessage('Model is required'),
    body('year').isNumeric().withMessage('Year must be a number'),
    body('kilometers').isNumeric().withMessage('Kilometers must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('Category').notEmpty().withMessage('Category is required'),
    body('Fuel').notEmpty().withMessage('Fuel is required'),
];

router.post('/',createCar);

router.get('/:id',getCar)
 
router.delete('/:id',deleteCar);

router.patch('/:id', updateCar);

export default router;
