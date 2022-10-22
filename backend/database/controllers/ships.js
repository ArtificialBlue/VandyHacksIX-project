const getAllShips = async (req, res) => {
    res.status(200).json('find all')
}

const getSingleShip =async (req, res) =>{
    res.status(200).json('find single ship')
}


module.exports = {
    getAllShips,
    getSingleShip,
  }