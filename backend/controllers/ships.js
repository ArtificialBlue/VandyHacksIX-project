const { StatusCodes } = require('http-status-codes')
// const {query} = require('../models/ship')

const showAllShips = async (req, res) => {
    res.status(200).json('find all')
}

const showSingleShip =async (req, res) =>{
        const {
            mmin: { mmin },
        } = req
      
        // const ship = await query({
        //   _id: mmin
        // })

        if (!ship) {
          throw new Error(`No ships found`)
        }
        res.status(StatusCodes.OK).json('find single ship')

}


module.exports = {
    showAllShips,
    showSingleShip,
  }