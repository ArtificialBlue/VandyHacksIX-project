const mongoose = require('mongoose');


const ShipSchema = new mongoose.Schema({
    ID: {
      type: Number,
      required: [true, 'Please provide mmin'],
      minlength: 3,
      maxlength: 50,
    },
  });
  

  
  module.exports = mongoose.model('Ship', ShipSchema);
  