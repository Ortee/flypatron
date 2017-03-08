import mongoose from 'mongoose';

const AirportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  countryId: {
    type: String,
    trim: true,
  },
  cityId: {
    type: String,
    trim: true,
  },
});

export default mongoose.model('Airport', AirportSchema);
