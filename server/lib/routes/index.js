import express from 'express';
import airportRoutes from './airport';

const router = express.Router();	// eslint-disable-line new-cap

router.use('/airports', airportRoutes);

export default router;
