import mongoose from 'mongoose';
import winston from 'winston';
import config from './lib/config/env';
import app from './lib/express';
import fetchAirports from './lib/helpers/fetchAirports';

mongoose.connect(config.db);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.connection.on('connected', () => {
  winston.log(`Connected to database: ${config.db}`);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
}
mongoose.connection.collections.airports.count({}, (err, count) => {
  if (count === 0) {
    fetchAirports();
  }
});

app.listen(config.port, () => {
  winston.log(`API Server started and listening on port ${config.port} (${config.env})`);
});

exports.modules = app;
