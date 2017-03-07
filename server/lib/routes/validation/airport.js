import Joi from 'joi';

export default {

  // POST /api/airports
  createAirport: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  },

};
