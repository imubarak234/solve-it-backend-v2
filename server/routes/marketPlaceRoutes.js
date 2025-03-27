const marketPlaceController = require('../controllers/marketPlaceController');
const express = require('express');

const router = express.Router();

router.post('/createProduct', marketPlaceController.createProduct);
router.post('/createProductTag', marketPlaceController.createProductTags);
router.post('/getMarketElement', marketPlaceController.getMarketElements);
router.post('/deleteMarketElement', marketPlaceController.deleteProductElement);
//router.post();

module.exports = router;