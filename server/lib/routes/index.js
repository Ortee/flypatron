import express from 'express';
import airportRoutes from './airport';
import routeRoutes from './route';
import priceRoutes from './price';

const router = express.Router();

router.use('/airports', airportRoutes);
router.use('/routes', routeRoutes);
router.use('/routes', priceRoutes);

export default router;
