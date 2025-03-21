const testController = require('../controllers/test');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.get('/getTest', testController.testGetRequest);
router.post('/testInsert', testController.testInsert);
router.post('/testEmail', testController.emailTest);

module.exports = router;