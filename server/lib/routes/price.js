import express from 'express';
import routeController from '../controllers/route';

const router = express.Router();

router.route('/:from/:to/:departure/:arrival')

  .get(routeController.get);

export default router;
