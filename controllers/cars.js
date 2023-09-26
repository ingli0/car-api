import { v4 as uuidv4 } from 'uuid';

let cars = [
    {"Brand": "ingli",
    "Model": "boja",
    "year": 21,
    "kilometers" : 123000,
    "price": 30000,
    "Category" : "Suv",
    "Fuel": "Gas"}
];

export const  createCar =  (req, res) => {
    const car = req.body;
    cars.push({... car, id: uuidv4()});
    console.log(car);
    res.send(`Car with the name ${car.Brand} added to the database`);
}

export const getCar =  (req,res)=>{
    const { id } = req.params;

    const foundcar = cars.find((car)=> car.id == id );
    res.send(foundcar);
}

export const deleteCar =  (req, res)=>{
    const {id} = req.params;
    cars = cars.filter((car)=> car.id != id);
    res.send(`Car with the id ${id} deleted from database`);
}

export const updateCar = (req, res) => {
    const { id } = req.params;
    const updatedCarData = req.body; // Assuming req.body contains the updated car data

    const car = cars.find((car) => car.id == id);

    if (!car) {
        return res.status(404).send(`Car with ID ${id} not found`);
    }

    // Check and update each property if present in the request body
    if (updatedCarData.Brand) {
        car.Brand = updatedCarData.Brand;
    }
    if (updatedCarData.Model) {
        car.Model = updatedCarData.Model;
    }
    if (updatedCarData.year) {
        car.year = updatedCarData.year;
    }
    if (updatedCarData.kilometers) {
        car.kilometers = updatedCarData.kilometers;
    }
    if (updatedCarData.price) {
        car.price = updatedCarData.price;
    }
    if (updatedCarData.Category) {
        car.Category = updatedCarData.Category;
    }
    if (updatedCarData.Fuel) {
        car.Fuel = updatedCarData.Fuel;
    }

    res.send(`Car with ID ${id} has been updated`);
};

export const getCars = (req,res)=>{
    console.log(cars);
    res.send(cars);
}