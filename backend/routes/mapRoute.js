const express = require('express');
const router = express.Router();
const {
  showAllShips,
  showSingleShip,
} = require('../controllers/ships')


router.route('/').get(showAllShips);

router
  .route('/ships').get(showSingleShip);

module.exports = router;