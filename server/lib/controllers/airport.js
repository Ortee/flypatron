import Airport from '../models/airport';

function get(req, res) {
  return res.json(req.dbAirport);
}

function create(req, res, next) {
  Airport
    .create({
      name: req.body.name,
      description: req.body.description,
    })
    .then((saveAirport) => {
      return res.json(saveAirport);
    }, (e) => {next(e);});
}

function list(req, res, next) {
  Airport
    .find()
    .exec()
    .then((airports) => res.json(airports),
      (e) => next(e));
}


export default { get, create, list };
