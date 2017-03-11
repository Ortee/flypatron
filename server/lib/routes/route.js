import express from 'express';
import routeController from '../controllers/route';

const router = express.Router();

router.route('/')

  .post(routeController.save);

export default router;
