const userControllerClass = require('../controllers/userController');
const express = require('express');
const auth = require('../middlewares/jwt');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post("/signUpUser", apiLimiter, auth.verifyToken, userControllerClass.createUser);

module.exports = router;