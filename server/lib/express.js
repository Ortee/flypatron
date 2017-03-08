import express from 'express';
import expressValidation from 'express-validation';
import bodyParser from 'body-parser';
import routes from './routes';
import clearDatabase from './helpers/clearDB';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err, req, res) => {
  if (err instanceof expressValidation.ValidationError) {
    res.status(err.status).json(err);
  } else {
    res.status(501)
      .json({
        status: err.status,
        message: err.message,
      });
  }
});

clearDatabase();

export default app;
