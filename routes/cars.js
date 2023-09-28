import express from 'express';
import Car from '../models/carModel.js'; 
import { body, validationResult } from 'express-validator';
import { createCar,getCar,deleteCar,updateCar,getCars} from '../controllers/cars.js';

const router = express.Router();
 
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

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

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    res.redirect('/login'); // User is not authenticated, redirect to login
}

// Example protected route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // Render the dashboard for authenticated users
    res.render('dashboard');
});

// Route for handling user registration



router.post('/',createCar);

router.get('/:id',getCar)
 
router.delete('/:id',deleteCar);

router.patch('/:id', updateCar);

export default router;
