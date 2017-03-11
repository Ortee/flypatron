import async from 'async';
import Route from '../models/route';

function get(req, res) {
  return new Promise( (resolve, reject) => {
    async.waterfall([
      function(callback) {
        new Route()
          .findRouteByAirportsIDs(req.params.from, req.params.to)
          .then( result => {
            callback(null, result);
          });
      },
      function(result, callback) {
        Route
          .findOne({
            from: result.fromObject,
            to: result.toObject,
            departureDay: req.params.departure,
            arrivalDay: req.params.arrival,
          })
          .populate('from')
          .populate('to')
          .then((route) => {
            callback(null, route);
          }, (err) => {
            res.send(err).status(400);
            reject();
          });
      },
    ], function(err, route) {
      if (err) {
        res.send(err).status(400);
        reject();
      }
      res.json(route);
      res.send().status(200);
      resolve();
    });
  });
}

function save(req, res) {
  new Route()
    .create(req.body.from, req.body.to).then((result)=>{
      Route
        .create({
          from: result.fromResult,
          to: result.toResult,
          departureDay: req.body.departureDay,
          arrivalDay: req.body.arrivalDay,
        })
        .then(()=>{
          res.send().status(200);
        }, (err) => {
          res.send(err).status(400);
        });
    });
}

export default { save, get };
