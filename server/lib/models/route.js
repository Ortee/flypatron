import mongoose from 'mongoose';
import async from 'async';

const RouteSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Airport',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Airport',
  },
  departureDay: {
    type: Date,
    required: true,
  },
  arrivalDay: {
    type: Date,
  },
});

RouteSchema.methods.create = function(from, to) {
  const self = this;
  return new Promise((resolve, reject) => {
    async.waterfall([
      function(callback) {
        self.model('Airport')
          .findOne({id: from})
          .exec()
          .then( fromResult => callback(null, fromResult))
          .catch( err => reject(err));
      },
      function(fromResult, callback) {
        self.model('Airport')
          .findOne({id: to})
          .exec()
          .then( toResult => callback(null, {fromResult, toResult}))
          .catch( err => reject(err));
      },
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

RouteSchema.methods.findRouteByAirportsIDs = function(fromID, toID) {
  const self = this;
  return new Promise((resolve, reject) => {
    async.waterfall([
      function(callback) {
        self.model('Airport')
          .find({id: fromID})
          .exec()
          .then( fromObject => callback(null, fromObject))
          .catch( err => reject(err));
      },
      function(fromObject, callback) {
        self.model('Airport')
          .find({id: toID})
          .exec()
          .then( toObject => callback(null, {fromObject, toObject}))
          .catch( err => reject(err));
      },
    ], function(err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export default mongoose.model('Route', RouteSchema);
