const categoriesController = require('../../controllers/admin/categoriesController');
const express = require('express');
const auth = require('../../middlewares/jwt');
const apiLimiter = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/createPostCategory', apiLimiter, categoriesController.addCategory);

module.exports = router;