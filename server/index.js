const mongoose = require('mongoose');
const config = require('./lib/config/env');
const app = require( './lib/express');

mongoose.connect(config.db);

mongoose.connection.on('error', function() {
  throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.connection.on('connected', function() {
  console.log(`Connected to database: ${config.db}`);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
}

app.listen(config.port, function() {
  console.log(`API Server started and listening on port ${config.port} (${config.env})`);
});

exports.modules = app;
