import mongoose from 'mongoose';
import winston from 'winston';
import app from './lib/express';
import fetchAirports from './lib/helpers/fetchAirports';
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || 'mongodb://db:27017/flypatron';
const DEV = process.env.DEV || 'development';

mongoose.connect(DB);

mongoose.Promise = global.Promise;

mongoose.connection.on('error', () => {
  throw new Error(`👾 Unable to connect to database: ${DB} `);
});

mongoose.connection.on('connected', () => {
  winston.info(`\n\n 👍 Connected to database: ${DB} \n\n`);
});

if (DEV === 'development') {
  winston.info('\n\n 🛠 DEVELOPMENT MODE ON \n\n ');
  mongoose.set('debug', true);
} else {
  winston.info('\n\n 🛳 PRODUCTION MODE ON \n\n ');
}

mongoose.connection.collections.airports.count({}, (err, count) => {
  if (count === 0) {
    fetchAirports();
  }
});

app.listen(PORT, () => {
  winston.log(`API Server started and listening on port ${PORT} (${DEV})`);
});

export default app;
