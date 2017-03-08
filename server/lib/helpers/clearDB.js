import mongoose from 'mongoose';
import fetchAirports from './fetchAirports';
function clearDatabase() {
  Object.keys(mongoose.connection.collections).map( collection => {
    mongoose.connection.collections[collection].remove({}, () => {
      fetchAirports();
    });
  });
}

export default clearDatabase;
