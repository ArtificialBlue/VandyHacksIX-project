const { MongoClient } = require('mongodb');
const { mongoose } = require('mongoose')
const { StatusCodes } = require('http-status-codes');
const { type } = require('os');
const client = new MongoClient('mongodb+srv://vandyproj:VandyHacks9@vandyhacks9.lgq8a.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true });
const ship = client.db('cargoVesselType');

async function fetchShipNames(limit = 250) {
    const ships = await ship.collection("cargoVesselType").find({}, { projection: { id_: true, VesselName: true, LAT: true, LON: true, BaseDateTime: true, CallSign: true, Length: true, Width: true, } }).sort({ BaseDateTime: 1, "VesselName": 1 }).limit(limit).toArray();
    const shipWithOnlyIdAndVessel = ships;
    return shipWithOnlyIdAndVessel;
}

async function showAllShips(req, res) {
    const ships = await fetchShipNames(); // this is an array of { _id, vesselName }
    res.json(ships);
}

async function getShipById(_id) {
    console.log(req.params.id);
    const passInId = mongoose.Types.ObjectId(req.params.id);
    const ships = await ship.collection("cargoVesselType").find({ _id: passInId }, { projection: { LAT: true, LON: true, MMSI: true, CallSign: true, Length: true, Width: true, VesselName: true } }).toArray();
    if (!ships) {
        return {}
    }
    const shipWithOnlyIdAndVessel = ships;
    return shipWithOnlyIdAndVessel;
}

async function showSingleShip(req, res){
    const ships = await showSingleShip(req.params.id);
    res.json(ships);
}

// const showSingleShip = async (req, res) => {
//     res.status(StatusCodes.OK).json({ shipWithOnlyIdAndVessel })
// }

// async function showSingleShip()

const showSingShipAtSpecificTime = async (req, res) => {
    const passInId = mongoose.Types.ObjectId(req.params.id);
    const ships = await ship.collection("cargoVesselType").find({ _id: passInId }, { projection: { MMSI: true, Heading: true, CallSign: true, VesselType: true, Length: true, Width: true } }).toArray();
    if (!ships) {
        console.log('no ships');
    }
    const shipWithOnlyIdAndVessel = ships;
    res.status(200).json({ shipWithOnlyIdAndVessel });
}


module.exports = {
    showAllShips,
    showSingleShip,
    showSingShipAtSpecificTime
}