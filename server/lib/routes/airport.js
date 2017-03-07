import express from 'express';
import validate from 'express-validation';
import airportController from '../controllers/airport';
import validations from './validation/airport';

const router = express.Router();

router.route('/')
  /** GET /api/tasks - Get list of tasks */
  .get(airportController.list)

  /** POST /api/tasks - Create new task */
  .post(validate(validations.createAirport), airportController.create);

export default router;
