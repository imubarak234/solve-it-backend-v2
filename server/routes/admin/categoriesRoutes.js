const categoriesController = require('../../controllers/admin/categoriesController');
const express = require('express');

const router = express.Router();

router.post('/createPostCategory', categoriesController.addCategory);

module.exports = router;