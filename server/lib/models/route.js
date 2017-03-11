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

export default mongoose.model('Route', RouteSchema);
