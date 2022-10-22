const { MongoClient } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const { type } = require('os');
const client = new MongoClient('mongodb+srv://vandyproj:VandyHacks9@vandyhacks9.lgq8a.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true });
const ship =  client.db('cargoVesselType');
const showAllShips = async (req, res) => {
  const ships = await ship.collection("cargoVesselType").find({},{VesselName:true}).toArray();
  const shipWithOnlyIdAndVessel = ships;  
  res.status(200).json({shipWithOnlyIdAndVessel})
}

const showSingleShip =async (req, res) =>{
    console.log(req.params);
    const ship = await Ship.findOne({ _id: req.params.id });
    if (!ship) {
      console.log('no ships');
    }
    res.status(StatusCodes.OK).json({ ship })
}



module.exports = {
    showAllShips,
    showSingleShip,
  }