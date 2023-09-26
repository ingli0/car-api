import express from 'express';
import bodyParser from 'body-parser';

import carsRoutes from './routes/cars.js';


const app = express();
const PORT= 5000;

/*simenoi oti tha xrisimopoiei json*/
app.use(bodyParser.json());

app.use('/cars',carsRoutes);

app.get('/',(req,res) => res.send('hello from homae page'));

app.listen(PORT, () => console.log(`Server is running on port : http://localhost:${PORT}`));

 