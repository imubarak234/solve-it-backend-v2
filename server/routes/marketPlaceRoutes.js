const marketPlaceController = require('../controllers/marketPlaceController');
const express = require('express');

const router = express.Router();

router.post('/createProduct', marketPlaceController.createProduct);
router.post('/createProductTag', marketPlaceController.createProductTags);
router.post('/getMarketElement', marketPlaceController.getMarketElements);
router.post('/deleteMarketElement', marketPlaceController.deleteProductElement);
router.post('/createProductComment', marketPlaceController.createProductComment);
router.post('/createProductCommentReply', marketPlaceController.createProductCommentReply);
router.post('/createProductCommentReaction', marketPlaceController.createProductCommentReaction);
router.put('/updateProduct', marketPlaceController.updateProduct);
router.put('/updateProductTag', marketPlaceController.updateTags);
router.put('/updateProductComment', marketPlaceController.updateProductComment);
router.put('/updateProductCommentReaction', marketPlaceController.updateProductCommentReaction)

//router.post();

module.exports = router;