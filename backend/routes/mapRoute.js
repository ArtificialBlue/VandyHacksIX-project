const express = require('express');
const router = express.Router();
const {
  showAllShips,
  showSingleShip,
  showSingShipAtSpecificTime,
} = require('../controllers/ships')


router.route('/').get(showAllShips);

router
  .route('/ships/:id').get(showSingleShip,showSingShipAtSpecificTime);

module.exports = router;
