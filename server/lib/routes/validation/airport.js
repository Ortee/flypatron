import Joi from 'joi';

export default {

  // POST /api/airports
  createAirport: {
    body: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      location: Joi.string().required(),
      countryId: Joi.string().required(),
      cityId: Joi.string().required(),
    },
  },

};
