import mongoose from 'mongoose';

function clearDatabase() {
  return new Promise((resolve)=>{
    Object.keys(mongoose.connection.collections).map( collection => {
      mongoose.connection.collections[collection].remove({}, () => {
        resolve();
      });
    });
  });
}

export default clearDatabase;
