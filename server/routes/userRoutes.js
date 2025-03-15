const userControllerClass = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.post("/signUpUser", userControllerClass.createUser);

module.exports = router;