const mongoose = require('mongoose');


const ShipSchema = new mongoose.Schema({
    ID: {
      type: Number,
      required: [true, 'Please provide ID'],
    },
    BaseDateTime: {
      type: String,
      required: [true, 'please provide date time']
    },
    LAT:{
      type: Number,
      required: [true, 'Please provide LAT']
    },
    LONG:{
      type: Number,
      required: [true, 'Please provide LONG']
    },
    Heading: {
      type: Number,
      required: [true, 'Please provide heading'],
    },
    VessleName:{
      type: String,
      required: [true, 'please provide vessel name']
    }
  });
  

  
  module.exports = mongoose.model('Ship', ShipSchema);
  