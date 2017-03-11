import express from 'express';
import validate from 'express-validation';
import airportController from '../controllers/airport';
import validations from './validation/airport';

const router = express.Router();

router.route('/')
  .get(airportController.list)

  .post(validate(validations.createAirport), airportController.create);

export default router;
