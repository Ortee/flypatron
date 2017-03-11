import express from 'express';
import airportRoutes from './airport';
import routeRoutes from './route';

const router = express.Router();

router.use('/airports', airportRoutes);
router.use('/routes', routeRoutes);

export default router;
