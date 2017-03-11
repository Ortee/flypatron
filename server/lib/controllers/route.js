import Route from '../models/route';

function get(req, res) {
  Route
    .find()
    .populate('from')
    .populate('to')
    .then((routes) => {
      res.json(routes);
      res.send().status(200);
    });
}

function save(req, res) {
  new Route()
    .create(req.body.from, req.body.to).then((result)=>{
      Route
        .create({
          from: result.fromResult,
          to: result.toResult,
        })
        .then(()=>{
          res.send().status(200);
        }, (err) => {
          res.send(err).status(400);
        });
    });
}

export default { save, get };
