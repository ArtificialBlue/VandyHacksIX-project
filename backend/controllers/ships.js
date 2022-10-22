const showAllShips = async (req, res) => {
    res.status(200).json('find all')
}

const showSingleShip =async (req, res) =>{
    res.status(200).json('find single ship')
}


module.exports = {
    showAllShips,
    showSingleShip,
  }