import Airport from '../models/airport';
import winston from 'winston';

function get(req, res) {
  return res.json(req.dbAirport);
}

function create(req) {
  Airport
    .create({
      name: req.body.Name,
      id: req.body.Id,
      location: req.body.Location,
      countryId: req.body.CountryId,
      cityId: req.body.CityId,
    })
    .then(() => {
    }, (e) => {winston.log(e);});
}

function list(req, res, next) {
  Airport
    .find()
    .exec()
    .then((airports) => res.json(airports),
      (e) => next(e));
}

function one(id) {
  return new Promise((resolve) => {
    Airport
      .findOne({id: id})
      .exec()
      .then((airport) => {
        resolve(airport);
      });
  });
}

export default { get, create, list, one };
