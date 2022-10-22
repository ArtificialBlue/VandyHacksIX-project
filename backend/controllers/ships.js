const { StatusCodes } = require('http-status-codes')
const Ship = require('../models/ship');

const showAllShips = async (req, res) => {
    res.status(200).json('find all')
}

const showSingleShip =async (req, res) =>{
    const ship = await Ship.findOne({ ID: req.params.id });
    if (!ship) {
      throw new Error(`No ships found`)
    }
    res.status(StatusCodes.OK).json({ ship })
}

module.exports = {
    showAllShips,
    showSingleShip,
  }