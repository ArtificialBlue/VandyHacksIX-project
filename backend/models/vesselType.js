const mongoose = require('mongoose');


const VesselTypeSchema = new mongoose.Schema({
    Type: {
      type: String,
      required: [true, 'Please provide type'],
    },
    Description: {
        type: String,
        required :[true]
    }
  });
  

  
  module.exports = mongoose.model('Vessel', VesselTypeSchema);
  