const { MongoClient } = require('mongodb');
const {mongoose} = require('mongoose')
const { StatusCodes } = require('http-status-codes');
const { type } = require('os');
const client = new MongoClient('mongodb+srv://vandyproj:VandyHacks9@vandyhacks9.lgq8a.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true });
const ship =  client.db('cargoVesselType');
const showAllShips = async (req, res) => {
  const ships = await ship.collection("cargoVesselType").find({},{projection:{VesselName:true}}).toArray();
  const shipWithOnlyIdAndVessel = ships;  
  res.status(StatusCodes.OK).json({shipWithOnlyIdAndVessel})
}

const showSingleShip =async (req, res) =>{
    console.log(req.params.id);
    const passInId = mongoose.Types.ObjectId(req.params.id);
    const ships = await ship.collection("cargoVesselType").find({_id: passInId},{projection:{LAT:true,LON:true}}).toArray();
    if (!ships) {
      console.log('no ships');
    }
    const shipWithOnlyIdAndVessel = ships;  
    res.status(StatusCodes.OK).json({shipWithOnlyIdAndVessel})
}

const showSingShipAtSpecificTime = async (req,res) =>{
    const passInId = mongoose.Types.ObjectId(req.params.id);
    const ships = await ship.collection("cargoVesselType").find({_id: passInId},{projection:{MMSI:true,Heading:true,CallSign:true,VesselType:true,Length:true,Width:true}}).toArray();
    if (!ships) {
      console.log('no ships');
    }
    const shipWithOnlyIdAndVessel = ships;  
    res.status(200).json({shipWithOnlyIdAndVessel});
}


module.exports = {
    showAllShips,
    showSingleShip,
    showSingShipAtSpecificTime
  }