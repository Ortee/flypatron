import express from 'express';
import airportRoutes from './airport';

const router = express.Router();

router.use('/airports', airportRoutes);

export default router;
